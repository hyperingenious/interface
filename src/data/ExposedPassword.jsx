import React, { useState } from 'react';
import axios from 'axios';

export default function ExposedPassword() {
  const [password, setPassword] = useState('');
  const [result, setResult] = useState(null);

  async function fetchData(password) {
    try {
      const response = await axios.get(`https://passwords.xposedornot.com/v1/pass/anon/${password}`);
      setResult(response.data); // axios automatically parses JSON response
    } catch (error) {
      console.error('Error fetching data:', error);
      setResult("Not Found");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData(password);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your passsword"
        />
        <button type="submit">Check password</button>
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
