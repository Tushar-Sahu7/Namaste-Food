import axios from "axios";

export default async function handler(req, res) {
  const url = `https://namastedev.com/api/v1/listRestaurants`;

  try {
    const response = await axios.get(url);
    const data = response.data;
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching restaurant data:", error.message);
    return res.status(500).json({ error: "Failed to fetch restaurant data" });
  }
}