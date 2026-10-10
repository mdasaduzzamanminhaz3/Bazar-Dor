
"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { FaUser, FaChevronDown } from "react-icons/fa";
import { PiArrowElbowDownLeftFill } from "react-icons/pi";

const UserInfo = () => {
  const { data: session } = authClient.useSession();
  const [isOpen, setIsOpen] = useState(false);

  const user = session?.user;

  const handleSignout = async () => {
    await authClient.signOut();
    setIsOpen(false);
  };

  if (!user) {
    return (
      <div className="flex items-center gap-1.5 sm:gap-2">
        <Link
          href="/signIn"
          className="btn btn-xs border-green-200 bg-white text-green-700 hover:bg-green-50 sm:btn-sm"
        >
          সাইন ইন
        </Link>

        <Link
          href="/signUp"
          className="btn btn-xs border-green-600 bg-green-600 text-white hover:bg-green-700 sm:btn-sm"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Profile trigger */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label="Open profile menu"
        className="flex max-w-full items-center gap-1.5 rounded-full px-1.5 py-1.5 transition hover:bg-gray-100 sm:gap-2 sm:px-2"
      >
        <div className="avatar shrink-0">
          <div className="w-8 rounded-full ring-2 ring-success ring-offset-1 sm:w-9 sm:ring-offset-2">
            <Image
              src={user.image || "/default-avatar.png"}
              alt={user.name || "User"}
              width={40}
              height={40}
              unoptimized
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <span className="hidden max-w-28 truncate text-sm font-medium md:block">
          {user.name}
        </span>

        <FaChevronDown
          size={10}
          className={`shrink-0 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <>
          {/* Outside click overlay */}
          <button
            type="button"
            aria-label="Close profile menu"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute right-0 top-full z-50 mt-2 w-[min(18rem,calc(100vw-1.5rem))] overflow-hidden rounded-xl border border-base-300 bg-base-100 shadow-xl sm:mt-3 sm:rounded-2xl">
            {/* User information */}
            <div className="border-b border-base-200 p-3 sm:p-4">
              <div className="flex items-center gap-3">
                <div className="avatar shrink-0">
                  <div className="w-10 rounded-full sm:w-12">
                    <Image
                      src={user.image || "/default-avatar.png"}
                      alt={user.name || "User"}
                      width={48}
                      height={48}
                      unoptimized
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold">
                    {user.name || "Bazar Dor User"}
                  </p>

                  <p className="truncate text-xs text-base-content/60">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu options */}
            <div className="p-2">
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition hover:bg-base-200"
              >
                <FaUser className="shrink-0 text-base-content/60" />
                <span>আমার প্রোফাইল</span>
              </Link>

              <button
                type="button"
                onClick={handleSignout}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-error transition hover:bg-error/10"
              >
                <PiArrowElbowDownLeftFill className="shrink-0 text-xl" />
                <span>সাইন আউট</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserInfo;
