import React, { useEffect, useState } from "react";
import axios from "axios";

export default function DomainBreaches() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  async function fetchData() {
    setLoading(true); // Start loading
    setError(null); // Reset error state before fetching data
    try {
      const response = await axios.post(
        `https://api.xposedornot.com/v1/domain-breaches/`,
        {}, // empty body if you don't have a payload
        {
          headers: {
            "x-api-key": "0ef9f49ae62860584f8db06faf3f5bd5"
          }
        }
      );

      setResult(response.data); // Successfully fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
      setResult(null);
      setError("Something went wrong. Please try again later."); // Set error message
    } finally {
      setLoading(false); // Stop loading once fetch is done
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>Domain Breaches:</h2>
      {loading && <p>Loading data...</p>} {/* Display loading message */}
      {!loading && result && (
        <div>
          <h3>Result:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre> {/* Beautify JSON output */}
        </div>
      )}
      {!loading && error && (
        <div>
          <pre>{error}</pre> {/* Display error message if any */}
        </div>
      )}
    </div>
  );
}
