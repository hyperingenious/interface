import React, { useEffect, useState } from "react";
import { fetchData } from "../data/DomainBreaches";
import { Alert, Loader } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react/dist/esm/tabler-icons-react";

export default function EmailCheck() {
  const icon = <IconInfoCircle />;

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function callme() {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchData();
        setResult(data.metrics);
        if (data == null) {
          setError("There is an error in the API");
          return;
        } // Update to access the metrics directly
      } catch (err) {
        setError("Error fetching data.");
      } finally {
        setLoading(false);
      }
    }
    callme();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Domain Breach Check
      </h1>
      {loading && <Loader type="bars" />}

      {result && (
        <div className="mt-6 w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 overflow-x-auto">
          <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
            Result for:{" "}
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {result.Breach_Summary.AerServ} breach found!
            </span>
          </h2>
          <h3 className="text-md font-semibold text-gray-900 dark:text-white">
            Breach Details:
          </h3>
          <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 mb-4">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-600 text-left">
                  Breach
                </th>
                <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-600 text-left">
                  Domain
                </th>
                <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-600 text-left">
                  Email
                </th>
              </tr>
            </thead>
            <tbody>
              {result.Breaches_Details.map((breach, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">
                    {breach.breach}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">
                    {breach.domain}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">
                    {breach.email}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {result.Detailed_Breach_Info.AerServ && (
            <div>
              <h3 className="text-md font-semibold text-gray-900 dark:text-white">
                Detailed Breach Info:
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                <strong>Breach:</strong>{" "}
                {result.Detailed_Breach_Info.AerServ.breach}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                <strong>Breached Date:</strong>{" "}
                {result.Detailed_Breach_Info.AerServ.breached_date}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                <strong>Password Risk:</strong>{" "}
                {result.Detailed_Breach_Info.AerServ.password_risk}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                <strong>Exposed Data:</strong>{" "}
                {result.Detailed_Breach_Info.AerServ.xposed_data}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                <strong>Exposed Records:</strong>{" "}
                {result.Detailed_Breach_Info.AerServ.xposed_records}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                <strong>Description:</strong>{" "}
                {result.Detailed_Breach_Info.AerServ.xposure_desc}
              </p>
            </div>
          )}
        </div>
      )}

      {error && (
        <Alert variant="light" color="red" title="Not Found" icon={icon}>
          {error}
        </Alert>
      )}
    </div>
  );
}
