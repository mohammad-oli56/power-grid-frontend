"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";


import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";
import { loginAction } from "../_action/AuthAction";
import { Input } from "@base-ui/react";
import { useGoogle } from "@/hooks/useMe.hooks";
import { toast } from "@/components/ui/toast";
import { Field, FieldDescription } from "@/components/ui/field";
import { GoogleLogin } from "@react-oauth/google";
import Link from "next/link";

const initialState = {
  success: false,
  message: "",
};

export default function Page() {
  const router = useRouter();

  const [state, action, pending] = useActionState(loginAction, initialState);
  const { mutate: googleLogin } = useGoogle();

    
  const handleGoogleSuccess = (credentialResponse: { credential?: string }) => {
    const idToken = credentialResponse.credential;
    console.log(idToken);
    if (!idToken) {
      toast.add({
        title: "Google OAuth failed",
        description: "Something went wrong. Please try again.",
      });
      return;
    }

    googleLogin(idToken, {
      onSuccess: () => {
        toast.add({
          type: "success",
          description: "google login successfull ",
        });
        router.push("/")
      },
      onError: () => {
        toast.add({
          title: "Google OAuth failed",
          description: "Something went wrong. Please try again.333",
        });
      },
    });
  };

  const handelGoogleError = () => {
    toast.add({
      title: "google oauth faied",
      description: "somethisn wen wron .plest try again",
    });
    return;
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>

          <CardAction>
            <Button type="button" onClick={() => router.push("/register")}>
              Sign Up
            </Button>
          </CardAction>
        </CardHeader>

        <form action={action}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Your Password"
                  required
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-2">
            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? "Submitting..." : "Login"}
            </Button>

            {state?.message && (
              <p
                className={`text-center text-sm ${
                  state.success ? "text-green-600" : "text-red-600"
                }`}
              >
                {state.message}
              </p>
            )}
          </CardFooter>
        </form>
        <Field>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handelGoogleError}
          ></GoogleLogin>

         
        </Field>
      </Card>
    </div>
  );
}