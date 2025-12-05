import axios from "axios";
const API_BASE_URL = "https://namastedev.com/api/v1";
// Get restaurant list
export const getRestaurants = async () => {
try {
const { data } = await axios.get(`${API_BASE_URL}/listRestaurants`);
console.log(data);
return data
} catch (error) {
throw error;
}
};
