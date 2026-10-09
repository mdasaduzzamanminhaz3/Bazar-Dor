const ProductDetailsSkeleton = () => {
  return (
    <main className="rounded-2xl m-4 mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 bg-white animate-pulse">
      {/* Breadcrumb Skeleton */}
      <div className="mb-6 flex items-center gap-2">
        <div className="h-4 bg-gray-200 rounded-md w-12" />
        <span className="text-gray-300">&gt;</span>
        <div className="h-4 bg-gray-200 rounded-md w-20" />
        <span className="text-gray-300">&gt;</span>
        <div className="h-4 bg-gray-200 rounded-md w-24" />
      </div>

      {/* Product Header Skeleton */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            {/* Image Box */}
            <div className="w-[72px] h-[72px] bg-gray-200 rounded-2xl flex-shrink-0" />

            <div className="flex flex-col gap-2">
              {/* Title */}
              <div className="h-7 bg-gray-200 rounded-md w-40" />
              {/* Category & Unit */}
              <div className="h-4 bg-gray-200 rounded-md w-28" />
              {/* Price comparison text */}
              <div className="h-4 bg-gray-200 rounded-md w-56 mt-1" />
            </div>
          </div>

          {/* Today's Price Box Skeleton */}
          <div className="rounded-xl bg-gray-100 p-5 sm:min-w-52 flex flex-col gap-2">
            <div className="h-4 bg-gray-200 rounded-md w-20" />
            <div className="h-8 bg-gray-200 rounded-md w-24" />
            <div className="h-4 bg-gray-200 rounded-md w-16" />
            <div className="h-4 bg-gray-200 rounded-md w-28 mt-1" />
          </div>
        </div>
      </section>

      {/* Details Container Skeleton */}
      <div className="mt-6 overflow-x-auto rounded-2xl border border-gray-200 bg-white p-8">
        {/* Price Summary Section */}
        <section className="mb-8">
          <div className="h-6 bg-gray-200 rounded-md w-40 mb-4" />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-gray-200 bg-white p-5 flex flex-col gap-2"
              >
                <div className="h-4 bg-gray-200 rounded-md w-24" />
                <div className="h-7 bg-gray-200 rounded-md w-28" />
                <div className="h-4 bg-gray-200 rounded-md w-36" />
              </div>
            ))}
          </div>
        </section>

        {/* Market Prices Table Skeleton */}
        <div>
          <div className="h-6 bg-gray-200 rounded-md w-56 mb-4" />

          {/* Table Outline */}
          <div className="w-full min-w-[600px]">
            {/* Table Header */}
            <div className="grid grid-cols-5 gap-4 bg-gray-50 p-4 rounded-t-xl mb-2">
              <div className="h-4 bg-gray-200 rounded-md w-24" />
              <div className="h-4 bg-gray-200 rounded-md w-16" />
              <div className="h-4 bg-gray-200 rounded-md w-24" />
              <div className="h-4 bg-gray-200 rounded-md w-24" />
              <div className="h-4 bg-gray-200 rounded-md w-16" />
            </div>

            {/* Table Rows (5 placeholder rows) */}
            <div className="divide-y divide-gray-100">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="grid grid-cols-5 gap-4 p-4">
                  <div className="h-4 bg-gray-200 rounded-md w-28" />
                  <div className="h-4 bg-gray-200 rounded-md w-16" />
                  <div className="h-4 bg-gray-200 rounded-md w-20" />
                  <div className="h-4 bg-gray-200 rounded-md w-20" />
                  <div className="h-4 bg-gray-200 rounded-md w-20" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailsSkeleton;