import bcrypt from "bcryptjs"; // Import bcryptjs

// Hash the password and fetch data
export async function fetchData(password) {
  try {
    // Hash the password with a salt round of 10 (default)
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Use the hashed password in the request URL
    const response = await fetch(
      `https://passwords.xposedornot.com/v1/pass/anon/${hashedPassword}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null; // Return null or handle the error as needed
  }
}
