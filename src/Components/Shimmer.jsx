const ShimmerCard = () => (
  <div className="w-full h-full relative flex flex-col animate-pulse my-4">
    <div className="w-full h-40 sm:h-44 md:h-48 lg:h-56 rounded-xl bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer"></div>
    <div className="h-6 sm:h-8 md:h-10 my-2 rounded-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer w-full"></div>
    <div className="h-5 sm:h-6 w-16 rounded-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer"></div>
    <div className="h-4 sm:h-5 my-1 rounded-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer w-1/4"></div>
    <div className="h-4 sm:h-5 rounded-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer w-2/4"></div>
    <div className="h-4 sm:h-5 my-1 rounded-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer w-3/4"></div>
  </div>
);

const Shimmer = () => {
  return (
    <div className="max-w-full mx-auto p-6 grid gap-12 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-fr">
      {Array.from({ length: 8 }, (_, i) => (
        <ShimmerCard key={i} />
      ))}
    </div>
  );
};

export default Shimmer;
