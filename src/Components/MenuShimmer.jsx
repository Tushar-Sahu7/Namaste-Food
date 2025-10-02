const ShimmerMenuItem = () => (
  <div className="w-full flex flex-row mb-4 py-6 px-4 items-start justify-between rounded-2xl bg-white">
    <div className="w-3/4 pr-6">
      {/* Title shimmer */}
      <div className="my-2 h-10 rounded-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer w-3/4"></div>

      {/* Price shimmer */}
      <div className="h-5 w-16 rounded-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer mt-2"></div>

      {/* Description lines shimmer */}
      <div className="mt-3 space-y-2">
        <div className="h-4 rounded-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer w-full"></div>
        <div className="h-4 rounded-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer w-5/6"></div>
        <div className="h-4 rounded-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer w-4/6"></div>
      </div>
    </div>

    <div className="relative flex items-center justify-center">
      {/* Image shimmer */}
      <div className="w-40 h-40 rounded-2xl bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer"></div>

      {/* Add button shimmer */}
      <div className="absolute -bottom-4 w-20 h-8 rounded-3xl bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer"></div>
    </div>
  </div>
);

const MenuShimmer = () => {
  return (
    <div className="w-full flex flex-wrap items-center justify-center rounded-2xl leading-6">
      <div className="w-[95%] xl:w-1/2 border-2 border-neutral-200 shadow-md rounded-sm m-4 p-4">
        {/* Category header shimmer */}
        <div className="w-full flex justify-between p-4 mb-4">
          <div className="h-6 rounded-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer w-1/3"></div>
          <div className="h-6 w-6 rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer"></div>
        </div>

        {/* Menu items shimmer */}
        <div className="grid grid-cols-1 gap-2">
          {Array.from({ length: 4 }, (_, i) => (
            <ShimmerMenuItem key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuShimmer;
