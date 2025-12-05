import axios from "axios";

const API_BASE_URL = "https://namastedev.com/api/v1";

const getRestaurantMenu = async (resId) => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/listRestaurantMenu/${resId}`);
    console.log("Menu fetched:", data);
    return data.data;
  } catch (error) {
    throw error;
  }
};

export default async function handler(req, res) {
  try {
    const { resId } = req.query;
  
    if (!resId) {
      return res.status(400).json({ error: "Restaurant ID is required" });
    }

    const menu = await getRestaurantMenu(resId);
    return res.status(200).json(menu);

  } catch (error) {
    return res.status(500).json({ error: error.message || "Server error" });
  }
}
