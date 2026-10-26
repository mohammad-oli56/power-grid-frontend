
"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "@tanstack/react-form";
import { Eye, EyeOff, Loader2, LogIn } from "lucide-react";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";


import { useLogin } from "@/hooks/auth.hooks";
import { Input } from "@base-ui/react";
import { useRouter } from "next/navigation";
import { useGoogle } from "@/hooks/useMe.hooks";
import { toast } from "@/components/ui/toast";
import { GoogleLogin } from "@react-oauth/google";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const router = useRouter()

  const { mutate: login, isPending: loginPending } = useLogin();
  const { mutate: googleLogin } = useGoogle();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },

   

    onSubmit: ({ value }) => {
      setServerError("");

      const loginData = {
        email: value.email.trim(),
        password: value.password,
      };

      login(loginData, {
        onSuccess: (data) => {
          // console.log("Login successful:", data);

          // Example:
          router.push("/");
        },

        onError: (error: any) => {
          console.error("Login failed:", error);

          setServerError(
            error?.response?.data?.message ||
              error?.message ||
              "Invalid email or password. Please try again."
          );
        },
      });
    },
  });


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
    <div className="mx-auto w-full max-w-md">
      {/* Header */}
      <div className="mb-8 flex flex-col items-center text-center">
        <h1 className="text-2xl font-bold tracking-tight">
          Welcome back
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Sign in to your account to continue
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();

          form.handleSubmit();
        }}
        className="space-y-6"
      >
        <FieldGroup className="space-y-5">
          {/* Email */}
          <form.Field name="email">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched &&
                !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Email address
                  </FieldLabel>

                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    placeholder="you@example.com"
                    value={field.state.value}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                      setServerError("");
                    }}
                    onBlur={field.handleBlur}
                    autoComplete="email"
                    aria-invalid={isInvalid}
                    aria-describedby={
                      isInvalid
                        ? `${field.name}-error`
                        : undefined
                    }
                    className="h-11"
                  />

                  {isInvalid && (
                    <FieldError
                      id={`${field.name}-error`}
                      errors={field.state.meta.errors}
                    />
                  )}
                </Field>
              );
            }}
          </form.Field>

          {/* Password */}
          <form.Field name="password">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched &&
                !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <div className="flex items-center justify-between">
                    <FieldLabel htmlFor={field.name}>
                      Password
                    </FieldLabel>

                    <Link
                      href="/forgot-password"
                      className="text-xs font-medium text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div className="relative">
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={field.state.value}
                      onChange={(e) => {
                        field.handleChange(e.target.value);
                        setServerError("");
                      }}
                      onBlur={field.handleBlur}
                      autoComplete="current-password"
                      aria-invalid={isInvalid}
                      aria-describedby={
                        isInvalid
                          ? `${field.name}-error`
                          : undefined
                      }
                      className="h-11 pr-11"
                    />

                    <button
                      type="button"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                      onClick={() =>
                        setShowPassword((previous) => !previous)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>

                  {isInvalid && (
                    <FieldError
                      id={`${field.name}-error`}
                      errors={field.state.meta.errors}
                    />
                  )}
                </Field>
              );
            }}
          </form.Field>

          {/* Server Error */}
          {serverError && (
            <div
              role="alert"
              className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2.5 text-sm text-destructive"
            >
              {serverError}
            </div>
          )}

          {/* Submit */}
          <Button
            type="submit"
            className="h-11 w-full"
            disabled={loginPending}
          >
            {loginPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <LogIn className="size-4" />
                Sign in
              </>
            )}
          </Button>
        </FieldGroup>
      </form>

      {/* Register */}
      <div className="my-6 flex items-center gap-3">
        <Separator className="flex-1" />

        <span className="text-xs text-muted-foreground">
          OR
        </span>

        <Separator className="flex-1" />
      </div>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account?
        </p>

        <Button
        
          variant="outline"
          className="mt-3 h-11 w-full"
        >
          <Link href="/register">
            Create an account
          </Link>
        </Button>
      </div>

       <Field>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handelGoogleError}
          ></GoogleLogin>

          <FieldDescription className="px-6 text-center">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </FieldDescription>
        </Field>

      {/* Terms */}
      <p className="mt-6 text-center text-xs leading-relaxed text-muted-foreground">
        By continuing, you agree to our{" "}
        <Link
          href="/terms"
          className="underline underline-offset-4 hover:text-foreground"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="/privacy"
          className="underline underline-offset-4 hover:text-foreground"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}

