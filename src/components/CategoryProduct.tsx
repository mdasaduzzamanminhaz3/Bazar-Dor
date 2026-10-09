import ProductCard from "./ProductCard";

interface IProduct {
  id: number;
  slug: string;
  nameBn: string;
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

interface CategoryProductProps {
  product: IProduct;
}

const CategoryProduct = ({ product }: CategoryProductProps) => {

  return (
    <div>
        <ProductCard product={product}/>
    </div>
  );
};

export default CategoryProduct;