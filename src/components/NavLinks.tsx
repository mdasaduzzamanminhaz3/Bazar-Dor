
"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface INavLink {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

interface NavLinksProps {
  navs: INavLink[];
}

const NavLinksContent = ({ navs }: NavLinksProps) => {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Product categories"
      className="flex w-full items-center gap-1 overflow-x-auto border-t border-neutral-100 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-2 sm:py-3 md:justify-center"
    >
      {/* Categories */}
      {navs.map((nav) => {
        const isActive = pathname === `/category/${nav.slug}`;

        return (
          <Link
            key={nav.id}
            href={`/category/${nav.slug}`}
            aria-current={isActive ? "page" : undefined}
            className={`shrink-0 whitespace-nowrap rounded-lg px-3 py-2 text-xs font-medium transition sm:px-4 sm:text-sm ${
              isActive
                ? "bg-green-700 text-white shadow-sm"
                : "text-neutral-600 hover:bg-green-50 hover:text-green-700"
            }`}
          >
            <span className="mr-1" aria-hidden="true">
              {nav.icon}
            </span>
            {nav.nameBn}
          </Link>
        );
      })}
    </nav>
  );
};

const NavLinks = ({ navs }: NavLinksProps) => {
  return (
    <Suspense
      fallback={
        <nav className="flex gap-2 overflow-x-auto border-t border-neutral-100 py-3">
          <span className="shrink-0 px-3 py-2 text-sm text-neutral-500">
            ক্যাটাগরি লোড হচ্ছে...
          </span>
        </nav>
      }
    >
      <NavLinksContent navs={navs} />
    </Suspense>
  );
};

export default NavLinks;
