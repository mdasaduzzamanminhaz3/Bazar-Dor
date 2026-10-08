"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface INavLink {
id: string,
slug: string,
nameBn: string,
icon: string
}

interface NavLinksProps {
  navs: INavLink[];
}

const NavLinks = ({ navs }: NavLinksProps) => {
  const pathname = usePathname();

//   const filterNavLinks = navs.filter((nav) => nav.scrapable);

  return (
    <nav className="flex gap-1 overflow-x-auto border-t border-neutral-100 py-3 sm:justify-center sm:gap-2">
      
      {/* Home */}
      <Link
        href="/"
        className={`shrink-0 rounded-lg px-3 py-2 text-sm font-medium transition sm:px-4 ${
          pathname === "/"
            ? "bg-green-700 text-white shadow-sm"
            : "text-neutral-600 hover:bg-green-50 hover:text-green-700"
        }`}
      >
        হোম
      </Link>

      {/* Categories */}
      {navs.map((nav, index) => {
        const isActive = pathname === `/category/${nav.slug}`;

        return (
          <Link
            key={`${nav.slug}-${index}`}
            href={`/category/${nav.slug}`}
            className={`shrink-0 rounded-lg px-3 py-2 text-sm font-medium transition sm:px-4 ${
              isActive
                ? "bg-green-700 text-white shadow-sm"
                : "text-neutral-600 hover:bg-green-50 hover:text-green-700"
            }`}
          >
            <span>{nav.icon}</span> {nav.nameBn}
          </Link>
        );
      })}
    </nav>
  );
};

export default NavLinks;