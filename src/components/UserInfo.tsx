
"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import {
  FaUser,
  FaChevronDown,
} from "react-icons/fa";
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
      <div className="flex items-center gap-2 absolute right-0 top-1/2">
        <Link
          href="/signIn"
          className="btn hover:bg-green-100 btn-sm text-green-700"
        >
          সাইন ইন
        </Link>

        <Link
          href="/signUp"
          className="btn bg-green-600 btn-sm text-white"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  return (
    <div className="absolute right-0 top-1/2">
      {/* Profile trigger */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label="Open profile menu"
        className="flex items-center gap-2 rounded-full px-2 py-1.5 transition hover:bg-gray-200 cursor-pointer"
      >
        <div className="avatar">
          <div className="w-9 rounded-full ring-2 ring-success ring-offset-2">
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

        <span className="hidden max-w-28 truncate text-sm font-medium sm:block">
          {user.name}
        </span>

        <FaChevronDown
          size={11}
          className={`transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <>
          {/* Outside click overlay */}
          <button
            type="button"
            aria-label="Close profile menu"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute right-0 top-full z-50 mt-3 w-72 overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-xl">
            {/* User information */}
            <div className="border-b border-base-200 p-4">
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="w-12 rounded-full">
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

                <div className="min-w-0">
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
                <FaUser className="text-base-content/60" />
                <span>আমার প্রোফাইল</span>
              </Link>

              <button
                type="button"
                onClick={handleSignout}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-error transition hover:bg-error/10"
              >
                <PiArrowElbowDownLeftFill className="font-extrabold text-xl"/>
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