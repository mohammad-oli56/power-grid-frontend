"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <h1 className="mb-3 text-2xl font-bold text-gray-800">
          Payment Failed!
        </h1>

        <p className="mb-6 text-gray-600">
          Unfortunately, your payment could not be completed.
          Please try again.
        </p>

        <p className="mb-6 text-sm text-gray-500">
          Redirecting to the home page in 3 seconds...
        </p>

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            onClick={() => router.replace("/")}
            className="rounded-lg bg-gray-800 px-6 py-3 font-medium text-white transition hover:bg-gray-900"
          >
            Go to Home
          </Button>

          <Button
            onClick={() => router.back()}
            className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;