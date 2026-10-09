"use client";
import { useState } from "react";
import CategoryProduct from "@/components/CategoryProduct";

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
  change: {
    dir: "up" | "down";
    pct: number;
  };
}

interface SortableProductsProps {
  products: IProduct[];
}

type SortOption = "default" | "price-asc" | "price-desc";

const SortProducts = ({ products }: SortableProductsProps) => {
  const [sortBy, setSortBy] = useState<SortOption>("default");

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price-asc") return a.today - b.today;
    if (sortBy === "price-desc") return b.today - a.today;
    return 0;
  });

  return (
    <>
      <div className="mt-4 flex justify-end rounded-2xl bg-white px-4 py-5">
        <label className="mr-2 self-center text-sm text-gray-600">
          সাজান
        </label>

        <div className="relative">
          <select
            value={sortBy}
            onChange={(event) =>
              setSortBy(event.target.value as SortOption)
            }
            className="select select-sm appearance-none pr-9"
            aria-label="পণ্য সাজান"
          >
            <option value="default">ডিফল্ট</option>
            <option value="price-asc">দাম: কম থেকে বেশি</option>
            <option value="price-desc">দাম: বেশি থেকে কম</option>
          </select>


        </div>
      </div>

      <p className="mb-2 mt-8">
        মোট {sortedProducts.length} পণ্য দেখানো হচ্ছে
      </p>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product) => (
          <CategoryProduct key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default SortProducts;