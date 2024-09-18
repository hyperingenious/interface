import axios from "axios";


  async function fetchData() {
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

      const data = response.data;
      return data;
        } catch (error) {
      console.error("Error fetching data:", error);
      return error;
    } 
  }
