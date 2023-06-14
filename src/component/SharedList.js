import React from "react";
import { useEffect, useState } from "react";

function SharedList() {
  const [parsedData, setParsedData] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedData = urlParams.get("data");

    if (encodedData) {
      const decodedData = JSON.parse(decodeURIComponent(encodedData));
      setParsedData(decodedData);
    }
  }, []);

  return (
    <div>
      {/* Render the parsed data */}
      {parsedData}
    </div>
  );
}

export default SharedList;
