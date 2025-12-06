import express from "express";
import axios from "axios";

const router = express.Router();
const API_BASE = 'https://namastedev.com/api/v1';

router.get('/menu', async (req, res) => {
  const { resId } = req.query;

  if (!resId) {
    return res.status(400).json({ message: 'Restaurant ID is required' });
  }

  try {
    const url = `${API_BASE}/listRestaurantMenu/${resId}`;
    const response = await axios.get(url);
    res.json({ data: response.data });
  } catch (error) {
    console.error("Error fetching menu from external API:", error);
    if (error.response) {
      res.status(error.response.status).json({ message: error.response.statusText });
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
});

export default router;