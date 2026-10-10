
"use client";

import Image from "next/image";

const Hero = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <section className="mx-auto my-4 w-full max-w-7xl sm:my-6">
      <div className="overflow-hidden rounded-2xl bg-white px-4 py-6 shadow-sm sm:px-7 sm:py-8 md:px-8 md:py-10 lg:px-10 lg:py-12">

        {/* Date */}
        <div className="mb-6 sm:mb-8">
          <span className="inline-flex max-w-full items-center rounded-full border border-green-200 bg-green-50 px-3 py-2 text-xs font-bold leading-relaxed text-green-700 shadow-sm sm:px-5 sm:text-sm">
            {date}
          </span>
        </div>

        {/* Hero Content */}
        <div className="flex flex-col-reverse items-center gap-7 sm:gap-9 lg:flex-row lg:justify-between lg:gap-12">

          {/* Left Content */}
          <div className="w-full min-w-0 text-center lg:w-1/2 lg:text-left">

            <h1 className="text-2xl font-extrabold leading-snug tracking-tight text-gray-900 sm:text-3xl sm:leading-tight md:text-4xl lg:text-5xl">
              আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-600 sm:mt-5 sm:text-base md:text-lg lg:mx-0">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
              বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            {/* Button */}
            <div className="mt-6 sm:mt-8">
              <a
                href="#products-section"
                className="btn inline-flex min-h-11 rounded-lg border-0 bg-green-600 px-5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-green-700 hover:shadow-lg sm:px-6 sm:text-base"
              >
                সব পণ্য দেখুন
              </a>
            </div>

          </div>

          {/* Right Image */}
          <div className="w-full min-w-0 lg:w-1/2">
            <div className="relative mx-auto w-full max-w-[220px] sm:max-w-[280px] md:max-w-sm lg:max-w-md">
              <Image
                src="/bazar-hero.png"
                width={400}
                height={500}
                alt="বাজারের পণ্যের ছবি"
                priority
                sizes="(max-width: 639px) 220px, (max-width: 1023px) 320px, 400px"
                className="h-auto w-full object-contain"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
