
"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  FaSignOutAlt,
  FaUser,
  FaEdit,
} from "react-icons/fa";
import { PiArrowElbowDownLeftFill } from "react-icons/pi";

const ProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  const user = session?.user;

  const handleShowForm = () => {
    setName(user?.name || "");
    setShow((prev) => !prev);
  };

  const handleUpdateProfile = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("আপনার নাম লিখুন");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.updateUser({
        name: name.trim(),
      });

      if (error) {
        toast.error(error.message || "Profile update করা যায়নি");
        return;
      }

      toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
      setShow(false);
    } catch {
      toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  const handleSignout = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      toast.error("Sign out করা যায়নি");
      return;
    }

    window.location.href = "/signIn";
  };

  if (isPending) {
    return (
      <main className="min-h-screen bg-[#f0f5f0] p-6">
        <div className="mx-auto max-w-3xl">
          <span className="loading loading-spinner loading-md text-success" />
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 bg-[#f0f5f0] p-6">
        <FaUser className="text-4xl text-success" />

        <h1 className="text-xl font-bold">
          আপনার প্রোফাইল দেখতে সাইন ইন করুন
        </h1>

        <a href="/signIn" className="btn btn-success text-white">
          সাইন ইন
        </a>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-3xl">

        {/* Page heading */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-gray-800 sm:text-2xl">
            আমার প্রোফাইল
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন
          </p>
        </div>

        {/* Profile information card */}
        <section className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex min-w-0 items-center gap-3">
              <div className="avatar">
                <div className="h-14 w-14 overflow-hidden rounded-2xl bg-gray-100 sm:h-16 sm:w-16">
                  <Image
                    src={user.image || "/no-image.jpg"}
                    alt={user.name || "User profile"}
                    width={64}
                    height={64}
                    className="h-full w-full object-cover"
                    unoptimized
                  />
                </div>
              </div>

              <div className="min-w-0">
                <h2 className="truncate font-semibold text-gray-800">
                  {user.name}
                </h2>

                <p className="truncate text-sm text-gray-500">
                  {user.email}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSignout}
              className="btn btn-outline btn-error btn-sm self-start sm:self-center"
            >
              <PiArrowElbowDownLeftFill className="font-extrabold text-xl"/>
              সাইন আউট
            </button>
          </div>
        </section>

        {/* User details card */}
        <section className="mt-4 rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-semibold text-gray-800">
              তথ্য
            </h2>

            <button
              type="button"
              onClick={handleShowForm}
              className="btn btn-ghost btn-sm text-green-600"
            >
              <FaEdit />
              {show ? "বন্ধ করুন" : "Edit Profile"}
            </button>
          </div>

          {show ? (
            <form
              onSubmit={handleUpdateProfile}
              className="space-y-4"
            >
              <div className="form-control w-full">
                <label
                  htmlFor="name"
                  className="label"
                >
                  <span className="label-text text-gray-700">
                    নাম
                  </span>
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="আপনার নাম লিখুন"
                  className="input input-bordered w-full focus:border-success"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn bg-green-600 w-full text-white"
              >
                {loading && (
                  <span className="loading loading-spinner loading-sm" />
                )}

                {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
              </button>
            </form>
          ) : (
            <div className="space-y-2">
              <label className="text-sm text-gray-500">
                নাম
              </label>

              <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800">
                {user.name || "নাম দেওয়া হয়নি"}
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default ProfilePage;