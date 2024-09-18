import React, { useState } from 'react';
import { fetchData } from '../data/EmailBreachCheck'; 

export default function EmailCheck() {
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
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Email Search</h1>
      <p className="text-lg mb-4 text-gray-600 dark:text-gray-400">
        Enter your email address below to check its status.
      </p>
      <form className="max-w-md w-full bg-white dark:bg-gray-800 shadow-md rounded-lg p-6" onSubmit={handleSubmit}>
        <label
          htmlFor="default-search"
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
            id="default-search"
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
          <p className="text-sm text-gray-600 dark:text-gray-400">Email: <span className="font-medium text-gray-900 dark:text-gray-100">{result.email}</span></p>
          {result.breaches && result.breaches.length > 0 ? (
            <div className="mt-4">
              <h3 className="text-md font-semibold text-gray-900 dark:text-white">Breaches Found:</h3>
              <ul className="list-disc list-inside mt-2">
                {result.breaches[0].map((breach, index) => (
                  <li key={index} className="text-sm text-gray-700 dark:text-gray-300">{breach}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-sm text-green-600 dark:text-green-400 mt-2">No breaches found for this email.</p>
          )}
        </div>
      )}

      {error && (
        <div className="mt-6 p-4 w-full max-w-md bg-red-100 text-red-600 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Error:</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
