import { FaCaretDown } from "react-icons/fa";
import ProductCard from "./ProductCard";

interface IProduct {
  id: number;
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

const TodaysPriceDown = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",{next:{revalidate:300}}
  );

  const data: IProduct[] = await res.json();

  const todayPriceDown = data.filter(
    (product) => product.change?.dir === "down").sort((a,b) => b.change.pct - a.change.pct).slice(0,6);

  console.log("Today Price Up:", todayPriceDown);

  return (
    <div className="m-4 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h4 className="flex items-center gap-1 text-lg font-semibold mb-4">
        <FaCaretDown className="text-green-600"/>
        আজকে দাম কমেছে
      </h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {todayPriceDown.map((product) => (
  <ProductCard
    key={product.id}
    product={product}
  />
))}
      </div>
    </div>
  );
};

export default TodaysPriceDown;