import Link from "next/link";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import MarqueeText from "react-marquee-text";

interface IHeadline {
  id: number;
  nameBn: string;
  image: string;
  today: number;
  change: {
    dir: string;
    pct: number;
  };
  unit: string;
}

const Marquee = async () => {
  let headlines: IHeadline[] = [];

  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/bazardor/products",
      { next: { revalidate: 200 } }
    );

    if (res.ok) {
      headlines = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch marquee products:", error);
  }

  // If fetch fails or no products returned, hide the marquee component safely
  if (!headlines || headlines.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto flex items-stretch bg-white">
        {/* Marquee */}
        <div className="flex-1 overflow-hidden">
          <MarqueeText className="py-2" direction="right" duration={10}>
            {headlines.map((h) => (
              <Link
                href={`/product/${h.id}`}
                key={h.id}
                className="inline-flex items-center gap-2 mx-5 transition bg-gray-50"
              >
                {/* Product Image */}
                <div className="relative">
                  <p>{h.image}</p>
                </div>

                {/* Product Name */}
                <span className="font-semibold">{h.nameBn}</span>

                {/* Price */}
                <span className="whitespace-nowrap font-medium">
                  {h.today} টাকা/{h.unit}
                </span>

                {/* Change */}
                {h.change.dir === "up" ? (
                  <span className="inline-flex items-center text-red-600 whitespace-nowrap">
                    <FaCaretUp />
                    {h.change.pct}%
                  </span>
                ) : (
                  <span className="inline-flex items-center text-green-600 font-medium whitespace-nowrap">
                    <FaCaretDown />
                    {h.change.pct}%
                  </span>
                )}

                {/* Separator */}
                <span className="text-gray-300 ml-3">|</span>
              </Link>
            ))}
          </MarqueeText>
        </div>
      </div>
    </div>
  );
};

export default Marquee;