// const BASE_URL = process.env.REACT_APP_API_URL;

export default async function request(endpoint, method) {
  try {
    const response = await fetch(`${endpoint}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
