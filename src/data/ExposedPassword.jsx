import axios from 'axios';



  async function fetchData(password) {
    try {
      const response = await axios.get(`https://passwords.xposedornot.com/v1/pass/anon/${password}`);
      const data = response.data;
      return data;    } catch (error) {
      console.error('Error fetching data:', error);
return error;    }
  }

  