
import Image from "next/image";
import Link from "next/link";
import NavLinks from "./NavLinks";
import UserInfo from "./UserInfo";

interface INavLink {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const Navbar = async () => {
  let navs: INavLink[] = [];

  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/bazardor/categories",
      { next: { revalidate: 60 } }
    );

    if (res.ok) {
      navs = await res.json();
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
  }

  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto w-full max-w-7xl px-3 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex min-h-20 items-center justify-between gap-2 py-3 sm:min-h-24 sm:gap-4">
          {/* Logo and date */}
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2 sm:gap-3"
          >
            <Image
              src="/logo-icon.png"
              alt="Bazar Dor"
              width={48}
              height={48}
              priority
              className="h-9 w-9 shrink-0 rounded-md bg-green-600 sm:h-12 sm:w-12"
            />

            <div className="min-w-0">
              <h1 className="text-lg font-bold leading-tight sm:text-2xl">
                বাজার দর
              </h1>

              <p className="mt-1 max-w-52 truncate text-[10px] text-neutral-500 sm:max-w-none sm:text-xs">
                {date}
              </p>
            </div>
          </Link>

          {/* Sign in / user profile */}
          <div className="shrink-0">
            <UserInfo />
          </div>
        </div>

        {/* Category navigation */}
        <NavLinks navs={navs} />
      </div>
    </header>
  );
};

export default Navbar;
