function SkeletonCard() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col gap-2 shadow-sm animate-pulse">
      <div className="w-full h-40 bg-gray-200 rounded"></div>
      <div className="h-6 bg-gray-200 rounded w-3/4 mt-2"></div>
      <div className="h-5 bg-gray-200 rounded w-1/4 mt-1"></div>
    </div>
  );
}

export default SkeletonCard;
