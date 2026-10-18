
"use client";

import React, { useEffect, useState } from "react";
import { useMe, useUpdate } from "@/hooks/useMe.hooks";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  UserRound,
  Phone,
  MapPin,
  Save,
  Loader2,
  XCircle,
  CheckCircle2,
  Pencil,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";

type ProfileFormValues = {
  name: string;
  phone: string;
  address: string;
};

const Updateprofile = () => {
  const { data, isPending, isError } = useMe();
    const updatedata = useUpdate()
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileFormValues>({
    defaultValues: {
      name: "",
      phone: "",
      address: "",
    },
  });

  useEffect(() => {
    if (data?.data) {
      reset({
        name: data.data.name ?? "",
        phone: data.data.phone ?? "",
        address: data.data.address ?? "",
      });
    }
  }, [data, reset]);

  const onSubmit = async (values: ProfileFormValues) => {
    setIsSaving(true);
    setSuccess("");
    setError("");

    try {
      
        const result = await updatedata.mutateAsync(values)
      console.log("Profile data to update:", result);

      setSuccess(
        "Form validated successfully. Connect your update API to save changes."
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to update profile. Please try again."
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (isPending) {
    return (
      <div className="mx-auto max-w-3xl space-y-5 p-6">
        <div className="h-8 w-48 animate-pulse rounded bg-muted" />
        <div className="h-96 animate-pulse rounded-2xl bg-muted" />
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center gap-3 p-8 text-center">
            <XCircle className="size-12 text-destructive" />
            <h2 className="text-xl font-semibold">
              Unable to load profile
            </h2>
            <p className="text-sm text-muted-foreground">
              Please try again later.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const profile = data.data;

  return (
    <div className="min-h-screen bg-muted/30 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-6">
        {/* Page heading */}
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-primary/10 p-3">
            <Pencil className="size-6 text-primary" />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Edit Profile
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Update your personal information below.
            </p>
          </div>
        </div>

        {/* Profile summary */}
        <Card className="overflow-hidden border-border/60 shadow-sm">
          <div className="h-2 bg-gradient-to-r from-primary via-violet-500 to-primary/40" />

          <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="flex items-center gap-4">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <UserRound className="size-7 text-primary" />
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-lg font-semibold">
                  {profile.name || "Your name"}
                </h2>
                <p className="truncate text-sm text-muted-foreground">
                  {profile.email}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Account: {profile.accountNumber}
                </p>
              </div>
            </div>

            <Badge variant="secondary" className="w-fit rounded-full px-3 py-1">
              {profile.role || "CUSTOMER"}
            </Badge>
          </CardContent>
        </Card>

        {/* Edit form */}
        <Card className="border-border/60 shadow-sm">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Update your name, phone number, and address.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
            >
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <UserRound className="absolute left-3 top-3 size-4 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    className="pl-10"
                    {...register("name", {
                      required: "Name is required.",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters.",
                      },
                    })}
                  />
                </div>
                {errors.name && (
                  <p className="text-sm text-destructive">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 size-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    className="pl-10"
                    {...register("phone", {
                      required: "Phone number is required.",
                      pattern: {
                        value: /^[+]?[\d\s()-]{7,20}$/,
                        message: "Please enter a valid phone number.",
                      },
                    })}
                  />
                </div>
                {errors.phone && (
                  <p className="text-sm text-destructive">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 size-4 text-muted-foreground" />
                  <Textarea
                    id="address"
                    placeholder="Enter your address"
                    className="min-h-28 pl-10"
                    {...register("address", {
                      required: "Address is required.",
                      minLength: {
                        value: 5,
                        message: "Address must be at least 5 characters.",
                      },
                    })}
                  />
                </div>
                {errors.address && (
                  <p className="text-sm text-destructive">
                    {errors.address.message}
                  </p>
                )}
              </div>

              {/* Feedback */}
              {success && (
                <div className="flex items-start gap-2 rounded-lg border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-700">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
                  <p>{success}</p>
                </div>
              )}

              {error && (
                <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                  <XCircle className="mt-0.5 size-4 shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              <div className="flex justify-end border-t pt-5">
                <Button
                  type="submit"
                  disabled={isSaving || !isDirty}
                  className="w-full sm:w-auto"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 size-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground">
          Only your name, phone number, and address can be edited here.
        </p>
      </div>
    </div>
  );
};

export default Updateprofile;
