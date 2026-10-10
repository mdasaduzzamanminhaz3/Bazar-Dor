
import React from "react";

const Footer = () => {
  return (
    <footer className="mx-auto my-4 w-full px-3 sm:my-4 sm:px-6 lg:my-8 lg:px-8">
      <div className="rounded-2xl border border-neutral-200 bg-white px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
        <div className="flex flex-col items-center gap-3 text-center sm:gap-4 lg:flex-row lg:justify-between lg:text-left">

          {/* Brand description */}
          <p className="text-sm leading-6 text-neutral-700 sm:text-base">
            <span className="font-bold text-green-700">বাজার দর</span>
            {" "}— প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>

          {/* Price disclaimer */}
          <p className="max-w-2xl text-xs leading-6 text-neutral-500 sm:text-sm lg:text-right">
            সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
          </p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
