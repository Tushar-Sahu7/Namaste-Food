// filepath: e:\Projects\Namaste Food\api\menu.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  const { restaurantId } = req.query;

  const url = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=26.83730&lng=80.91650&restaurantId=${restaurantId}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.setHeader("Access-Control-Allow-Origin", "*"); // Allow CORS
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch menu data" });
  }
}
