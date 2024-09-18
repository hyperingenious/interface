import React, { useState } from 'react';
import { fetchData } from '../data/BreachAnalytics'; 

export default function BreachAnalyticsPage() {
  const [email, setEmail] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await fetchData(email);
      setResult(data);
    } catch (err) {
      setError('Error fetching data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Breach Analytics</h1>
      <p className="text-lg mb-4 text-gray-600 dark:text-gray-400">
        Enter your email address below to get detailed analysis.
      </p>
      <form className="max-w-md w-full bg-white dark:bg-gray-800 shadow-md rounded-lg p-6" onSubmit={handleSubmit}>
        <label
          htmlFor="email-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Email Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="email-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {result && (
        <div className="mt-6 p-4 w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Result:</h2>
          
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium text-gray-900 dark:text-gray-100">Email:</span> {result.email}
          </p>
          
          {result.ExposedBreaches && result.ExposedBreaches.breaches_details.length > 0 ? (
            <div className="mt-4">
              <h3 className="text-md font-semibold text-gray-900 dark:text-white">Breaches Found:</h3>
              {result.ExposedBreaches.breaches_details.map((breach, index) => (
                <div key={index} className="mt-2 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm">
                  <h4 className="text-md font-bold text-gray-900 dark:text-white">{breach.breach}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{breach.details}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium text-gray-900 dark:text-gray-100">Domain:</span> {breach.domain}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium text-gray-900 dark:text-gray-100">Industry:</span> {breach.industry}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium text-gray-900 dark:text-gray-100">Exposed Data:</span> {breach.xposed_data}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium text-gray-900 dark:text-gray-100">Date:</span> {breach.xposed_date}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-red-600 dark:text-red-400 mt-2">API Limit Exceeded</p>
          )}

          {result.BreachMetrics && (
            <div className="mt-6">
              <h3 className="text-md font-semibold text-gray-900 dark:text-white">Breach Metrics:</h3>
              <div className="mt-2">
                <h4 className="text-sm font-medium text-gray-800 dark:text-gray-300">Industry:</h4>
                <ul className="list-disc list-inside mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {result.BreachMetrics.industry[0].map(([industry, count], index) => (
                    <li key={index} className="text-sm text-gray-700 dark:text-gray-300">
                      {industry}: {count}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-800 dark:text-gray-300">Password Strength:</h4>
                <ul className="list-disc list-inside mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {Object.entries(result.BreachMetrics.passwords_strength[0]).map(([strength, count], index) => (
                    <li key={index} className="text-sm text-gray-700 dark:text-gray-300">
                      {strength}: {count}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-800 dark:text-gray-300">Risk:</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium text-gray-900 dark:text-gray-100">Risk Label:</span> {result.BreachMetrics.risk[0].risk_label}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium text-gray-900 dark:text-gray-100">Risk Score:</span> {result.BreachMetrics.risk[0].risk_score}
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-6 p-4 w-full max-w-md bg-red-100 text-red-600 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-2">Error:</h2>
              <p>{error}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
