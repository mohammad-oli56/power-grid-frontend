"use client";

import React, { useActionState, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@base-ui/react";
import { type TPrevState, verifyAction } from "../_action/verifyAccount";

const initialState: TPrevState = {
  success: false,
  message: "",
};

export default function VerifyAccount() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";
  const [otp, setOtp] = useState("");

  const [state, formAction, isPending] = useActionState(
    verifyAction,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      const timer = setTimeout(() => {
        router.push("/");
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [state.success, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-10">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Verify Your Account</CardTitle>

          <CardDescription>
            We sent a 6-digit OTP to
            <br />
            <span className="font-semibold text-gray-900">
              {email || "your email"}
            </span>
          </CardDescription>
        </CardHeader>

        <form action={formAction}>
          <CardContent className="space-y-5">
            <input type="hidden" name="email" value={email} />

            <div className="grid gap-2">
              <Label htmlFor="otp">Enter OTP</Label>

              <Input
                id="otp"
                name="otp"
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="123456"
                value={otp}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 6);

                  setOtp(value);
                }}
                className="text-center text-xl tracking-[0.5em]"
                required
              />
            </div>

            {state.message && (
              <output
                className={`block rounded-lg border p-3 text-center text-sm ${
                  state.success
                    ? "border-green-300 bg-green-100 text-green-700"
                    : "border-red-300 bg-red-100 text-red-700"
                }`}
              >
                {state.message}
              </output>
            )}
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <Button
              type="submit"
              disabled={isPending || otp.length !== 6 || !email}
              className="w-full"
            >
              {isPending ? "Verifying..." : "Verify OTP"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
