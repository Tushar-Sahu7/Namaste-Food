import useRestaurantMenu from "../Utils/useRestaurantMenu";
import MenuShimmer from "./MenuShimmer";
import { useParams, useOutletContext } from "react-router";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";
import useGeoLocation from "../Utils/useGeoLocation";

const RestaurantMenu = () => {
  const [showIndex, setShowIndex] = useState(0);
  const { resId } = useParams();
  const { locationInfo, locationError } = useGeoLocation();
  const lat = locationInfo?.latitude ?? 26.8566528;
  const lng = locationInfo?.longitude ?? 80.9435136;

  const resInfo = useRestaurantMenu(resId, lat, lng);
  // console.log(resInfo);

  if (resInfo === null) {
    return <MenuShimmer />;
  }

  const { name, cuisines } = resInfo?.cards[2]?.card?.card?.info;

  const categories =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );
  // console.log(categories);
  return (
    <div>
      <>
        <div className="font-heading-1 mx-auto text-center m-2">
          <h1 className="text-2xl m-4">{name}</h1>
          <h3 className="text-xl m-2 font-heading-2">Menu</h3>
          <h3 className="text-xl m-2 text-neutral-700">
            {cuisines.join(", ")}
          </h3>
        </div>
        {categories.map((category, index) => (
          <RestaurantCategory
            key={category?.card?.card?.categoryId}
            data={category}
            showItems={index === showIndex ? true : false}
            setShowIndex={() =>
              index !== showIndex ? setShowIndex(index) : setShowIndex(null)
            }
          />
        ))}
      </>
    </div>
  );
};

export default RestaurantMenu;
