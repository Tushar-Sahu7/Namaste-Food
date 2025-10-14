// filepath: e:\Projects\Namaste Food\api\menu.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  const { restaurantId, lat, lng } = req.query;

  const url = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${restaurantId}&catalog_qa=undefined&submitAction=ENTER`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36",
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "en-US,en;q=0.9",
        Referer: "https://www.swiggy.com/",
        Platform: "dweb",
        DNT: "1",
      },
    });
    const data = await response.json();
    res.setHeader("Access-Control-Allow-Origin", "*"); // Allow CORS
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch menu data" });
  }
}
