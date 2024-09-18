import React, { useState } from 'react';
import axios from 'axios';

export default function BreachAnalytics() {
  const [email, setEmail] = useState('');
  const [result, setResult] = useState(null);

  async function fetchData(email) {
    try {
      const response = await axios.get(`https://api.xposedornot.com/v1/breach-analytics?email=${email}`);
      setResult(response.data); // axios automatically parses JSON response
    } catch (error) {
      console.error('Error fetching data:', error);
      setResult("Not Found");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData(email);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <button type="submit">Check Email</button>
      </form>
      {result && (
        <div>
          <h3>Result:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
