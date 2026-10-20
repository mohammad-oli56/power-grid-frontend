
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useTechnicianOutage } from "@/hooks/technician.hooks";
import {
  AlertCircle,
  ArrowRight,
  Loader2,
  Zap,
} from "lucide-react";

type Outage = {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
};

const priorityStyles: Record<string, string> = {
  LOW: "bg-green-100 text-green-700 ring-green-600/20",
  MEDIUM: "bg-yellow-100 text-yellow-700 ring-yellow-600/20",
  HIGH: "bg-orange-100 text-orange-700 ring-orange-600/20",
  CRITICAL: "bg-red-100 text-red-700 ring-red-600/20",
};

const statusStyles: Record<string, string> = {
  ASSIGNED: "bg-blue-100 text-blue-700 ring-blue-600/20",
  PENDING: "bg-yellow-100 text-yellow-700 ring-yellow-600/20",
  IN_PROGRESS: "bg-purple-100 text-purple-700 ring-purple-600/20",
  RESTORED: "bg-green-100 text-green-700 ring-green-600/20",
  COMPLETED: "bg-green-100 text-green-700 ring-green-600/20",
  CANCELLED: "bg-gray-100 text-gray-700 ring-gray-600/20",
};

const TechnicianOutage = () => {
  const router = useRouter();

  const { data, isPending, isError } = useTechnicianOutage();

  // Handle the provided response structure: data.data.data
  const response = data?.data?.data;

  const outages: Outage[] = Array.isArray(response)
    ? response
    : response
      ? [response]
      : [];

  const handleSeeDetails = (id: string) => {
    // Update this URL to match your actual details page route.
    router.push(`/technician-dashboard/assigne-outage/${id}`);
  };

  if (isPending) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="flex items-center gap-3 text-blue-600">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="font-medium">Loading outages...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto mt-8 flex max-w-lg items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-5 text-red-700">
        <AlertCircle className="h-6 w-6 shrink-0" />
        <div>
          <h2 className="font-semibold">Failed to load outages</h2>
          <p className="mt-1 text-sm">
            Something went wrong while fetching outage information.
            Please try again later.
          </p>
        </div>
      </div>
    );
  }

  if (outages.length === 0) {
    return (
      <div className="mx-auto mt-8 max-w-lg rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
        <Zap className="mx-auto h-10 w-10 text-gray-400" />
        <h2 className="mt-4 text-lg font-semibold text-gray-800">
          No outages found
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          There are currently no outage records assigned to you.
        </p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-100 p-3">
              <Zap className="h-6 w-6 text-blue-600" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Technician Outages
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                View your assigned outage reports and their current status.
              </p>
            </div>
          </div>

          <div className="mt-5 inline-flex items-center rounded-lg border bg-white px-4 py-2 text-sm text-gray-600 shadow-sm">
            Total outages:
            <span className="ml-2 font-bold text-blue-600">
              {outages.length}
            </span>
          </div>
        </div>

        {/* Outage Cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {outages.map((outage) => {
            const priority = outage.priority?.toUpperCase() || "LOW";
            const status = outage.status?.toUpperCase() || "PENDING";

            return (
              <article
                key={outage.id}
                className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
              >
                {/* Title and icon */}
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-blue-50 p-2.5">
                    <Zap className="h-5 w-5 text-blue-600" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h2 className="break-words text-lg font-bold text-gray-900">
                      {outage.title}
                    </h2>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-4 flex-1">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Description
                  </p>

                  <p className="line-clamp-3 text-sm leading-6 text-gray-600">
                    {outage.description || "No description available."}
                  </p>
                </div>

                {/* Priority and Status */}
                <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-gray-100 pt-4">
                  <div>
                    <p className="mb-2 text-xs font-medium text-gray-500">
                      Priority
                    </p>

                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ring-1 ring-inset ${
                        priorityStyles[priority] ||
                        "bg-gray-100 text-gray-700 ring-gray-500/20"
                      }`}
                    >
                      {priority}
                    </span>
                  </div>

                  <div className="ml-auto text-right">
                    <p className="mb-2 text-xs font-medium text-gray-500">
                      Status
                    </p>

                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ring-1 ring-inset ${
                        statusStyles[status] ||
                        "bg-gray-100 text-gray-700 ring-gray-500/20"
                      }`}
                    >
                      {status.replace(/_/g, " ")}
                    </span>
                  </div>
                </div>

                {/* Details Button */}
                <button
                  type="button"
                  onClick={() => handleSeeDetails(outage.id)}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  See Details
                  <ArrowRight className="h-4 w-4" />
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechnicianOutage;
