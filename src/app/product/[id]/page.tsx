
import Link from "next/link";
import { notFound } from "next/navigation";

interface IMarket {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface IProduct {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday?: number;
  lastWeek?: number;
  lastMonth?: number;
  change: {
    dir: "up" | "down";
    pct: number;
  };
  markets: IMarket[];
}

interface ProductDetailsPageProps {
  params: Promise<{ id: string }>;
}

const ProductDetailsPage = async ({
  params,
}: ProductDetailsPageProps) => {
  const { id } = await params;

  let product: IProduct | null = null;

  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/bazardor/products/${id}`,
      { next: { revalidate: 300 } }
    );

    if (res.status === 404) {
      notFound();
    }

    if (res.ok) {
      product = await res.json();
    }
  } catch (error) {
    console.error("Error fetching product details:", error);
  }

  if (
    !product ||
    !Array.isArray(product.markets) ||
    product.markets.length === 0
  ) {
    notFound();
  }

  const isPriceUp = product.change.dir === "up";

  const minPrice = Math.min(
    ...product.markets.map((market) => market.min)
  );

  const maxPrice = Math.max(
    ...product.markets.map((market) => market.max)
  );

  const avgPrice =
    product.markets.reduce(
      (total, market) => total + (market.min + market.max) / 2,
      0
    ) / product.markets.length;

  const priceDifference =
    product.yesterday != null
      ? product.today - product.yesterday
      : null;

  return (
    <main className="mx-auto my-4 w-full max-w-7xl px-3 sm:my-6 sm:px-6 lg:my-8 lg:px-8">
      <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6 md:p-8">

        {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex flex-wrap items-center gap-2 text-sm"
      >
        <Link
          href="/"
          className="text-gray-500 transition-colors hover:text-green-600"
        >
          হোম
        </Link>

        <span className="text-gray-400">&gt;</span>

        <Link
          href={`/category/${product.category}`}
          className="text-gray-500 transition-colors hover:text-green-600"
        >
          {product.categoryNameBn}
        </Link>

        <span className="text-gray-400">&gt;</span>

        <span aria-current="page" className="font-semibold text-gray-900">
          {product.nameBn}
        </span>
      </nav>
        {/* Product Header */}
        <section className="rounded-2xl border border-gray-200 p-4 sm:p-6 md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-8">

            {/* Product Information */}
            <div className="flex min-w-0 items-start gap-3 sm:gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-3xl sm:h-20 sm:w-20 sm:rounded-2xl sm:text-4xl">
                {product.image}
              </span>

              <div className="min-w-0 flex-1">
                <h1 className="break-words text-xl font-bold leading-snug text-gray-900 sm:text-2xl md:text-3xl">
                  {product.nameBn}
                </h1>

                <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                  প্রতি {product.unit} {product.categoryNameBn}
                </p>

                {priceDifference !== null && (
                  <p
                    className={`mt-2 text-xs leading-6 font-medium sm:text-sm ${
                      priceDifference > 0
                        ? "text-red-600"
                        : priceDifference < 0
                          ? "text-green-600"
                          : "text-gray-500"
                    }`}
                  >
                    {priceDifference > 0
                      ? `গতকালের তুলনায় আজ দাম বেড়েছে ${priceDifference} টাকা`
                      : priceDifference < 0
                        ? `গতকালের তুলনায় আজ দাম কমেছে ${Math.abs(priceDifference)} টাকা`
                        : "গতকালের তুলনায় দাম অপরিবর্তিত"}
                  </p>
                )}
              </div>
            </div>

            {/* Today's Price */}
            <div className="w-full rounded-xl bg-gray-50 p-4 sm:p-5 md:w-auto md:min-w-52 md:shrink-0">
              <p className="text-sm text-gray-500">আজকের দাম</p>

              <p className="mt-1 text-3xl font-bold text-gray-900 sm:text-4xl">
                {product.today}
              </p>

              <p className="text-sm text-gray-600">
                টাকা/{product.unit}
              </p>

              <p
                className={`mt-2 text-sm font-semibold ${
                  isPriceUp ? "text-red-600" : "text-green-600"
                }`}
              >
                {isPriceUp ? "▲ দাম বেড়েছে" : "▼ দাম কমেছে"}{" "}
                {product.change.pct}%
              </p>
            </div>
          </div>
        </section>

        {/* Price Summary */}
        <section className="mt-6 sm:mt-8">
          <h2 className="mb-4 text-lg font-bold text-gray-900 sm:text-xl">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">

            {/* Minimum Price */}
            <div className="rounded-xl border border-gray-200 p-4 sm:p-5">
              <p className="text-sm text-gray-500">সর্বনিম্ন দাম</p>

              <p className="mt-2 text-2xl font-bold text-green-600">
                {minPrice} টাকা
              </p>

              <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                সব বাজারের মধ্যে সর্বনিম্ন
              </p>
            </div>

            {/* Maximum Price */}
            <div className="rounded-xl border border-gray-200 p-4 sm:p-5">
              <p className="text-sm text-gray-500">সর্বোচ্চ দাম</p>

              <p className="mt-2 text-2xl font-bold text-red-600">
                {maxPrice} টাকা
              </p>

              <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                সব বাজারের মধ্যে সর্বোচ্চ
              </p>
            </div>

            {/* Average Price */}
            <div className="rounded-xl border border-gray-200 p-4 sm:col-span-2 sm:p-5 lg:col-span-1">
              <p className="text-sm text-gray-500">গড় দাম</p>

              <p className="mt-2 text-2xl font-bold text-green-600">
                {avgPrice.toFixed(2)} টাকা
              </p>

              <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                প্রতি {product.unit} হিসেবে
              </p>
            </div>
          </div>
        </section>

        {/* Market-wise Price Table */}
        <section className="mt-6 sm:mt-8">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
              বাজারভিত্তিক আজকের দাম
            </h2>

            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
              বিভিন্ন বাজারের সর্বনিম্ন, সর্বোচ্চ ও গড় দাম দেখুন।
            </p>
          </div>

          {/* Horizontal scroll on small screens */}
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th scope="col" className="whitespace-nowrap px-4 py-3 font-semibold sm:px-5 sm:py-4">
                    বাজারের নাম
                  </th>

                  <th scope="col" className="whitespace-nowrap px-4 py-3 font-semibold sm:px-5 sm:py-4">
                    বিভাগ
                  </th>

                  <th scope="col" className="whitespace-nowrap px-4 py-3 font-semibold sm:px-5 sm:py-4">
                    সর্বনিম্ন দাম
                  </th>

                  <th scope="col" className="whitespace-nowrap px-4 py-3 font-semibold sm:px-5 sm:py-4">
                    সর্বোচ্চ দাম
                  </th>

                  <th scope="col" className="whitespace-nowrap px-4 py-3 font-semibold sm:px-5 sm:py-4">
                    গড় দাম
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {product.markets.map((market, index) => {
                  const marketAvg =
                    (market.min + market.max) / 2;

                  return (
                    <tr
                      key={`${market.market}-${index}`}
                      className="transition-colors hover:bg-gray-50"
                    >
                      <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-900 sm:px-5 sm:py-4">
                        {market.market}
                      </td>

                      <td className="whitespace-nowrap px-4 py-3 text-gray-600 sm:px-5 sm:py-4">
                        {market.division}
                      </td>

                      <td className="whitespace-nowrap px-4 py-3 font-medium text-green-600 sm:px-5 sm:py-4">
                        {market.min} টাকা
                      </td>

                      <td className="whitespace-nowrap px-4 py-3 font-medium text-red-600 sm:px-5 sm:py-4">
                        {market.max} টাকা
                      </td>

                      <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-900 sm:px-5 sm:py-4">
                        {marketAvg.toFixed(2)} টাকা
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <p className="mt-2 text-xs text-gray-500 sm:hidden">
            সম্পূর্ণ টেবিল দেখতে ডানে-বামে scroll করুন।
          </p>
        </section>
      </div>
    </main>
  );
};

export default ProductDetailsPage;
