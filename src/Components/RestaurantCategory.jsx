import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import ItemList from "./ItemList";

const RestaurantCategory = ({ data, showItems, setShowIndex }) => {
  const handleClick = () => {
    setShowIndex();
  };
  // console.log(data);
  const { title, itemCards } = data?.card?.card;
  return (
    <div className="w-full flex flex-wrap items-center justify-center rounded-2xl leading-6">
      <div className="w-[95%] xl:w-1/2 border-2 border-neutral-200 shadow-md rounded-sm m-6 p-4 list-none no-underline flex flex-col items-center justify-center">
        <div
          className="w-full flex justify-between p-4 text-neutral-500"
          onClick={handleClick}
        >
          <span className="text-semibold text-body text-neutral-600 hover:text-neutral-800">
            {title} ({itemCards.length})
          </span>
          <span>
            {showItems ? (
              <FontAwesomeIcon icon={faChevronUp} />
            ) : (
              <FontAwesomeIcon icon={faChevronDown} />
            )}
          </span>
        </div>
        {showItems && <ItemList items={itemCards} />}
      </div>
    </div>
  );
};

export default RestaurantCategory;
