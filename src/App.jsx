import { useState, useEffect } from "react";
import { hl7_parser } from "../hl7-parser";

function App() {
  const [fileContent, setFileContent] = useState("");

  const handleFileChosen = (file) => {
    const fileReader = new FileReader();

    fileReader.onloadend = (event) => {
      const content = event.target.result;
      setFileContent(content);
    };

    fileReader.readAsText(file);
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          handleFileChosen(file);
        }}
      />
      <pre>{JSON.stringify(hl7_parser(fileContent), null, 4)}</pre>
    </div>
  );
}

export default App;
