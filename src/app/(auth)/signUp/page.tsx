"use client";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { toast } from "react-hot-toast";
import { FaGithub } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

const SignUpPage = () => {

const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  const name = String(formData.get("name") || "");
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");
  const confirmPassword = String(
    formData.get("confirmPassword") || ""
  );

  // Confirm password validation
  if (password !== confirmPassword) {
    toast.error("পাসওয়ার্ড দুটি মিলছে না!");
    return;
  }

  const { data, error } = await authClient.signUp.email({
    name,
    email,
    password,
    callbackURL: "/",
  });

  if (error) {
    toast.error(error.message as string);
    return;
  }

  if (data) {
    toast.success("সাইন আপ সফল হয়েছে!");
    redirect('/signIn');
  }
};

  const handleGoogleSignIn = async() => {
    const data = await authClient.signIn.social({
    provider: "google",
  });
  };

  const handleGithubSignIn = async() => {
     const data = await authClient.signIn.social({
        provider: "github"
    })
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          {/* Header */}
          <div className="mb-7 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-600 text-xl font-bold text-white shadow-sm">
              <Link href={"/"}>
                <Image src={"/logo-icon.png"} alt="logo" height={50} width={50} />
              </Link>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              অ্যাকাউন্ট তৈরি করুন
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
            </p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                নাম
              </label>

              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="আপনার নাম লিখুন"
                className="h-11 w-full rounded-lg border border-slate-300 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
              />
            </div>


            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                ইমেইল
              </label>

              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="আপনার ইমেইল লিখুন"
                className="h-11 w-full rounded-lg border border-slate-300 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                পাসওয়ার্ড
              </label>

              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={8}
                placeholder="কমপক্ষে ৮ অক্ষর"
                className="h-11 w-full rounded-lg border border-slate-300 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
              />
            </div>


{/* Confirm Password */}
<div>
  <label
    htmlFor="confirmPassword"
    className="mb-2 block text-sm font-medium text-slate-700"
  >
    পাসওয়ার্ড নিশ্চিত করুন
  </label>

  <input
    id="confirmPassword"
    name="confirmPassword"
    type="password"
    required
    minLength={8}
    placeholder="আবার পাসওয়ার্ড লিখুন"
    className="h-11 w-full rounded-lg border border-slate-300 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
  />
</div>

            {/* Submit */}
            <button
              type="submit"
              className="mt-2 h-11 w-full rounded-lg bg-green-600 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 active:scale-[0.99]"
            >
              সাইন আপ করুন
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs text-slate-400">অথবা</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* Social Login */}
          <div className="w-full flex items-center gap-2">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="btn flex h-11 w-1/2 items-center justify-center gap-3 rounded-lg border border-slate-300 bg-white text-sm font-medium text-slate-700 transition hover:bg-gray-100 active:scale-[0.99]"
            >
          <FcGoogle /> দিয়ে সাইন ইন করুন
            </button>

            <button
              type="button"
              onClick={handleGithubSignIn}
              className="btn flex h-11 w-1/2 items-center justify-center gap-3 rounded-lg bg-slate-900 text-sm font-medium text-white transition hover:bg-slate-800 active:scale-[0.99]"
            >
              <FaGithub /> দিয়ে সাইন ইন করুন
            </button>
          </div>

          {/* Footer */}
          <p className="mt-7 text-center text-sm text-slate-500">
            অ্যাকাউন্ট আছে?{" "}
            <Link
              href={"/signIn"}
              type="button"
              className="font-semibold text-green-600 hover:text-green-700"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </div>
      <Link href={'/'} className="text-gray-600 mt-8 flex items-center gap-1 max-w-fit mx-auto"><FaArrowLeftLong /> হোম পেজে ফিরে যান</Link>
      </div>
    </main>
  );
};

export default SignUpPage;