"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
         <svg
  xmlns="http://www.w3.org/2000/svg"
  className="h-12 w-12 text-green-600"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  strokeWidth={2}
  role="img"
  aria-labelledby="payment-success-title"
>
  <title id="payment-success-title">Payment Successful</title>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M5 13l4 4L19 7"
  />
</svg>
        </div>

        <h1 className="mb-3 text-2xl font-bold text-gray-800">
          Payment Successful!
        </h1>

        <p className="mb-6 text-gray-600">
          Your payment has been completed successfully. Thank you!
        </p>

        <p className="mb-6 text-sm text-gray-500">
          Redirecting to the home page in 3 seconds...
        </p>

        <Link
          href="/"
          className="inline-block rounded-lg bg-green-600 px-6 py-3 font-medium text-white transition hover:bg-green-700"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default Page;