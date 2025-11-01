import { useEffect, useState } from "react";

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    fetchData();
  }, [resId]);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/menu?restaurantId=${resId}`);

      // const url = `https://namastedev.com/api/v1/listRestaurantMenu/${resId}`;

      // const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch menu data");
      }
      const json = await response.json();
      setResInfo(json.data);
    } catch (error) {
      console.error("Error fetching menu data:", error);
    }
  };

  return resInfo;
};

export default useRestaurantMenu;
