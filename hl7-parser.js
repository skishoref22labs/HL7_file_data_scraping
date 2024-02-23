export function hl7_parser(message) {
  const basicSplit = message.split(/\r|\n/); // Using regular expression to split by "\r" or "\n"
  // get all the initial keys to make a clear array
  const getAllKeys = basicSplit.map((e) => {
    return { [e.split("|")[0]]: e };
  });

  // group them using keys
  const groupedKeys = getAllKeys.reduce((acc, curr) => {
    const key = Object.keys(curr)[0];
    return { ...acc, [key]: [...(acc[key] || []), curr[key]] };
  }, {});

  // Patient/case Informations extracted from hl7 message
  const PID = groupedKeys["PID"] ? getPID(groupedKeys["PID"]?.[0]) : {};

  // IN1 - Individual Results extracted from string
  const IN1 = groupedKeys["IN1"]?.length ? getIN1(groupedKeys["IN1"]) : {};

  // GT1 - Gaurantor information extracted from string
  const GT1 = groupedKeys["GT1"]?.length ? getGT1(groupedKeys["GT1"]) : {};

  // OBR - Observation Request extracted from string
  const OBR = groupedKeys["OBR"]?.length ? getOBR(groupedKeys["OBR"]) : {};

  // MSH - Message Header extracted from string
  const MSH = groupedKeys["MSH"]?.length ? getMSH(groupedKeys["MSH"]) : {};

  // OBX - Observation result extracted from string
  const OBX = groupedKeys["OBX"]?.length ? getOBX(groupedKeys["OBX"]) : {};

  // ORC - Common Order) segment extracted from string
  const ORC = groupedKeys["ORC"]?.length ? getORC(groupedKeys["ORC"]) : {};

  // PV1 - get patient visit information
  const PV1 = groupedKeys["PV1"]?.length ? getPV1(groupedKeys["PV1"]) : {};

  console.log(groupedKeys);
  return {
    message_header: MSH,
    patient_information: PID,
    insurance_details: IN1,
    guarantor_details: GT1,
    observation_request: OBR,
    observation_results: OBX,
    common_order: ORC,
    patient_visit: PV1,
  };
}

// get patient information
function getPID(string = "") {
  const hl7PIDSegments = string?.split("|");

  const patientId = hl7PIDSegments[1];
  const patientIdentifier = hl7PIDSegments[2];
  const patientNameParts = hl7PIDSegments[5].split("^");
  const patientName = {
    last_name: patientNameParts[0],
    first_name: patientNameParts[1],
    middle_name: patientNameParts[2],
  };
  const dateOfBirth = hl7PIDSegments[7];
  const gender = hl7PIDSegments[8];
  const addressParts = hl7PIDSegments[11].split("^");
  const address = {
    street_address: addressParts[0],
    city: addressParts[1],
    state: addressParts[2],
    zip_code: addressParts[3],
  };
  const phoneNumber = hl7PIDSegments[13];
  const accountNumber = hl7PIDSegments[18];

  const patientData = {
    segment_identifier: "PID - Patient Information",
    patient_id: patientId,
    patient_identifier: patientIdentifier,
    patient_name: patientName,
    date_of_birth: dateOfBirth,
    gender: gender,
    address: address,
    phone_number: phoneNumber,
    account_number: accountNumber,
  };
  return patientData;
}

// get insurance information
function getIN1(ins) {
  const modifyIN = ins.reduce((acc, ins) => {
    const fields = ins.split("|");

    const segmentObject = {
      segment_identifier: `${fields[0]} - Insurance`,
      segment_sequence_number: fields[1],
      insurance_plan_name: fields[4],
      insurance_company_address: fields[5],
      insured_person_name: fields[14],
      policy_effective_date_time: fields[15],
      insured_person_address: fields[16],
      unique_identifier: fields[28],
    };

    acc.push(segmentObject);

    return acc;
  }, []);

  return modifyIN;
}

