import Hero from "@/components/hero";
import Products from "@/components/Products";
import TodaysPriceDown from "@/components/TodaysPriceDown";
import TodaysPriceUp from "@/components/TodaysPriceUp";

export default function Home() {
  return (
    <div className="bg-green-50">
      <Hero/>
      <TodaysPriceUp/>
      <TodaysPriceDown/>
      <Products/>
    </div>
  );
}
