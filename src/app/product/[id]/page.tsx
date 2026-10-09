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

const ProductDetailsPage = async ({ params }: ProductDetailsPageProps) => {
const { id } = await params;
  let product: IProduct | null = null;

  try {
    const res = await fetch(
      `https://api.api-store.workers.dev/api/bazardor/products/${id}`,
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

  const minPrice = Math.min(...product.markets.map((market) => market.min));

  const maxPrice = Math.max(...product.markets.map((market) => market.max));

  const avgPrice =
    product.markets.reduce(
      (total, market) => total + (market.min + market.max) / 2,
      0,
    ) / product.markets.length;

  const priceDifference =
    product.yesterday != null ? product.today - product.yesterday : null;

  return (
    <main className="rounded-2xl m-4 mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 bg-white">
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
      <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <span className="rounded-2xl bg-gray-100 p-4 text-4xl">
              {product.image}
            </span>

            <div>
              <h1 className="mt-1 text-2xl font-bold">{product.nameBn}</h1>

              <p className="mt-1 text-sm text-gray-500">
                প্রতি {product.unit} {product.categoryNameBn}
              </p>

              {priceDifference !== null && (
                <p
                  className={`mt-2 text-sm font-medium ${
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
          <div className="rounded-xl bg-gray-100 p-5 sm:min-w-52">
            <p className="text-sm text-gray-500">আজকের দাম</p>

            <p className="mt-1 text-3xl font-bold">{product.today}</p>
            <p className="text-gray-700">টাকা/{product.unit}</p>
            <p
              className={`mt-2 text-sm font-semibold ${
                isPriceUp ? "text-red-600" : "text-green-600"
              }`}
            >
              {isPriceUp ? "▲ দাম বেড়েছে" : "▼ দাম কমেছে"} {product.change.pct}%
            </p>
          </div>
        </div>
      </section>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-gray-200 bg-white">
        <section className="mt-6 m-8">
          <h2 className="mb-4 text-xl font-bold">দামের সারসংক্ষেপ</h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <p className="text-sm text-gray-500">সর্বনিম্ন দাম</p>

              <p className="mt-2 text-2xl font-bold text-green-600">
                {minPrice} টাকা
              </p>
              <p>সবচেয়ে কম দামের বাজার</p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <p className="text-sm text-gray-500">সর্বোচ্চ দাম</p>

              <p className="mt-2 text-2xl font-bold text-red-600">
                {maxPrice} টাকা
              </p>
              <p>সবচেয়ে বেশি দামের বাজার</p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <p className="text-sm text-gray-500">গড় দাম</p>

              <p className="mt-2 text-2xl font-bold text-green-600">
                {avgPrice.toFixed(2)} টাকা
              </p>
              <p>প্রতি কেজি-এর হিসাবে</p>
            </div>
          </div>
        </section>

        <div className="mb-4 m-8">
          <h2 className="text-xl font-bold">বাজারভিত্তিক আজকের দাম</h2>
        </div>
        <table className="w-full min-w-[600px] text-left text-sm m-8">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-5 py-4 font-semibold">বাজারের নাম</th>

              <th className="px-5 py-4 font-semibold">বিভাগ</th>

              <th className="px-5 py-4 font-semibold">সর্বনিম্ন দাম</th>

              <th className="px-5 py-4 font-semibold">সর্বাধিক দাম</th>

              <th className="px-5 py-4 font-semibold">গড় দাম</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {product.markets.map((market, index) => {
              const marketAvg = (market.min + market.max) / 2;

              return (
                <tr
                  key={`${market.market}-${index}`}
                  className="transition-colors hover:bg-gray-50"
                >
                  <td className="whitespace-nowrap px-5 py-4 font-medium">
                    {market.market}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-gray-600">
                    {market.division}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 font-medium text-green-600">
                    {market.min} টাকা
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 font-medium text-red-600">
                    {market.max} টাকা
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 font-medium">
                    {marketAvg.toFixed(2)} টাকা
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default ProductDetailsPage;
