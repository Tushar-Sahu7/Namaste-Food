import axios from "axios";
const API_BASE_URL = "https://namastedev.com/api/v1";

export const getRestaurantMenu = async (resId) => {
try {
const { data } = await axios.get(
`${API_BASE_URL}/listRestaurantMenu/${resId}`
);
console.log(data);
return data.data;
} catch (error) {
throw error;
}
};