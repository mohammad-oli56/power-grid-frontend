
"use client";

import React, { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@base-ui/react";

import {
  FormState,
  registerAction,
} from "../_action/RegisterAction";

const initialState: FormState = {
  success: false,
  message: "",
  email: "",
};

const RegisterPage = () => {
  const router = useRouter();

  const [state, formAction, isPending] =
    useActionState(registerAction, initialState);

  useEffect(() => {
    if (state.success && state.email) {
      const timer = setTimeout(() => {
        router.push(
          `/verify-account?email=${encodeURIComponent(state.email)}`
        );
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [state.success, state.email, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-10">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">
            Create an Account
          </CardTitle>

          <CardDescription>
            Enter your information below to create your account.
          </CardDescription>

          <CardAction>
            <Button
              variant="outline"
              onClick={() => router.push("/login")}
            >
              Login
            </Button>
          </CardAction>
        </CardHeader>

        <form action={formAction}>
          <CardContent className="space-y-5">
            {/* Name */}
            <div className="grid gap-2">
              <Label htmlFor="name">
                Full Name
              </Label>

              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                minLength={3}
                required
              />
            </div>

            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="email">
                Email Address
              </Label>

              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                required
              />
            </div>

            {/* Phone */}
            <div className="grid gap-2">
              <Label htmlFor="phoneNumber">
                Phone Number
                <span className="text-gray-500 text-sm">
                  {" "}
                  (Optional)
                </span>
              </Label>

              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                placeholder="01XXXXXXXXX"
                pattern="^01[3-9]\d{8}$"
              />
            </div>

            {/* Password */}
            <div className="grid gap-2">
              <Label htmlFor="password">
                Password
              </Label>

              <Input
                id="password"
                name="password"
                type="password"
                placeholder="********"
                minLength={6}
                required
              />
            </div>

            {/* Message */}
            {state.message && (
              <div
                className={`rounded-lg p-3 text-sm ${
                  state.success
                    ? "bg-green-100 text-green-700 border border-green-300"
                    : "bg-red-100 text-red-700 border border-red-300"
                }`}
              >
                {state.message}
              </div>
            )}
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <Button
              type="submit"
              disabled={isPending}
              className="w-full"
            >
              {isPending
                ? "Registering..."
                : "Create Account"}
            </Button>

            <p className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="font-semibold text-blue-600 hover:underline"
              >
                Login
              </button>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default RegisterPage;

