"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type FormValues = {
  email: string;
  otp: string;
  newPassword: string;
};

const API_URL =
  "https://assignment-06-mu.vercel.app/api/v1/auth";

export default function Page() {
  const router = useRouter();

  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      otp: "",
      newPassword: "",
    },
  });

  // Step 1: Send OTP to email
  const handleSendOtp = async () => {
    setMessage("");
    setSuccess(false);

    const email = getValues("email").trim();

    if (!email) {
      setMessage("Please enter your email address.");
      return;
    }

    setIsSendingOtp(true);

    try {
      const response = await fetch(
        `${API_URL}/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const result = await response.json();

      if (!response.ok || result.success === false) {
        throw new Error(
          result.message || "Failed to send OTP."
        );
      }

      setOtpSent(true);
      setSuccess(true);
      setMessage(
        result.message ||
          "OTP sent successfully. Please check your email."
      );
    } catch (error) {
      setSuccess(false);
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while sending OTP."
      );
    } finally {
      setIsSendingOtp(false);
    }
  };

  // Step 2: Reset password
  const onSubmit = async (values: FormValues) => {
    setMessage("");
    setSuccess(false);

    try {
      const response = await fetch(
        `${API_URL}/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email.trim(),
            newPassword: values.newPassword,
            otp: values.otp.trim(),
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || result.success === false) {
        throw new Error(
          result.message || "Failed to reset password."
        );
      }

      setSuccess(true);
      setMessage(
        result.message || "Password reset successful!"
      );

      // Redirect to Home after successful password reset
      router.push("/");
    } catch (error) {
      setSuccess(false);
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while resetting password."
      );
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          Reset Password
        </h1>

        <p className="mb-6 text-sm text-gray-500">
          Enter your email address to receive an OTP and
          create a new password.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>

            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              readOnly={otpSent}
              aria-invalid={!!errors.email}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email",
                },
              })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 read-only:bg-gray-100"
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Send OTP button */}
          {!otpSent && (
            <button
              type="button"
              onClick={handleSubmit(handleSendOtp)}
              disabled={isSendingOtp}
              className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSendingOtp ? "Sending OTP..." : "Send OTP"}
            </button>
          )}

          {/* OTP and new password */}
          {otpSent && (
            <>
              <div>
                <label
                  htmlFor="otp"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  OTP Verification
                </label>

                <input
                  id="otp"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  placeholder="Enter OTP from your email"
                  aria-invalid={!!errors.otp}
                  {...register("otp", {
                    required: "OTP is required",
                    pattern: {
                      value: /^[0-9]{6}$/,
                      message: "OTP must be 6 digits",
                    },
                  })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />

                {errors.otp && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.otp.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="newPassword"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>

                <input
                  id="newPassword"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Enter your new password"
                  aria-invalid={!!errors.newPassword}
                  {...register("newPassword", {
                    required: "New password is required",
                    minLength: {
                      value: 8,
                      message:
                        "Password must be at least 8 characters",
                    },
                  })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />

                {errors.newPassword && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-green-600 px-4 py-2.5 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting
                  ? "Resetting Password..."
                  : "Reset Password"}
              </button>
            </>
          )}

          {/* Success and error message */}
          {message && (
            <output
              className={`block rounded-lg p-3 text-sm ${
                success
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {message}
            </output>
          )}
        </form>
      </div>
    </main>
  );
}