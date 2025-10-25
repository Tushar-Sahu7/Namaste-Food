import { useEffect, useState } from "react";

const useRestaurantMenu = (resId, lat, lng) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    fetchData();
  }, [resId, lat, lng]);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/menu?restaurantId=${resId}&lat=${lat}&lng=${lng}`);

      // const url = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${resId}&catalog_qa=undefined&submitAction=ENTER`;

      // const response = await fetch(url);

      console.log(response);
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
