import { useEffect, useState } from "react";

const useRestaurantMenu = (resId, lat, lng) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    fetchData();
  }, [resId, lat, lng]);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/menu?restaurantId=${resId}&lat=${lat}&lng=${lng}`);
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
