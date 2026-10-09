import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
        {/* Visual Icon / Badge */}
        <div className="mx-auto w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center text-4xl mb-4 font-bold">
          🔍
        </div>

        {/* Status Code */}
        <span className="inline-block px-3 py-1 bg-red-50 text-red-600 font-semibold text-xs rounded-full mb-3">
          error 404
        </span>

        {/* Benglai Heading */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          পৃষ্ঠাটি পাওয়া যায়নি!
        </h1>

        {/* Message */}
        <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed">
          আপনি যে পণ্য বা পৃষ্ঠাটি খুঁজছেন তা মুছে ফেলা হয়েছে অথবা ভুল ইউআরএল দেওয়া হয়েছে।
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition-colors text-sm shadow-sm"
          >
            হোম পেজে যান
          </Link>

          <Link
            href="/#products-section"
            className="w-full sm:w-auto px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors text-sm"
          >
            সব পণ্য দেখুন
          </Link>
        </div>
      </div>
    </main>
  );
}