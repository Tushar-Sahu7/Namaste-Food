import { useState, useRef, useEffect } from "react";
import { MENU_URL } from "../Utils/constants";
import { addItems, removeItem } from "../Utils/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const ItemList = ({ items }) => {
  const dispatch = useDispatch();
  const [expandedItems, setExpandedItems] = useState({});
  const [clampedItems, setClampedItems] = useState({});
  const descriptionRefs = useRef({});
  const itemQuantities = useSelector((store) => store.cart.itemQuantities);

  // Check if text is actually clamped
  const isTextClamped = (element) => {
    if (!element) return false;
    return element.scrollHeight > element.clientHeight;
  };

  // Check clamping status on mount and resize
  useEffect(() => {
    const checkClamping = () => {
      const newClampedStatus = {};
      Object.keys(descriptionRefs.current).forEach((index) => {
        const element = descriptionRefs.current[index];
        newClampedStatus[index] = isTextClamped(element);
      });
      setClampedItems(newClampedStatus);
    };

    checkClamping();
    window.addEventListener("resize", checkClamping);
    return () => window.removeEventListener("resize", checkClamping);
  }, [items]);

  const handleAddItem = (item) => {
    dispatch(addItems(item));
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeItem(itemId));
  };

  const toggleDescription = (index) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="grid grid-cols-1 gap-2 md:gap-4">
      {items.map((item, index) => (
        <div data-testid="foodItems" key={item.card.info.id} className="w-full">
          <div className="w-full flex flex-row mb-2 py-2 md:py-4 px-2 md:px-4 items-start justify-between hover:shadow-lg rounded-2xl relative">
            <div className="w-3/4 pr-2 md:pr-6">
              <h3 className="my-1 md:my-2 leading-5 md:leading-8 font-normal text-base md:text-2xl text-brand-500 font-heading-1 line-clamp-2">
                {item.card.info.name}
              </h3>
              <h4 className="font-body font-semibold text-xs md:text-base">
                ₹{" "}
                {item.card.info.price / 100 ||
                  item.card.info.defaultPrice / 100}
              </h4>
              <div className="relative">
                <p
                  ref={(el) => (descriptionRefs.current[index] = el)}
                  className={`text-neutral-600 break-words text-[10px] md:text-sm ${
                    expandedItems[index] ? "" : "line-clamp-2"
                  } font-body`}
                >
                  {item.card.info.description}
                </p>
                {item.card.info.description &&
                  clampedItems[index] &&
                  !expandedItems[index] && (
                    <button
                      className="text-brand-400 text-[10px] sm:text-sm font-semibold ml-1 hover:text-brand-500 focus:outline-none"
                      onClick={() => toggleDescription(index)}
                    >
                      See More
                    </button>
                  )}
                {item.card.info.description && expandedItems[index] && (
                  <button
                    className="text-brand-400 text-[10px] sm:text-sm font-semibold ml-1 hover:text-brand-500 focus:outline-none"
                    onClick={() => toggleDescription(index)}
                  >
                    See Less
                  </button>
                )}
              </div>
            </div>
            <div className="w-25 h-25 md:w-40 md:h-40 relative flex items-center justify-center">
              {item.card.info.imageId ? (
                <img
                  className="w-full h-25 md:h-40 object-cover rounded-md md:rounded-2xl content-center"
                  src={MENU_URL + item.card.info.imageId}
                  alt="menu-img"
                />
              ) : (
                <div className="w-full h-16 md:h-40 rounded-md md:rounded-2xl bg-[url('https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg')] bg-neutral-200 bg-cover bg-center"></div>
              )}

              {itemQuantities[item.card.info.id] ? (
                <div className="absolute -bottom-3 md:-bottom-4 z-30 bg-white rounded-3xl flex items-center justify-center border-brand-500 border text-bold scale-75 md:scale-100">
                  <button
                    className="px-2 md:px-3 py-1 md:py-2 rounded-l-3xl text-brand-500 hover:bg-brand-500 hover:text-white text-xs md:text-base"
                    onClick={() => handleRemoveItem(item.card.info.id)}
                  >
                    -
                  </button>
                  <span className="font-semibold text-brand-500 px-2 text-xs md:text-base">
                    {itemQuantities[item.card.info.id]}
                  </span>
                  <button
                    className="px-2 md:px-3 py-1 md:py-2 rounded-r-3xl text-brand-500 hover:bg-brand-500 hover:text-white text-xs md:text-base"
                    onClick={() => handleAddItem(item)}
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  className="absolute -bottom-3 md:-bottom-4 px-2 md:px-4 py-1 md:py-2 rounded-3xl tracking-[0.1rem] font-heading-1 cursor-pointer bg-neutral-0 text-brand-500 border border-brand-500 hover:bg-brand-500 hover:text-white z-30 text-xs md:text-base scale-75 md:scale-100"
                  onClick={() => handleAddItem(item)}
                >
                  Add +
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
