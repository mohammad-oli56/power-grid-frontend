"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock,
  FileWarning,
  RefreshCw,
  ShieldAlert,
  Zap,
} from "lucide-react";
import { useOutageComplain } from "@/hooks/poweroperator.hooks";
import { Button } from "@/components/ui/button";



type Priority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" | string;
type OutageStatus =
  | "REPORTED"
  | "IN_PROGRESS"
  | "RESTORED"
  | "CANCELLED"
  | string;

interface OutageComplaint {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: OutageStatus;
  createdAt: string;
  startedAt?: string | null;
  restoredAt?: string | null;
  zone?: {
    id?: string;
    name?: string;
    area?: string;
    location?: string;
    code?: string;
    feeder?: string;
  } | null;
  reporter?: {
    id?: string;
    name?: string;
    email?: string;
    phone?: string;
  } | null;
  technician?: {
    id?: string;
    employeeId?: string;
    specialization?: string;
    status?: string;
    user?: {
      id?: string;
      name?: string;
      email?: string;
      phone?: string;
    } | null;
  } | null;
}

function formatDate(date?: string | null) {
  if (!date) return "Not available";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Not available";
  }

  return new Intl.DateTimeFormat("en-BD", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(parsedDate);
}

function getPriorityStyles(priority?: string) {
  switch (priority?.toUpperCase()) {
    case "CRITICAL":
      return "bg-red-50 text-red-700 ring-red-200";

    case "HIGH":
      return "bg-orange-50 text-orange-700 ring-orange-200";

    case "MEDIUM":
      return "bg-amber-50 text-amber-700 ring-amber-200";

    case "LOW":
      return "bg-emerald-50 text-emerald-700 ring-emerald-200";

    default:
      return "bg-gray-50 text-gray-700 ring-gray-200";
  }
}

function getStatusStyles(status?: string) {
  switch (status?.toUpperCase()) {
    case "RESTORED":
      return "bg-emerald-50 text-emerald-700 ring-emerald-200";

    case "IN_PROGRESS":
      return "bg-amber-50 text-amber-700 ring-amber-200";

    case "REPORTED":
      return "bg-blue-50 text-blue-700 ring-blue-200";

    case "CANCELLED":
      return "bg-gray-100 text-gray-600 ring-gray-200";

    default:
      return "bg-gray-50 text-gray-700 ring-gray-200";
  }
}

function formatLabel(value?: string) {
  return value?.replaceAll("_", " ") ?? "Unknown";
}

