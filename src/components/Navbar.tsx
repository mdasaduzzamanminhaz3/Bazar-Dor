import Image from "next/image";
import Link from "next/link";
import NavLinks from "./NavLinks";
import UserInfo from "./UserInfo";
import CurrentDate from "./CurrentDate";

interface INavLink {
id: string,
slug: string,
nameBn: string,
icon: string
}

const Navbar = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories",
    {
      next: {
        revalidate: 60,
      },
    }
  );

  const data = await res.json();

  const navs: INavLink[] = data;

//   const date = new Date().toLocaleDateString("bn-BD", {
//     dateStyle: "full",
//   });

  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="relative flex min-h-24 items-center justify-center py-4">
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <Image
            className="bg-green-700 rounded-md"
              src="/logo-icon.png"
              alt="bazar dor"
              width={48}
              height={48}
              priority
            />

            <div className="text-center sm:text-left">
              <h1 className="text-xl font-bold sm:text-2xl">
                বাজার দর
              </h1>

              {/* <p className="text-xs text-neutral-500"> */}
                <CurrentDate/>
              {/* </p> */}
            </div>
          </Link>

          <UserInfo />
        </div>

        {/* Navigation */}
        <NavLinks navs={navs}/>
      </div>
    </header>
  );
};

export default Navbar;