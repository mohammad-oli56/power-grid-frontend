
"use client";

import React from "react";
import { useMe } from "@/hooks/useMe.hooks";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  UserRound,
  Mail,
  Phone,
  MapPin,
  Hash,
  ShieldCheck,
  CalendarDays,
  Clock,
  Fingerprint,
  Globe, // Replace Chrome with Globe
  CircleUserRound,
  CheckCircle2,
  XCircle,
  Settings2,
} from "lucide-react";

const Mainprofile = () => {
  const { data, isPending, isError } = useMe();

  if (isPending) {
    return (
      <div className="min-h-screen bg-muted/30 p-6">
        <div className="mx-auto max-w-5xl space-y-6">
          <div className="h-8 w-48 animate-pulse rounded-lg bg-muted" />
          <div className="h-52 animate-pulse rounded-2xl bg-muted" />
          <div className="h-80 animate-pulse rounded-2xl bg-muted" />
        </div>
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center gap-3 p-8 text-center">
            <XCircle className="size-12 text-destructive" />
            <h2 className="text-xl font-semibold">Unable to load profile</h2>
            <p className="text-sm text-muted-foreground">
              Something went wrong while fetching your account information.
              Please try again later.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const profile = data.data;

  const initials =
    profile.name
      ?.split(" ")
      .filter(Boolean)
      .map((part: string) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  const formatDate = (date?: string | null) => {
    if (!date) return "Not available";

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) return "Not available";

    return parsed.toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const details = [
    {
      label: "Full name",
      value: profile.name,
      icon: UserRound,
    },
    {
      label: "Email address",
      value: profile.email,
      icon: Mail,
    },
    {
      label: "Phone number",
      value: profile.phone,
      icon: Phone,
    },
    {
      label: "Address",
      value: profile.address,
      icon: MapPin,
    },
    {
      label: "Account number",
      value: profile.accountNumber,
      icon: Hash,
    },
    {
      label: "Authentication provider",
      value: profile.provider,
     icon: Globe,
    },
    {
      label: "Google ID",
      value: profile.googleid,
      icon: Fingerprint,
    },
  ];

  return (
    <main className="min-h-screen bg-muted/30 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Page heading */}
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-primary/10 p-3">
            <CircleUserRound className="size-6 text-primary" />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              My Profile
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage and view your personal account information.
            </p>
          </div>
        </div>

        {/* Profile hero card */}
        <Card className="overflow-hidden border-border/60 shadow-sm">
          <div className="h-28 bg-gradient-to-r from-primary/80 via-primary/50 to-violet-500/60 sm:h-36" />

          <CardContent className="relative px-5 pb-6 sm:px-8">
            <div className="-mt-12 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-4">
                <Avatar className="size-24 border-4 border-background shadow-md sm:size-28">
                  <AvatarImage
                    src={profile.profilePhoto || undefined}
                    alt={profile.name || "User"}
                  />
                  <AvatarFallback className="bg-primary text-2xl font-bold text-primary-foreground">
                    {initials}
                  </AvatarFallback>
                </Avatar>

                <div className="pb-1">
                  <h2 className="text-xl font-bold sm:text-2xl">
                    {profile.name || "Unnamed user"}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {profile.email || "No email provided"}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 sm:pb-1">
                <Badge
                  variant={profile.isActive ? "default" : "destructive"}
                  className="gap-1 rounded-full px-3 py-1"
                >
                  {profile.isActive ? (
                    <CheckCircle2 className="size-3.5" />
                  ) : (
                    <XCircle className="size-3.5" />
                  )}
                  {profile.isActive ? "Active" : "Inactive"}
                </Badge>

                <Badge
                  variant="secondary"
                  className="rounded-full px-3 py-1"
                >
                  {profile.role || "CUSTOMER"}
                </Badge>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="flex items-center gap-3 rounded-xl bg-muted/50 p-4">
                <div className="rounded-lg bg-background p-2.5 shadow-sm">
                  <ShieldCheck className="size-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">
                    Email verification
                  </p>
                  <p className="font-semibold">
                    {profile.emailVerified ? "Verified" : "Not verified"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-muted/50 p-4">
                <div className="rounded-lg bg-background p-2.5 shadow-sm">
                  <CalendarDays className="size-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">
                    Member since
                  </p>
                  <p className="truncate font-semibold">
                    {profile.createdAt
                      ? new Date(profile.createdAt).toLocaleDateString(
                          undefined,
                          { dateStyle: "medium" }
                        )
                      : "Not available"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-muted/50 p-4">
                <div className="rounded-lg bg-background p-2.5 shadow-sm">
                  <Settings2 className="size-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">
                    Account status
                  </p>
                  <p className="font-semibold">
                    {profile.status || "Unknown"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal information */}
        <Card className="border-border/60 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <UserRound className="size-5 text-primary" />
              Personal Information
            </CardTitle>
            <CardDescription>
              Your personal details associated with this account.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid gap-x-8 sm:grid-cols-2">
              {details.map(({ label, value, icon: Icon }, index) => (
                <div key={label}>
                  <div className="flex min-w-0 items-start gap-3 py-4">
                    <div className="mt-0.5 rounded-lg bg-muted p-2.5">
                      <Icon className="size-4 text-muted-foreground" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-muted-foreground">
                        {label}
                      </p>
                      <p className="mt-1 break-all text-sm font-medium">
                        {value ?? "Not provided"}
                      </p>
                    </div>
                  </div>

                  {index < details.length - 1 && (
                    <Separator className="sm:hidden" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Account metadata */}
        <Card className="border-border/60 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="size-5 text-primary" />
              Account Activity
            </CardTitle>
            <CardDescription>
              Important dates associated with your account.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid gap-5 sm:grid-cols-3">
              <DateItem
                label="Account created"
                date={formatDate(profile.createdAt)}
              />
              <DateItem
                label="Last updated"
                date={formatDate(profile.updatedAt)}
              />
              <DateItem
                label="Deleted at"
                date={formatDate(profile.deletedAt)}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

function DateItem({
  label,
  date,
}: {
  label: string;
  date: string;
}) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-2 break-words text-sm font-semibold">{date}</p>
    </div>
  );
}

export default Mainprofile;
