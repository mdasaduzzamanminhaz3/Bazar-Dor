
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
    <nav className="flex gap-1 overflow-x-auto border-t border-neutral-100 py-3 sm:justify-center sm:gap-2">
      {/* Categories */}
      {navs.map((nav) => {
        const isActive = pathname === `/category/${nav.slug}`;

        return (
          <Link
            key={nav.id}
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

const NavLinks = ({ navs }: NavLinksProps) => {
  return (
    <Suspense
      fallback={
        <nav className="flex gap-1 overflow-x-auto border-t border-neutral-100 py-3 sm:justify-center sm:gap-2">
          <Link
            href="/"
            className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 sm:px-4"
          >
            হোম
          </Link>
        </nav>
      }
    >
      <NavLinksContent navs={navs} />
    </Suspense>
  );
};

export default NavLinks;
