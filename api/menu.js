import fetch from "node-fetch";

export default async function handler(req, res) {
  const { resId } = req.query;
  const url = `https://namastedev.com/api/v1/listRestaurantMenu/${resId}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);

    if (!response.ok) {
      throw new Error(`Swiggy Menu API returned status ${response.status}`);
    }
  } catch (error) {
    res.json({ error: "Failed to fetch menu data" });
  }
}
