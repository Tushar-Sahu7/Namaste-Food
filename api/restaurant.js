import axios from "axios";
const API_BASE_URL = "https://namastedev.com/api/v1";

const getRestaurants = async () => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/listRestaurants`);
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
};

export default async function handler(req, res) {
  try {
    const data = await getRestaurants();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
