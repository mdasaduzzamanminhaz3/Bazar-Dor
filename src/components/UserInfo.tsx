"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";

const UserInfo = () => {
  const { data: session } = authClient.useSession();

  const user = session?.user;

  const handleSignout = async () => {
    await authClient.signOut();
  };

  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2">
      {user ? (
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Profile */}
          <Link
            href="/profile"
            className="group flex items-center gap-2 rounded-full p-1 transition hover:bg-neutral-100"
          >
            <div className="avatar">
              <div className="w-9 rounded-full ring-2 ring-green-600 ring-offset-2 sm:w-10">
                <Image
                  src={user.image || "/default-avatar.png"}
                  alt={user.name || "User"}
                  width={40}
                  height={40}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Hide name on small screens */}
            <span className="hidden max-w-24 truncate text-sm font-medium text-neutral-700 md:block">
              {user.name}
            </span>
          </Link>

          {/* Sign out */}
          <button
            onClick={handleSignout}
            className="rounded-lg border border-neutral-200 px-2.5 py-1.5 text-xs font-medium text-neutral-600 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700 sm:px-3"
          >
            <span className="hidden sm:inline">Sign out</span>
            <span className="sm:hidden">↪</span>
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Link
            href="/signIn"
            className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-neutral-600 transition hover:bg-green-50 hover:text-green-700 sm:px-3 sm:text-sm"
          >
            সাইন ইন
          </Link>

          <Link
            href="/signUp"
            className="rounded-lg bg-green-700 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-green-800 hover:shadow-md sm:px-4 sm:py-2 sm:text-sm"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;