"use client";

import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  ShieldAlert,
  Key,
  Calendar,
  Clock,
  Copy,
  Check,
  Edit3,
  CreditCard,
  Building,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Fingerprint,
  UserCheck,
  Globe,
  Trash2,
  ExternalLink,
} from "lucide-react";

export interface ProfileData {
  id: string;
  name: string;
  email: string;
  googleid: string | null;
  provider: string;
  accountNumber: string;
  address: string | null;
  createdAt: string;
  deletedAt: string | null;
  emailVerified: boolean;
  isActive: boolean;
  phone: string | null;
  profilePhoto: string | null;
  role: string;
  status: string;
  updatedAt: string;
}

interface MainprofileProps {
  data: ProfileData | null;
  onEditProfile?: () => void;
}

// Formatters & Utility Functions
function formatDate(dateString: string | null): string {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date";
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  } catch {
    return "Invalid Date";
  }
}

function CopyableText({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback or handle copy error gracefully
    }
  };

  return (
    <div className="flex items-center justify-between gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 transition-colors hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:bg-slate-800/50">
      <div className="min-w-0 flex-1">
        {label && (
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {label}
          </p>
        )}
        <p className="truncate font-mono text-sm font-semibold text-slate-800 dark:text-slate-200">
          {text}
        </p>
      </div>
      <button
        onClick={handleCopy}
        type="button"
        aria-label="Copy to clipboard"
        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
      >
        {copied ? (
          <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}

function StatusBadge({
  isActive,
  isDeleted,
  status,
}: {
  isActive: boolean;
  isDeleted: boolean;
  status: string;
}) {
  if (isDeleted) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-700 ring-1 ring-inset ring-rose-600/20 dark:bg-rose-950/40 dark:text-rose-400 dark:ring-rose-500/30">
        <Trash2 className="h-3.5 w-3.5" />
        Account Deleted
      </span>
    );
  }

  if (!isActive || status.toLowerCase() === "inactive") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20 dark:bg-amber-950/40 dark:text-amber-400 dark:ring-amber-500/30">
        <AlertCircle className="h-3.5 w-3.5" />
        Inactive
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-950/40 dark:text-emerald-400 dark:ring-emerald-500/30">
      <CheckCircle2 className="h-3.5 w-3.5" />
      Active
    </span>
  );
}

// Skeleton Loader Component
export function ProfileSkeleton() {
  return (
    <div className="mx-auto max-w-6xl animate-pulse space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Header Skeleton */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          <div className="h-24 w-24 rounded-full bg-slate-200 dark:bg-slate-800" />
          <div className="flex-1 space-y-3 text-center sm:text-left">
            <div className="h-7 w-48 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-4 w-64 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="flex justify-center gap-2 sm:justify-start">
              <div className="h-6 w-20 rounded-full bg-slate-200 dark:bg-slate-800" />
              <div className="h-6 w-24 rounded-full bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>
        </div>
      </div>

      {/* Grid Skeleton */}
      

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="h-64 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900" />
        <div className="h-64 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900" />
      </div>
    </div>
  );
}

