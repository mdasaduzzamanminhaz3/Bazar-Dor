const ProductCardSkeleton = () => {
  return (
    <div className="bg-white border border-gray-200 px-4 py-4 rounded-2xl animate-pulse">
      {/* Product Info Skeleton */}
      <div className="flex items-center gap-3">
        {/* Image / Icon placeholder */}
        <div className="w-[68px] h-[56px] bg-gray-200 rounded-2xl flex-shrink-0" />

        {/* Text placeholders */}
        <div className="flex flex-col gap-2 w-full">
          <div className="h-4 bg-gray-200 rounded-md w-3/4" />
          <div className="h-3 bg-gray-200 rounded-md w-1/2" />
        </div>
      </div>

      {/* Price Skeleton */}
      <div className="flex justify-between items-end mt-5">
        <div className="flex flex-col gap-2">
          <div className="h-3 bg-gray-200 rounded-md w-16" />
          <div className="h-6 bg-gray-200 rounded-md w-20" />
        </div>

        {/* Price Change Skeleton */}
        <div className="h-5 bg-gray-200 rounded-md w-12" />
      </div>
    </div>
  );
};

const ProductsSkeleton = () => {
  return (
    <div className="rounded-2xl mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 bg-white m-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="h-6 bg-gray-200 rounded-md w-32 mb-4" />
      <div className="h-4 bg-gray-200 rounded-md w-48 mb-6" />

      {/* Grid Skeleton (6 cards placeholder) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default ProductsSkeleton;