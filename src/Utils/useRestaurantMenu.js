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

      // const response = await fetch(url, {
      //   method: "GET",
      //   headers: {
      //     Accept: "*/*",
      //     "User-Agent":
      //       "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:144.0) Gecko/20100101 Firefox/144.0",
      //     Cookie:
      //       "__SW=mwooOs6JBP1L7Bc0CC17NQpgROJ6ZXo0; _device_id=ff4d8ba4-3ece-28d2-5b58-cde3005e1f8b; _guest_tid=9ed02fe3-edeb-4385-96d7-5ea0d475c9ac; _sid=nkn763c4-844d-4e9d-bd94-d8e1d17478ed; userLocation={%22lat%22:%2226.83730%22%2C%22lng%22:%2280.91650%22%2C%22address%22:%22%22%2C%22area%22:%22%22%2C%22showUserDefaultAddressHint%22:false}; fontsLoaded=1; aws-waf-token=121d00f9-7e4e-43e4-8292-d162c72986dd:HgoAYgOA1UWuAAAA:CDYk66B3a2ImZ/kqFzkilc/DVHvRMJ14JLNnK4GiJPBpzMnDosVnvhK93OZ3D5RtfyMXzWpX7SfAfYN76TPo2Zjos0/ZurfEqVayTvjDU/SdELwO6KUt4S1abm0aRDMs7MI4QrZddlqbgzXJwwu9Bkz2QKFHg4WK92j5Pvd0TJ7dN9/3ys9YSRTcmU7cejA=",
      //   },
      // });

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
