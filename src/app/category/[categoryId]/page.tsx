import SortProducts from "@/components/SortProducts";
import { notFound } from "next/navigation";

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

interface CategoryPageProps {
  params: Promise<{ categoryId: string }>;
}

const CategoryProducts = async ({ params }: CategoryPageProps) => {
const { categoryId } = await params;
  let products: IProduct[] = [];

  try {
    const res = await fetch(
      `https://api.api-store.workers.dev/api/bazardor/products?category=${categoryId}`,
      { next: { revalidate: 300 } }
    );

    if (res.ok) {
      products = await res.json();
    }
  } catch (error) {
    console.error("Error fetching category products:", error);
  }

  if (!Array.isArray(products) || products.length === 0) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <div className="rounded-2xl bg-white px-4 py-8">
        <h1 className="text-2xl font-bold">
          {products[0].categoryIcon} {products[0].categoryNameBn}
        </h1>
        <p>{products.length}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
      </div>

      <SortProducts products={products} />
    </main>
  );
};

export default CategoryProducts;