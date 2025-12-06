// api/restaurantMenu.js
import axios from "axios";

export default async function handler(req, res) {
  const { resId } = req.query;

  if (!resId) {
    return res.status(400).json({ error: "resId query parameter is required" });
  }

  const url = `https://namastedev.com/api/v1/listRestaurantMenu/${resId}`;

  try {
    const response = await axios.get(url);
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching menu:", error.message || error);
    return res.status(502).json({ error: "Failed to fetch menu data" });
  }
}
