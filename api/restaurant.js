import fetch from "node-fetch";

export default async function handler(req, res) {  
  const url = `https://namastedev.com/api/v1/listRestaurants`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Swiggy API returned status ${response.status}`);
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching restaurant data:", error.message);
    res.status(500).json({ error: "Failed to fetch restaurant data" });
  }
}
