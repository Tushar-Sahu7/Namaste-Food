import { useState, useEffect, useContext } from "react";
import RestaurentCard, { withPromotedLabel } from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router";
import useOnlineStatus from "../Utils/useOnlineStatus";
import UserContext from "../Utils/userContext.js";
import { useLocation } from "../Utils/CordinatesContext.js";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);

  const RestaurantCardPromoted = withPromotedLabel(RestaurentCard);

  const { coords, setCoords } = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      if (!coords) return;

      try {
        // const response = await fetch(`/api/restaurant?lat=${coords.lat}&lng=${coords.lng}`);
        const url = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${coords.lat}&lng=${coords.lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;

        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch restaurant data");

        const json = await response.json();
        console.log(json)
        const locationUnserviceable = json?.data?.cards[0]?.card?.card?.title;

        if (locationUnserviceable === "Location Unserviceable") {
          if (coords.lat !== 26.8566528 || coords.lng !== 80.9435136) {
            setCoords({ lat: 26.8566528, lng: 80.9435136 });
            return; 
          }
        }

        const newRestaurants =
          json?.data?.cards.find((item) => item?.card?.card?.id?.includes("restaurant_grid"))?.card?.card?.gridElements?.infoWithStyle
            ?.restaurants || [];
          console.log(newRestaurants)

        setListOfRestaurants(newRestaurants);
        setFilteredRestaurant(newRestaurants);
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    };

    fetchData();
  }, [coords]);

  const handleFilter = () => {
    const searchWords = searchText.toLowerCase().split(" ").filter(Boolean);
    const filtered = listOfRestaurants.filter((res) => {
      const name = res.info.name.toLowerCase();
      const cuisines = res.info.cuisines.join(" ").toLowerCase();
      return searchWords.some(
        (word) => name.includes(word) || cuisines.includes(word)
      );
    });
    setFilteredRestaurant(filtered);
  };

  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false) {
    return (
      <h1 className="mx-auto my-70 w-full text-5xl text-center">
        You are Offline! Please check your internet connection
      </h1>
    );
  }

  const { loggedInUser, setUserName } = useContext(UserContext);

  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="mx-auto max-w-full ">
      <div className="flex flex-wrap mx-4 my-4 max-w-full rounded-2xl items-center justify-around bg-transparent backdrop-blur-md z-100 ">
        <div className="flex flex-nowrap">
          <input
            type="text"
            className="border-brand-500 border rounded-3xl font-medium mx-2 px-3 py-1 text-sm sm:px-4 sm:py-2 sm:text-base font-body hover:border-brand-600 duration-100 text-neutral-700 hover:text-neutral-800 bg-white my-1"
            data-testid="searchInput"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleFilter();
              }
            }}
            placeholder="Search Restaurants..."
          />
          <button
            className="bg-brand-500 text-white font-medium hover:bg-brand-400 mx-2 my-1 px-3 py-1 text-sm sm:px-4 sm:py-2 sm:text-base rounded-3xl"
            onClick={handleFilter}
          >
            Search
          </button>
        </div>
        <button
          className="bg-brand-500 text-white font-medium hover:bg-brand-400 m-2 px-3 py-1 text-sm sm:px-4 sm:py-2 sm:text-base rounded-3xl"
          onClick={() => {
            const topRated = listOfRestaurants.filter(
              (res) => res.info.avgRating >= 4.5
            );
            setFilteredRestaurant(topRated);
          }}
        >
          Top Rated Restaurants
        </button>
        <div className="m-2">
          <label className="drop-shadow-[0_1.2px_1.2px_white]">
            UserName :{" "}
          </label>
          <input
            className="border-brand-500 border rounded-3xl font-medium mx-2 px-3 py-1 text-sm sm:px-4 sm:py-2 sm:text-base font-body text-neutral-700 bg-white"
            data-testid="username"
            value={loggedInUser}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
      </div>

      <div className="max-w-full mx-auto p-6 grid gap-12 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-fr">
        {filteredRestaurant.map((restaurant) => (
          <Link
            to={"/Restaurant/" + restaurant.info.id}
            key={restaurant.info.id}
            className="w-full block"
          >
            {restaurant.info.availability.opened ? (
              <RestaurantCardPromoted resData={restaurant} />
            ) : (
              <RestaurentCard resData={restaurant} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
