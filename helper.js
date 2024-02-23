// import parser from "@rimiti/hl7-object-parser";

// const s12Mapping = {
//   format: "hl7-2.4",
//   adapter: "default",
//   mapping: {
//     msh: {
//       values: [
//         { field: "msh.message_datetime", component: [5, 1] },
//         { field: "msh.message_type", component: [7, 1] },
//         { field: "msh.message_type_ref", component: [7, 2] },
//         { field: "msh.message_control_id", component: [8, 1] },
//         { field: "msh.principal_language_of_message", component: [15, 1] },
//         { field: "msh.character_set", component: [16, 1] },
//       ],
//     },
//     pid: {
//       values: [
//         { field: "pid.id", component: [3, 1] },
//         { field: "pid.origin", component: [3, 4] },
//         { field: "pid.first_name", component: [5, 2] },
//         { field: "pid.last_name", component: [5, 1] },
//         { field: "pid.birthdate", component: [7, 1] },
//         { field: "pid.gender", component: [8, 1] },
//         { field: "pid.street_name", component: [11, 1] },
//         { field: "pid.city", component: [11, 3] },
//         { field: "pid.zip_code", component: [11, 5] },
//         { field: "pid.phone", component: [13, 1] },
//         { field: "pid.email", component: [13, 4] },
//       ],
//     },
//     sch: {
//       values: [
//         { field: "sch.id", component: [2, 1] },
//         { field: "sch.origin", component: [2, 2] },
//         { field: "sch.length", component: [6, 1] },
//         { field: "sch.minutes", component: [11, 3] },
//         { field: "sch.datetime", component: [11, 4] },
//         { field: "sch.datetime", component: [16, 1] },
//         { field: "sch.last_name", component: [16, 2] },
//         { field: "sch.first_name", component: [16, 3] },
//         { field: "sch.source", component: [20, 1] },
//         { field: "sch.status", component: [25, 1] },
//       ],
//     },
//     rgs: {
//       values: [{ field: "rgs.id", component: [1, 1] }],
//     },
//     aig: {
//       values: [
//         { field: "aig.id", component: [1, 1] },
//         { field: "aig.rpps_finess", component: [4, 1] },
//       ],
//     },
//     nte: {
//       values: [{ field: "nte.comment", component: [3, 1] }],
//     },
//   },
// };

// const s12 = `MSH|^~\&|MM|ELLKAY_COMP|AP Easy|MOD7556|20240216234334||ORM^O01|58681-20240216234334|P|2.3|PID|1|9824941|EMA9824941||Jzenn^Bronner^||19071107|F|||13999 Mira Montana Dr^^Del Mar^CA^92014||8586030396||||||563635449 PV1|1||ELLKAY_COMP||||1730479619^Wisniewski^Joy^ IN1|1||47198|Blue Cross of California|PO Box 272630^^Chico^CA^959272630||||||||||COMMERCIAL_OTHER|Jzenn^Bronner^|1|||||1||||||||||||||AQT603727044|||||||||||T GT1|1||Jzenn^Bronner^||13999 Mira Montana Dr^^Del Mar^CA^92014||||||1 ORC|NW|58681-A||58681|||||20240216234334|||1730479619^Wisniewski^Joy^ OBR|1|58681-A|A|C43.59^Excision||20240216234334|20240216144500||||||Morphology: ;DDX: Malignant Melanoma;Location: left upper paraspinal;||^^^left upper paraspinal|1730479619^Wisniewski^Joy^|||||||||F||^^^^^^^^|||| OBX|1|FT|03^Clinical||Morphology: ;DDX: Malignant Melanoma;; OBX|2|FT|01^Site||left upper paraspinal OBX|3|FT|02^Procedure||EXCISION NTE|1|path_note|Please check margins.`;

// const obj = parser.decode(s12, s12Mapping);
// console.log(obj);
