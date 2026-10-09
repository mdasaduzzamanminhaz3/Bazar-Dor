import ProductCard from "./ProductCard";

interface IProduct {
  id: number;
  categoryNameBn: string;
  nameBn: string;
  slug: string;
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
  let data: IProduct[] = [];

  try {
    const res = await fetch(
      "https://api.api-store.workers.dev/api/bazardor/products",
      { next: { revalidate: 300 } }
    );

    if (res.ok) {
      data = await res.json();
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }


  return (
    <div
      id="products-section"
      className="rounded-2xl mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 bg-white m-8"
    >
      <h4 className="flex items-center gap-1 text-lg font-semibold mb-4">
        সব পণ্য
      </h4>
      <p className="mb-4">মোট {data.length}টি পণ্য দেখানো হচ্ছে</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;