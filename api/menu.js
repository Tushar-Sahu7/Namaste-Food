import axios from "axios";
export default async function handler(req, res) {
  const { resId } = req.query;
  const url = `https://namastedev.com/api/v1/listRestaurantMenu/${resId}`;

  console.log(url)
  try {
    const response = await axios(url);
    if (!response.ok) {
      return res.status(response.status).json({
        error: `Mock Menu API returned status ${response.status}`,
      });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    if (res.headersSent) {
      console.error("Response already sent:", error);
      return;
    }
    return res.status(502).json({ error: "Failed to fetch menu data" });
  }
}