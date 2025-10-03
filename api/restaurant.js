import fetch from "node-fetch";

export default async function handler(req, res) {
  const { lat, lng } = req.query;

  const url = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-US,en;q=0.9",
        Referer: "https://www.swiggy.com/restaurants",
        Platform: "dweb",
        DNT: "1",
      },
    });

    if (!response.ok) {
      throw new Error(`Swiggy API returned status ${response.status}`);
    }

    const data = await response.json();
    res.setHeader("Access-Control-Allow-Origin", "*"); // Allow CORS
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching restaurant data:", error.message);
    res.status(500).json({ error: "Failed to fetch restaurant data" });
  }
}
