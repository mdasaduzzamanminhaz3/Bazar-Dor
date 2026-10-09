import ProductDetails from "@/components/ProductDetails";
import { notFound } from "next/navigation";

interface Iproduct {
id: string,
slug: string,
nameBn: string,
icon: string
}
const CategoryNews = async({params}:{params:{categoryId:string}}) => {
    const {categoryId} = await params;
    const res = await fetch(`https://api.api-store.workers.dev/api/bazardor/categories/${categoryId}`)
    const data = await res.json();
    const categoryProducts:Iproduct[] = data.data;
    if(!categoryProducts){
        notFound()
    }                   
    return (
        <div>
      <h1 className="text-2xl font-bold border-b-2 border-red-700 mb-5">
        {data.title}
      </h1>

      <div className="grid grid-cols-3 gap-10">
        {categoryProducts.map((product) => (
          <ProductDetails key={product.id} product={product} />
        ))}
      </div>
    </div>
    );
};

export default CategoryNews;