// get gaurantor information GT1
function getGT1(gt) {
  const modifyGT1 = gt.reduce((acc, gt) => {
    const fields = gt.split("|");

    const addressParts = fields[5].split("^");
    const city = addressParts[2];
    const stateAndZip = addressParts[3].split("~");
    const state = stateAndZip[0];
    const zipCode = stateAndZip[1];

    const segmentObject = {
      segment_identifier: fields[0],
      guarantor_sequence_number: fields[1],
      guarantor_name: fields[3],
      guarantor_address: fields[5],
      city: city,
      state: state,
      zip_code: zipCode,
    };
    acc.push(segmentObject);

    return acc;
  }, []);

  return modifyGT1;
}

// get OBR information
function getOBR(obr) {
  const modifyOBR = obr.reduce((acc, obr) => {
    const fields = obr.split("|");

    const segmentObject = {
      segment_identifier: fields[0],
      observation_request_sequence_number: fields[1],
      observation_request_identifier: fields[2],
      observation_request_name: fields[4].split("^")[0], // Extracting the observation request name
      observation_request_date_time: fields[6],
      observation_scheduled_date_time: fields[7],
    };

    acc.push(segmentObject);

    return acc;
  }, []);

  return modifyOBR;
}

// get MSH information
function getMSH(msh) {
  const modifyMSH = msh.reduce((acc, msh) => {
    const fields = msh.split("|");

    const segmentObject = {
      segment_identifier: fields[0],
      field_separator: fields[1].charAt(0),
      component_separator: fields[1].charAt(1),
      repetition_separator: fields[1].charAt(2),
      escape_character: fields[1].charAt(3),
      subcomponent_separator: fields[1].charAt(4),
      sending_application: fields[2],
      sending_facility: fields[3],
      receiving_facility: fields[4],
      receiving_application: fields[5],
      message_timestamp: formatDate(fields[6]),
      message_type: fields[8],
      message_control_id: fields[9],
      processing_id: fields[10],
      hl7_version: fields[11],
    };

    function formatDate(timestamp) {
      const year = timestamp.substring(0, 4);
      const month = timestamp.substring(4, 6);
      const day = timestamp.substring(6, 8);
      const hour = timestamp.substring(8, 10);
      const minute = timestamp.substring(10, 12);
      return `${year}-${month}-${day}T${hour}:${minute}`;
    }

    acc.push(segmentObject);

    return acc;
  }, []);

  return modifyMSH;
}

// get OBX information
function getOBX(obx) {
  const modifyOBX = obx.reduce((acc, obx) => {
    const fields = obx.split("|");

    const segmentObject = {
      segment_identifier: fields[0],
      observation_sequence_number: fields[1],
      data_type: fields[2],
      observation_category: fields[3].split("^")[1], // Extracting the observation category
      observation_result: fields[5],
    };
    acc.push(segmentObject);
    return acc;
  }, []);
  return modifyOBX;
}

// get OBX information
function getORC(segments) {
  return segments.reduce((acc, segment) => {
    const fields = segment.split("|");
    const segmentObject = {
      order_control_code: fields[1],
      placer_order_number: fields[2],
      filler_order_number: fields[3],
      order_date_time: fields[9],
      ordering_provider: parseProvider(fields[12]),
    };
    acc.push(segmentObject);
    return acc;
  }, []);

  function parseProvider(providerString) {
    if (!providerString) return {}; // Add a check to handle undefined providerString
    const providerInfo = providerString.split("^");
    return {
      provider_id: providerInfo[0],
      last_name: providerInfo[1],
      first_name: providerInfo[2],
    };
  }
}

// get Patient Visit information
function getPV1(segments) {
  return segments.reduce((acc, segment) => {
    const fields = segment.split("|");
    const segmentObject = {
      segment_identifier: fields[0],
      patient_class: fields[1],
      patient_visit_type: fields[2],
      assigned_patient_location: fields[3],
      attending_provider: parseProvider(fields[17]),
    };
    acc.push(segmentObject);
    return acc;
  }, []);
}

function parseProvider(providerString) {
  if (!providerString) return {}; // Handle undefined providerString
  const providerInfo = providerString.split("^");
  return {
    provider_id: providerInfo[0],
    last_name: providerInfo[1],
    first_name: providerInfo[2],
  };
}
