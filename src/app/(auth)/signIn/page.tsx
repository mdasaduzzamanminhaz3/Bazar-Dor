"use client";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { toast } from "react-hot-toast";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const SignInPage = () => {
  const onSubmit = async(e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);
     const user = Object.fromEntries(formData.entries()) as {email:string,password:string}
    const{data,error}= await authClient.signIn.email({
        ...user,
        callbackURL:"/"
    })
     if(data){
        // console.log(data);
        redirect('/')
    }
    if(error){
        toast.error(error.message as string)
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
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-7 py-10">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-600 text-xl font-bold text-white shadow-sm">
              <Link href={'/'}>
              <Image src={'/logo-icon.png'} alt="logo" height={50} width={50}/>
              </Link>

            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              সাইন ইন করুন
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
            </p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                ইমেইল
              </label>

              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-slate-700"
                >
                  পাসওয়ার্ড
                </label>

                <Link href={'/forgot-password'}
                  type="button"
                  className="text-xs font-medium text-green-600 hover:text-green-700"
                >
                  পাসওয়ার্ড ভুলে গেছেন?
                </Link>
              </div>

              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="আপনার পাসওয়ার্ড লিখুন"
                className="h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
              />
            </div>

            <button
              type="submit"
              className="h-11 w-full rounded-lg bg-green-600 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 active:scale-[0.99]"
            >
              সাইন ইন করুন
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
            অ্যাকাউন্ট নেই?{" "}
            <Link href={'/signUp'}
              type="button"
              className="font-semibold text-green-600 hover:text-green-700"
            >
              রেজিস্টার করুন
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default SignInPage;