function SummaryCard({
  title,
  value,
  icon: Icon,
  iconClassName,
}: {
  title: string;
  value: number;
  icon: React.ElementType;
  iconClassName: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
            {value}
          </p>
        </div>

        <div className={`rounded-xl p-3 ${iconClassName}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}

export default function OutageComplain() {
  const router = useRouter();

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useOutageComplain();

  // Supports either a directly unwrapped response or an Axios response.
  const complaints: OutageComplaint[] = useMemo(() => {
    const response = data?.data?.data ?? data?.data ?? data;

    return Array.isArray(response) ? response : [];
  }, [data]);

  const summary = useMemo(
    () => ({
      total: complaints.length,
      critical: complaints.filter(
        (item) => item.priority?.toUpperCase() === "CRITICAL",
      ).length,
      high: complaints.filter(
        (item) => item.priority?.toUpperCase() === "HIGH",
      ).length,
      restored: complaints.filter(
        (item) => item.status?.toUpperCase() === "RESTORED",
      ).length,
    }),
    [complaints],
  );

  const handleViewDetails = (id: string) => {
    router.push(`/power-operator-dashboard/outage-complains/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50/70 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-7">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <div className="rounded-xl bg-blue-600 p-2.5 text-white shadow-sm">
                <Zap className="h-6 w-6" />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  Outage Complaints
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  Monitor, manage, and track power outage reports.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
            />
            {isFetching ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="Total Complaints"
            value={summary.total}
            icon={FileWarning}
            iconClassName="bg-blue-50 text-blue-600"
          />

          <SummaryCard
            title="Critical Complaints"
            value={summary.critical}
            icon={ShieldAlert}
            iconClassName="bg-red-50 text-red-600"
          />

          <SummaryCard
            title="High Priority"
            value={summary.high}
            icon={AlertCircle}
            iconClassName="bg-orange-50 text-orange-600"
          />

          <SummaryCard
            title="Restored Outages"
            value={summary.restored}
            icon={CheckCircle2}
            iconClassName="bg-emerald-50 text-emerald-600"
          />
        </div>

        {/* Section heading */}
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-bold text-gray-900">
            All Outage Reports
          </h2>
          <p className="text-sm text-gray-500">
            Review complaint details, current status, and restoration updates.
          </p>
        </div>

       

        {/* Error state */}
        {!isLoading && isError && (
          <div className="rounded-2xl border border-red-200 bg-white px-6 py-12 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
              <AlertCircle className="h-7 w-7 text-red-600" />
            </div>

            <h3 className="mt-4 text-lg font-bold text-gray-900">
              Unable to load complaints
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
              {error instanceof Error
                ? error.message
                : "Something went wrong while fetching outage complaints. Please try again."}
            </p>

            <button
              type="button"
              onClick={() => refetch()}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </button>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !isError && complaints.length === 0 && (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <FileWarning className="h-8 w-8 text-gray-400" />
            </div>

            <h3 className="mt-4 text-lg font-bold text-gray-900">
              No outage complaints found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              There are currently no outage reports to display.
            </p>

            <button
              type="button"
              onClick={() => refetch()}
              className="mt-5 inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh List
            </button>
          </div>
        )}

        {/* Complaint cards */}
        {!isLoading && !isError && complaints.length > 0 && (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {complaints.map((complaint) => {
              const isRestored =
                complaint.status?.toUpperCase() === "RESTORED";

              return (
                <article
                  key={complaint.id}
                  className={`group overflow-hidden rounded-2xl border bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                    isRestored
                      ? "border-emerald-200"
                      : "border-gray-200"
                  }`}
                >
                  {/* Restored banner */}
                  {isRestored && (
                    <div className="flex items-center gap-2 border-b border-emerald-100 bg-emerald-50 px-5 py-2.5 text-sm font-semibold text-emerald-700">
                      <CheckCircle2 className="h-4 w-4 shrink-0" />
                      Power Restored
                      {complaint.restoredAt && (
                        <span className="ml-auto text-xs font-medium">
                          {formatDate(complaint.restoredAt)}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="p-5 sm:p-6">
                    {/* Title and badges */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-bold leading-6 text-gray-900 transition group-hover:text-blue-700">
                          {complaint.title || "Untitled outage"}
                        </h3>

                        <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                          <CalendarDays className="h-3.5 w-3.5 shrink-0" />
                          <span>
                            Reported {formatDate(complaint.createdAt)}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${getPriorityStyles(
                            complaint.priority,
                          )}`}
                        >
                          {formatLabel(complaint.priority)}
                        </span>

                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${getStatusStyles(
                            complaint.status,
                          )}`}
                        >
                          {isRestored && (
                            <CheckCircle2 className="h-3.5 w-3.5" />
                          )}
                          {formatLabel(complaint.status)}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                      {complaint.description || "No description provided."}
                    </p>

                    {/* Zone information */}
                    <div className="mt-5 rounded-xl border border-gray-100 bg-gray-50/80 p-4">
                      <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-500">
                        Zone Information
                      </p>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <p className="text-xs text-gray-500">Zone</p>
                          <p className="mt-1 text-sm font-semibold text-gray-800">
                            {complaint.zone?.name || "Not assigned"}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500">Area</p>
                          <p className="mt-1 text-sm font-semibold text-gray-800">
                            {complaint.zone?.area || "Not available"}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500">Location</p>
                          <p className="mt-1 text-sm font-semibold text-gray-800">
                            {complaint.zone?.location || "Not available"}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500">Feeder</p>
                          <p className="mt-1 text-sm font-semibold text-gray-800">
                            {complaint.zone?.feeder || "Not available"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Reporter and technician */}
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Reported By
                        </p>
                        <p className="mt-1 text-sm font-semibold text-gray-800">
                          {complaint.reporter?.name || "Unknown reporter"}
                        </p>
                        {complaint.reporter?.phone && (
                          <p className="mt-1 text-xs text-gray-500">
                            {complaint.reporter.phone}
                          </p>
                        )}
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Assigned Technician
                        </p>
                        <p className="mt-1 text-sm font-semibold text-gray-800">
                          {complaint.technician?.user?.name ||
                            "No technician assigned"}
                        </p>
                        {complaint.technician?.employeeId && (
                          <p className="mt-1 text-xs text-gray-500">
                            ID: {complaint.technician.employeeId}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Restoration details */}
                    {isRestored && (
                      <div className="mt-4 flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50/70 p-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

                        <div>
                          <p className="text-sm font-semibold text-emerald-800">
                            Outage resolved successfully
                          </p>

                          <p className="mt-1 text-xs leading-5 text-emerald-700">
                            {complaint.restoredAt
                              ? `Restored at ${formatDate(complaint.restoredAt)}`
                              : "The outage has been marked as restored."}
                          </p>
                        </div>
                      </div>
                    )}
                      
                    {/* Footer */}
                    <div className="mt-5 flex flex-col gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="h-4 w-4 shrink-0" />
                        <span>
                          Started: {formatDate(complaint.startedAt)}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleViewDetails(complaint.id)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        View Details
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}