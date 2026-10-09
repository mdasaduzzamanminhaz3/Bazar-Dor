import ProductCard from "./ProductCard";

interface IProduct {
  id: number;
  categoryNameBn: string;
  nameBn:string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  change: {
    dir: "up" | "down";
    pct: number;
  };
}

const Products = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",{next:{revalidate:300}}
  );

  const data: IProduct[] = await res.json();

//   const todayPriceUp = data.filter(
//     (product) => product.change?.dir === "up").sort((a,b) => b.change.pct - a.change.pct).slice(0,6);

//   console.log("Today Price Up:", todayPriceUp);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h4 className="flex items-center gap-1 text-lg font-semibold mb-4">
        সব পণ্য
      </h4>
      <p>মোট {data.length}টি পণ্য দেখানো হচ্ছে </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
     {data.map((product) => (
  <ProductCard
    key={product.id}
    product={product}
  />
))}
      </div>
    </div>
  );
};

export default Products;