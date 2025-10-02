import { CDN_URLS } from "../Utils/constants";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RestaurentCard = (props) => {
  const { resData } = props;
  const { name, avgRating, cuisines, costForTwo, cloudinaryImageId, sla } =
    resData?.info;

  return (
    <div
      data-testid="resCard"
      className="w-full h-full relative res-card flex flex-col"
    >
      <img
        className="w-full h-40 sm:h-44 md:h-48 lg:h-56 rounded-xl object-cover object-center"
        alt="res-logo"
        src={CDN_URLS + cloudinaryImageId}
      />
      <h3 className="font-heading-1 text-base sm:text-lg md:text-2xl overflow-hidden h-10 text-ellipsis whitespace-nowrap my-2">
        {name}
      </h3>
      <span className="inline-flex items-center gap-1 bg-green-500 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded w-fit font-semibold text-xs sm:text-sm">
        <FontAwesomeIcon icon={faStar} style={{ color: "#fff" }} size="sm" />
        {"  "}
        {avgRating}
      </span>
      <h4 className="font-body text-neutral-500 overflow-hidden text-ellipsis whitespace-nowrap my-1 text-xs sm:text-sm">
        {cuisines.join(", ")}
      </h4>
      <h4 className="font-body-bold text-neutral-800 text-sm sm:text-base">
        {costForTwo}
      </h4>
      <h4 className="font-body-bold font-semibold text-neutral-800 my-1 text-xs sm:text-sm">
        {sla.deliveryTime} minutes
      </h4>
    </div>
  );
};

export const withPromotedLabel = (RestaurentCard) => {
  return (props) => {
    return (
      <div className="relative transform transition duration-100 hover:scale-95 ease-in origin-center">
        <label
          className="
            absolute 
            -left-4 sm:-left-4 
            top-2 sm:top-0
            bg-success-500 
            rounded-tl-md 
            px-2 pr-4 py-1 sm:px-4 sm:pr-8 sm:py-[0.2rem]
            text-xs sm:text-sm 
            text-white font-semibold 
            border-b-[1rem] border-b-[rgba(0,0,0,0.333)] 
            [--f:1rem] [--r:1rem] 
            [clip-path:polygon(100%_0,0_0,0_calc(100%-var(--f)),var(--f)_100%,var(--f)_calc(100%-var(--f)),100%_calc(100%-var(--f)),calc(100%-var(--r))_calc(50%-var(--f)/2))]
            shadow-[rgba(0,0,0,0.16)_0px_3px_6px,rgba(0,0,0,0.23)_0px_3px_6px] 
            z-10
          "
        >
          Open
        </label>
        <RestaurentCard {...props} />
      </div>
    );
  };
};

export default RestaurentCard;
