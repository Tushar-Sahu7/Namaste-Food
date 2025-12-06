import express from 'express';
import cors from 'cors';
import serverless from 'serverless-http';
import axios from 'axios';

const app = express();
const API_BASE = 'https://namastedev.com/api/v1';

app.use(cors());
app.use(express.json());

// Menu route
app.get('/api/menu', async (req, res) => {
  const { resId } = req.query;
  if (!resId) {
    return res.status(400).json({ message: 'Restaurant ID is required' });
  }
  try {
    const url = `${API_BASE}/listRestaurantMenu/${resId}`;
    const response = await axios.get(url);
    res.json({ data: response.data });
  } catch (error) {
    console.error("Error fetching menu:", error);
    if (error.response) {
      res.status(error.response.status).json({ message: error.response.statusText });
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
});

// Restaurant route
app.get('/api/restaurant', async (req, res) => {
  const url = `${API_BASE}/listRestaurants`;
  try {
    const response = await axios.get(url);
    const data = response.data;
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching restaurants:", error.message || error);
    return res.status(502).json({ error: "Failed to fetch restaurant data" });
  }
});

export default serverless(app);