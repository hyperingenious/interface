import React, { useEffect, useState } from "react";
import axios from "axios";

export default function DataBreaches() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function fetchData() {
    try {
      const response = await axios.get(
        `https://api.xposedornot.com/v1/breaches`
      );
      setResult(response.data); // axios automatically parses JSON response
    } catch (error) {
      console.error("Error fetching data:", error);
      setResult(null)
      setError("something went wrong");
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
        <h2>Data Breaches:</h2>
      {result && (
        <div>
          <h3>Result:</h3>
          <pre>{result}</pre>
        </div>
      )}
        {error && (
        <div>
          <pre>{error}</pre>
        </div>
      )}
    </div>
  );
}
