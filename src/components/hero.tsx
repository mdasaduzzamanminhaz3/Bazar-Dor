"use client"
import React from "react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <section className="rounded-2xl mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 bg-white m-8">
      <div >

        {/* Date */}
        <div className="mb-2">
          <span className="font-bold rounded-full bg-green-50 border border-green-200 px-5 py-2 text-sm text-green-700 shadow-sm">
            {date}
          </span>
        </div>

        {/* Hero Content */}
        <div className="flex flex-col-reverse items-center gap-10 lg:flex-row lg:justify-between lg:gap-16">

          {/* Left Content */}
          <div className="w-full text-center lg:w-1/2 lg:text-left">

            <h1 className="text-xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
              আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
              বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            {/* Button */}
            <div className="mt-7">
                <Link href={'/allProducts'}>
              <button className="btn rounded-lg bg-green-600 px-6 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:bg-green-700 hover:shadow-lg">
                সব পণ্য দেখুন
              </button>
                </Link>
            </div>

          </div>

          {/* Right Image */}
          <div className="w-full lg:w-1/2">
            <div className="relative mx-auto max-w-xs">
              <Image
                src="/bazar-hero.png"
                width={400}
                height={500}
                alt="বাজারের পণ্যের ছবি"
                priority
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

