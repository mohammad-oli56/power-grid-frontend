"use client";

import { Button } from "@/components/ui/button";
import { useOutageComplain } from "@/hooks/poweroperator.hooks";
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

const OutageComplain = () => {
  const { data, isPending, isError, refetch } = useOutageComplain();
  const router = useRouter();

  const complaints = data?.data?.data ?? [];

  const highPriority = complaints.filter(
    (item: any) => item.priority === "HIGH"
  ).length;

  const mediumPriority = complaints.filter(
    (item: any) => item.priority === "MEDIUM"
  ).length;

  const lowPriority = complaints.filter(
    (item: any) => item.priority === "LOW"
  ).length;

  const handleSeeDetails = (id: string) => {
    router.push(
      `/power-operator-dashboard/outage-complains/${id}`
    );
  };

  const priorityStyles: Record<string, string> = {
    HIGH: "bg-red-50 text-red-700 ring-red-600/20",
    MEDIUM: "bg-amber-50 text-amber-700 ring-amber-600/20",
    LOW: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  };

  const priorityDotStyles: Record<string, string> = {
    HIGH: "bg-red-500",
    MEDIUM: "bg-amber-500",
    LOW: "bg-emerald-500",
  };

  const formatDate = (date: string) => {
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Date unavailable";
    }

    return new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(parsedDate);
  };

  return (
    <div className="min-h-screen bg-slate-50/80 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-blue-600">
              <Zap className="h-4 w-4" />
              Power Operator Dashboard
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Outage Complaints
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Monitor reported power outages and review complaint details.
            </p>
          </div>

          <Button
            variant="outline"
            onClick={() => refetch()}
            disabled={isPending}
            className="h-10 gap-2 border-slate-200 bg-white shadow-sm hover:bg-slate-100"
          >
            <RefreshCw
              className={`h-4 w-4 ${isPending ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="Total Complaints"
            value={isPending ? "—" : complaints.length}
            description="All reported outages"
            icon={<FileWarning className="h-5 w-5" />}
            iconClass="bg-blue-50 text-blue-600"
          />

          <SummaryCard
            title="High Priority"
            value={isPending ? "—" : highPriority}
            description="Needs urgent attention"
            icon={<ShieldAlert className="h-5 w-5" />}
            iconClass="bg-red-50 text-red-600"
          />

          <SummaryCard
            title="Medium Priority"
            value={isPending ? "—" : mediumPriority}
            description="Requires review"
            icon={<AlertCircle className="h-5 w-5" />}
            iconClass="bg-amber-50 text-amber-600"
          />

          <SummaryCard
            title="Low Priority"
            value={isPending ? "—" : lowPriority}
            description="Lower urgency reports"
            icon={<CheckCircle2 className="h-5 w-5" />}
            iconClass="bg-emerald-50 text-emerald-600"
          />
        </div>

        {/* Complaint List */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-2 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Recent Reports
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Review and manage reported power outages.
              </p>
            </div>

            {!isPending && !isError && (
              <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                {complaints.length}{" "}
                {complaints.length === 1 ? "complaint" : "complaints"}
              </span>
            )}
          </div>

          <div className="p-4 sm:p-6">
            {/* Loading */}
            {isPending && (
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="animate-pulse rounded-xl border border-slate-100 p-5"
                  >
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-xl bg-slate-100" />
                      <div className="flex-1 space-y-3">
                        <div className="h-4 w-2/5 rounded bg-slate-100" />
                        <div className="h-3 w-3/5 rounded bg-slate-100" />
                        <div className="h-3 w-1/3 rounded bg-slate-100" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Error */}
            {isError && (
              <div className="flex flex-col items-center justify-center py-14 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
                  <AlertCircle className="h-7 w-7" />
                </div>

                <h3 className="font-semibold text-slate-900">
                  Unable to load complaints
                </h3>

                <p className="mt-2 max-w-sm text-sm text-slate-500">
                  Something went wrong while retrieving outage reports.
                  Please try again.
                </p>

                <Button
                  onClick={() => refetch()}
                  className="mt-5 gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Try again
                </Button>
              </div>
            )}

            {/* Empty State */}
            {!isPending && !isError && complaints.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <FileWarning className="h-8 w-8" />
                </div>

                <h3 className="text-lg font-semibold text-slate-900">
                  No outage complaints yet
                </h3>

                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                  When a power outage is reported, its details will appear
                  here.
                </p>
              </div>
            )}

            {/* Complaint Cards */}
            {!isPending && !isError && complaints.length > 0 && (
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {complaints.map((complaint: any) => {
                  const priority = String(
                    complaint.priority ?? "LOW"
                  ).toUpperCase();

                  return (
                    <article
                      key={complaint.id}
                      className="group rounded-xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:border-blue-200 hover:shadow-md"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-100">
                          <Zap className="h-6 w-6" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-medium text-slate-400">
                              Complaint #{String(complaint.id).slice(-8)}
                            </span>

                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
                                priorityStyles[priority] ??
                                priorityStyles.LOW
                              }`}
                            >
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${
                                  priorityDotStyles[priority] ??
                                  priorityDotStyles.LOW
                                }`}
                              />
                              {priority}
                            </span>
                          </div>

                          <h3 className="mt-3 break-words text-base font-semibold leading-6 text-slate-900">
                            {complaint.title || "Untitled complaint"}
                          </h3>

                          <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                            <CalendarDays className="h-4 w-4 shrink-0" />
                            <span>
                              {formatDate(complaint.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Clock className="h-3.5 w-3.5" />
                          Report submitted
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleSeeDetails(complaint.id)
                          }
                          className="gap-2 border-slate-200 text-slate-700 transition-colors hover:border-blue-600 hover:bg-blue-600 hover:text-white"
                        >
                          View details
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </Button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

function SummaryCard({
  title,
  value,
  description,
  icon,
  iconClass,
}: {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  iconClass: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-slate-500">{title}</p>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconClass}`}
        >
          {icon}
        </div>
      </div>

      <div className="mt-4">
        <p className="text-3xl font-bold tracking-tight text-slate-900">
          {value}
        </p>
        <p className="mt-1 text-xs text-slate-500">{description}</p>
      </div>
    </div>
  );
}

export default OutageComplain;