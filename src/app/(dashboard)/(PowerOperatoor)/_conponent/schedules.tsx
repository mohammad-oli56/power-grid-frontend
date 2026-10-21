"use client";

import { useScheduleGetPowerOperator } from "@/hooks/poweroperator.hooks";
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  Clock3,
  MapPin,
  AlertCircle,
  Wrench,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";

const Schedules = () => {
  const { data, isPending, isError, error } =
    useScheduleGetPowerOperator();

  const router = useRouter();

  const response = data?.data?.data;

  const outages: any[] = Array.isArray(response)
    ? response
    : response
      ? [response]
      : [];

  const formatDate = (date?: string) => {
    if (!date) return "Not specified";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Not specified";
    }

    return parsedDate.toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusStyle = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-emerald-50 text-emerald-700 ring-emerald-600/20";

      case "completed":
        return "bg-slate-100 text-slate-600 ring-slate-500/20";

      case "scheduled":
        return "bg-amber-50 text-amber-700 ring-amber-600/20";

      default:
        return "bg-gray-100 text-gray-600 ring-gray-500/20";
    }
  };

  const handleSeeDetails = (id: string) => {
    router.push(`/power-operator-dashboard/schedules/${id}`);
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-slate-50 p-6 md:p-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 h-8 w-64 animate-pulse rounded-lg bg-slate-200" />
          <div className="grid gap-5 md:grid-cols-2">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="h-64 animate-pulse rounded-2xl border border-slate-200 bg-white"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    console.error("Schedules error:", error);

    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-slate-50 p-6">
        <div className="max-w-md rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
            <AlertCircle className="h-7 w-7 text-red-500" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            Unable to load schedules
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Something went wrong while fetching your schedules.
            Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50/80 px-4 py-8 md:px-8 md:py-10">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-blue-600">
              <Zap className="h-4 w-4" />
              Power Management
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              Power Operator Schedules
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Monitor outage schedules, maintenance activities, and zone details.
            </p>
          </div>

          <div className="flex w-fit items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
              <CalendarClock className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">
                Total schedules
              </p>
              <p className="text-2xl font-bold text-slate-900">
                {outages.length}
              </p>
            </div>
          </div>
        </div>

        {/* Schedule List */}
        {outages.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
              <CalendarClock className="h-7 w-7 text-slate-400" />
            </div>
            <h2 className="text-lg font-semibold text-slate-800">
              No schedules yet
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              There are currently no power outage or maintenance schedules to display.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            {outages.map((outage) => (
              <article
                key={outage.id}
                className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-200/50"
              >
                {/* Card Header */}
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 p-5 md:p-6">
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                      <MapPin className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <h2 className="truncate text-lg font-bold text-slate-900">
                        {outage.zone?.area ?? "Unknown Area"}
                      </h2>
                      <p className="mt-1 text-sm text-slate-500">
                        Zone ID: {outage.zoneId ?? "N/A"}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold capitalize ring-1 ring-inset ${getStatusStyle(outage.status)}`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    {outage.status ?? "Unknown"}
                  </span>
                </div>

                {/* Card Details */}
                <div className="grid gap-4 p-5 sm:grid-cols-2 md:p-6">
                  <div className="rounded-xl bg-slate-50 p-4">
                    <div className="mb-3 flex items-center gap-2 text-slate-500">
                      <Clock3 className="h-4 w-4 text-blue-500" />
                      <span className="text-xs font-medium">
                        Start time
                      </span>
                    </div>
                    <p className="text-sm font-semibold leading-6 text-slate-800">
                      {formatDate(outage.startTime)}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <div className="mb-3 flex items-center gap-2 text-slate-500">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      <span className="text-xs font-medium">
                        End time
                      </span>
                    </div>
                    <p className="text-sm font-semibold leading-6 text-slate-800">
                      {formatDate(outage.endTime)}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4 sm:col-span-2">
                    <div className="mb-3 flex items-center gap-2 text-slate-500">
                      <Wrench className="h-4 w-4 text-amber-500" />
                      <span className="text-xs font-medium">
                        Reason for outage
                      </span>
                    </div>
                    <p className="break-words text-sm font-medium leading-6 text-slate-700">
                      {outage.reason ?? "No reason provided"}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="flex items-center justify-between border-t border-slate-100 px-5 py-4 md:px-6">
                  <span className="text-xs text-slate-400">
                    Schedule #{outage.id ?? "N/A"}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleSeeDetails(outage.id)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    See Details
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Footer */}
        {outages.length > 0 && (
          <p className="mt-6 text-center text-xs text-slate-400">
            Showing {outages.length} schedule{outages.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>
    </main>
  );
};

export default Schedules;