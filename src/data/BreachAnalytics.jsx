import axios from "axios";

export async function fetchData(email) {
  try {
    const response = await axios.get(
      `https://api.xposedornot.com/v1/breach-analytics?email=${email}`
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return error;
  }
}
