import { useState, useEffect, useContext } from "react";
import RestaurentCard, { withPromotedLabel } from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link, useOutletContext } from "react-router";
import useOnlineStatus from "../Utils/useOnlineStatus";
import UserContext from "../Utils/userContext.js";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [loading, setLoading] = useState(false);

  const RestaurantCardPromoted = withPromotedLabel(RestaurentCard);

  const { userLocation } = useOutletContext();
  const { lat, lng } = userLocation;

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/restaurant?lat=${lat}&lng=${lng}`);
      if (!response.ok) {
        throw new Error("Failed to fetch restaurant data");
      }
      const json = await response.json();
      const newRestaurants =
        json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants;

      setListOfRestaurants(newRestaurants);
      setFilteredRestaurant(newRestaurants);
    } catch (error) {
      console.error("Error fetching restaurant data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [lat, lng]);

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
