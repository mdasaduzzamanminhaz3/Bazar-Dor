import { FaCaretDown, FaCaretUp } from "react-icons/fa";

interface IProduct {
  id: number;
  categoryNameBn: string;
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

interface ProductCardProps {
  product: IProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const isPriceUp = product.change.dir === "up";

  return (
    <div className="bg-white border border-gray-200 hover:border-green-500 hover:shadow-md transition-all duration-300 px-4 py-4 rounded-2xl">
      {/* Product Info */}
      <div className="flex items-center gap-3">
        <span className="bg-gray-100 rounded-2xl px-5 py-3 text-2xl">
          {product.image}
        </span>

        <div className="flex flex-col">
          <span className="font-medium">
            {product.nameBn}
          </span>

          <span className="text-sm text-gray-500">
            প্রতি {product.unit}
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="flex justify-between items-end mt-5">
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">
            আজকের দাম
          </span>

          <span className="text-xl font-bold">
            {product.today} টাকা
          </span>
        </div>

        {/* Price Change */}
        <span
          className={`flex items-center gap-1 font-semibold ${
            isPriceUp ? "text-red-600" : "text-green-600"
          }`}
        >
          {isPriceUp ? <FaCaretUp /> : <FaCaretDown />}
          {product.change.pct}%
        </span>
      </div>
    </div>
  );
};

export default ProductCard;