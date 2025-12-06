import express from "express";
import axios from "axios";

const restaurantRouter = express.Router();
const API_BASE = 'https://namastedev.com/api/v1';

restaurantRouter.get("/restaurant", async (req, res) => {
  const url = `${API_BASE}/listRestaurants`;
  try {
    const response = await axios.get(url);
    const data =  await response.data;
    return res.status(200).json(data);
  }
  catch (error) {
    console.error("Error fetching restaurants:", error.message || error);
    return res.status(502).json({ error: "Failed to fetch restaurant data" });
  }
});

export default restaurantRouter;