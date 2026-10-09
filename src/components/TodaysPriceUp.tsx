import { FaCaretUp } from "react-icons/fa";
import ProductCard from "./ProductCard";

interface IProduct {
  id: number;
  categoryNameBn: string;
  slug:string;
  categoryIcon: string;
  nameBn:string;
  unit: string;
  image: string;
  today: number;
  change: {
    dir: "up" | "down";
    pct: number;
  };
}

const TodaysPriceUp = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",{next:{revalidate:300}}
  );

  const data: IProduct[] = await res.json();

  const todayPriceUp = data.filter(
    (product) => product.change?.dir === "up").sort((a,b) => b.change.pct - a.change.pct).slice(0,6);

  // console.log("Today Price Up:", todayPriceUp);

  return (
    <div className="rounded-2xl mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 bg-white m-8">
      <h4 className="flex items-center gap-1 text-lg font-semibold mb-4">
        <FaCaretUp className="text-red-600"/>
        আজকে দাম বেড়েছে
      </h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
     {todayPriceUp.map((product) => (
  <ProductCard
    key={product.id}
    product={product}
  />
))}
      </div>
    </div>
  );
};

export default TodaysPriceUp;