// Main Component
export default function Mainprofile({ data, onEditProfile }: MainprofileProps) {
  if (!data) {
    return <ProfileSkeleton />;
  }

  const isDeleted = Boolean(data.deletedAt);

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8">
      {/* 1. Header Section */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center">
            {/* Avatar / Photo */}
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-white shadow-md ring-2 ring-slate-200 dark:border-slate-800 dark:ring-slate-700">
              {data.profilePhoto ? (
                <img
                  src={data.profilePhoto}
                  alt={data.name || "User Avatar"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-2xl font-bold text-white">
                  {data.name ? data.name.charAt(0).toUpperCase() : "U"}
                </div>
              )}
            </div>

            {/* Profile Brief info */}
            <div className="space-y-1.5 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {data.name || "Unnamed User"}
                </h1>
                <StatusBadge
                  isActive={data.isActive}
                  isDeleted={isDeleted}
                  status={data.status}
                />
              </div>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                {data.email}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs text-slate-600 sm:justify-start dark:text-slate-300">
                <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2.5 py-1 font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  <UserCheck className="h-3.5 w-3.5 text-blue-500" />
                  Role: <span className="capitalize">{data.role}</span>
                </span>
                <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2.5 py-1 font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  <Globe className="h-3.5 w-3.5 text-indigo-500" />
                  Provider: <span className="capitalize">{data.provider}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Edit Profile Action */}
          {onEditProfile && (
            <button
              onClick={onEditProfile}
              type="button"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
            >
              <Edit3 className="h-4 w-4" />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* 2. Account Overview Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Account Number Card */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Account No.
            </span>
            <div className="rounded-lg bg-blue-50 p-2 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
              <CreditCard className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-3 font-mono text-lg font-bold text-slate-900 dark:text-white">
            {data.accountNumber || "N/A"}
          </p>
        </div>

        {/* Email Verification Card */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Email Status
            </span>
            <div
              className={`rounded-lg p-2 ${
                data.emailVerified
                  ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400"
                  : "bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400"
              }`}
            >
              {data.emailVerified ? (
                <ShieldCheck className="h-5 w-5" />
              ) : (
                <ShieldAlert className="h-5 w-5" />
              )}
            </div>
          </div>
          <p className="mt-3 text-lg font-bold text-slate-900 dark:text-white">
            {data.emailVerified ? "Verified" : "Unverified"}
          </p>
        </div>

        {/* Authentication Provider Card */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Auth Provider
            </span>
            <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
              <Key className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-3 text-lg font-bold capitalize text-slate-900 dark:text-white">
            {data.provider || "Standard"}
          </p>
        </div>

        {/* Account State Card */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Account Status
            </span>
            <div className="rounded-lg bg-purple-50 p-2 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400">
              <Building className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-3 text-lg font-bold capitalize text-slate-900 dark:text-white">
            {data.status || "Unknown"}
          </p>
        </div>
      </div>

      {/* Grid: Information & Account Details */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* 3. Personal Information Section */}
        <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div>
            <div className="mb-6 flex items-center gap-2 border-b border-slate-100 pb-4 dark:border-slate-800">
              <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Personal Information
              </h2>
            </div>

            <div className="space-y-4">
              {/* Full Name */}
              <div className="flex items-start gap-3">
                <User className="mt-1 h-4 w-4 shrink-0 text-slate-400" />
                <div className="flex-1">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Full Name
                  </p>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {data.name || "Not provided"}
                  </p>
                </div>
              </div>

              {/* Email Address */}
              <div className="flex items-start gap-3">
                <Mail className="mt-1 h-4 w-4 shrink-0 text-slate-400" />
                <div className="flex-1">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Email Address
                  </p>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {data.email || "Not provided"}
                  </p>
                </div>
              </div>

              {/* Phone Number */}
              <div className="flex items-start gap-3">
                <Phone className="mt-1 h-4 w-4 shrink-0 text-slate-400" />
                <div className="flex-1">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Phone Number
                  </p>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {data.phone || "Not provided"}
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-slate-400" />
                <div className="flex-1">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Address
                  </p>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {data.address || "Not provided"}
                  </p>
                </div>
              </div>

              {/* Profile Photo Status */}
              <div className="flex items-start gap-3">
                <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-slate-400" />
                <div className="flex-1">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Profile Picture Status
                  </p>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {data.profilePhoto ? "Custom Photo Uploaded" : "Default Avatar"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Account Details Section */}
        <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div>
            <div className="mb-6 flex items-center gap-2 border-b border-slate-100 pb-4 dark:border-slate-800">
              <Fingerprint className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Technical & System Details
              </h2>
            </div>

            <div className="space-y-4">
              {/* User ID */}
              <CopyableText label="User System ID" text={data.id} />

              {/* Account Number Copyable */}
              <CopyableText
                label="Account Reference Number"
                text={data.accountNumber}
              />

              {/* System Identifiers Grid */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Google ID
                  </p>
                  <p className="truncate font-mono text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {data.googleid ? data.googleid : "Not linked"}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Role Privilege
                  </p>
                  <p className="text-xs font-semibold capitalize text-slate-800 dark:text-slate-200">
                    {data.role}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    System Active
                  </p>
                  <div className="mt-0.5 flex items-center gap-1.5 text-xs font-medium text-slate-800 dark:text-slate-200">
                    {data.isActive ? (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                        Yes
                      </>
                    ) : (
                      <>
                        <XCircle className="h-3.5 w-3.5 text-rose-500" />
                        No
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Email Verification Status
                  </p>
                  <div className="mt-0.5 flex items-center gap-1.5 text-xs font-medium text-slate-800 dark:text-slate-200">
                    {data.emailVerified ? (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                        Verified
                      </>
                    ) : (
                      <>
                        <XCircle className="h-3.5 w-3.5 text-amber-500" />
                        Unverified
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Account Activity & Timestamp Section */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-6 flex items-center gap-2 border-b border-slate-100 pb-4 dark:border-slate-800">
          <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Account Timeline & Activity
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Created Date */}
          <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-800/30">
            <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" />
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Account Created
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
                {formatDate(data.createdAt)}
              </p>
            </div>
          </div>

          {/* Updated Date */}
          <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-800/30">
            <Clock className="mt-0.5 h-5 w-5 shrink-0 text-indigo-500" />
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Last Updated
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
                {formatDate(data.updatedAt)}
              </p>
            </div>
          </div>

          {/* Deleted Date (Conditional Display) */}
          {data.deletedAt && (
            <div className="flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50/50 p-4 dark:border-rose-900/50 dark:bg-rose-950/20">
              <Trash2 className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" />
              <div>
                <p className="text-xs font-medium text-rose-600 dark:text-rose-400">
                  Account Deleted On
                </p>
                <p className="mt-1 text-sm font-semibold text-rose-900 dark:text-rose-200">
                  {formatDate(data.deletedAt)}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}