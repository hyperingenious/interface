// Async function to fetch data from the provided URL
export async function fetchBreaches() {
  const url = 'https://xon-api-test.xposedornot.com/v1/breaches';
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null; // Return null or handle the error as needed
  }
}
