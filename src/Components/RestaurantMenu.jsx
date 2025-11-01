import useRestaurantMenu from "../Utils/useRestaurantMenu";
import MenuShimmer from "./MenuShimmer";
import { useParams, useOutletContext } from "react-router";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";

const RestaurantMenu = () => {
  const [showItems, setshowItems] = useState(true);
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);

  if (resInfo === null) {
    return <MenuShimmer />;
  }

  const { name, cuisines } = resInfo?.cards[2]?.card?.card?.info;

  const categories =
    resInfo?.cards?.find((obj) => obj.groupedCard)?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
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
        {categories.map((category) => (
          <RestaurantCategory
            key={category?.card?.card?.title}
            data={category}
            showItems={showItems}
            setshowItems={() =>
              setshowItems(!showItems)
            }
          />
        ))}
      </>
    </div>
  );
};

export default RestaurantMenu;
