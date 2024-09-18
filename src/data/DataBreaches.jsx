import axios from "axios";  
  async function fetchData() {
    try {
      const response = await axios.get(
        `https://api.xposedornot.com/v1/breaches`
      );
      const data = response.data;
      return data;
        } catch (error) {
      console.error("Error fetching data:", error);
      return error;
    }
  }
