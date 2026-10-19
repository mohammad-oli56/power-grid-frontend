
"use client";

import React, { useEffect, useState } from "react";
import { useScheduleGet } from "@/hooks/coustomer.hooks";
import {
  CalendarDays,
  Clock,
  MapPin,
  Loader2,
  Eye,
  X,
  Copy,
  Check,
  User,
} from "lucide-react";

type Schedule = {
  id?: string | null;
  zoneId?: string | null;
  createdBy?: string | null;
  startTime?: string | null;
  endTime?: string | null;
  [key: string]: unknown;
};

type ScheduleApiResponse = {
  data?: Schedule[] | null;
};

const formatDate = (value?: string | null): string => {
  if (!value) return "Not available";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Not available";
  }

  return date.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const getSchedules = (response: unknown): Schedule[] => {
  if (!response || typeof response !== "object") {
    return [];
  }

  const result = response as ScheduleApiResponse;

  return Array.isArray(result.data) ? result.data : [];
};

const AllSchedulePage = () => {
  const { data, isPending, isError } = useScheduleGet();

  const [selectedSchedule, setSelectedSchedule] =
    useState<Schedule | null>(null);

  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  const schedules = getSchedules(data);

  useEffect(() => {
    if (!selectedSchedule) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedSchedule(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedSchedule]);

  const handleCopy = async (id: string) => {
    try {
      await navigator.clipboard.writeText(id);
      setCopied(true);
      setCopyError(false);

      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
      setCopyError(true);

      window.setTimeout(() => setCopyError(false), 2000);
    }
  };

  const closeModal = () => {
    setSelectedSchedule(null);
    setCopied(false);
    setCopyError(false);
  };

  if (isPending) {
    return (
      <div className="flex min-h-60 items-center justify-center gap-3 text-slate-600">
        <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
        <p>Loading schedules...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-100 bg-white p-8 text-center">
        <CalendarDays className="mx-auto h-10 w-10 text-red-400" />

        <h2 className="mt-3 font-semibold text-slate-900">
          Failed to load schedules
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Please refresh the page and try again.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-3 py-6 sm:px-5 sm:py-10">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-7">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-100 p-3 text-blue-700">
              <CalendarDays className="h-6 w-6" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                All Schedules
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                View and manage your schedule information.
              </p>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Total Schedules</p>

          <p className="mt-1 text-3xl font-bold text-slate-900">
            {schedules.length}
          </p>
        </div>

        {/* Empty State */}
        {schedules.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center">
            <CalendarDays className="mx-auto h-12 w-12 text-slate-300" />

            <h2 className="mt-4 text-lg font-semibold text-slate-800">
              No schedules found
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              There are currently no schedules to display.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {schedules.map((schedule, index) => (
              <article
                key={schedule.id ?? `schedule-${index}`}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-5"
              >
                {/* Card Header */}
                <div className="mb-5 flex items-center justify-between gap-3">
                  <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                    Schedule #{index + 1}
                  </span>

                  <CalendarDays className="h-6 w-6 shrink-0 text-blue-600" />
                </div>

                {/* Schedule Information */}
                <div className="space-y-4">
                  <InfoRow
                    icon={<Clock className="h-5 w-5" />}
                    label="Start Time"
                    value={formatDate(schedule.startTime)}
                  />

                  <InfoRow
                    icon={<Clock className="h-5 w-5" />}
                    label="End Time"
                    value={formatDate(schedule.endTime)}
                  />

                  <InfoRow
                    icon={<MapPin className="h-5 w-5" />}
                    label="Zone ID"
                    value={schedule.zoneId}
                  />
                </div>

                {/* Card Footer */}
                <div className="mt-5 border-t border-slate-100 pt-4">
                  <p className="mb-1 text-xs text-slate-400">
                    Schedule ID
                  </p>

                  <p className="break-all font-mono text-xs text-slate-500">
                    {schedule.id || "Not available"}
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setCopied(false);
                      setCopyError(false);
                      setSelectedSchedule(schedule);
                    }}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <Eye className="h-4 w-4" />
                    View Details
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Schedule Details Modal */}
      {selectedSchedule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5">
          {/* Accessible backdrop button */}
          <button
            type="button"
            aria-label="Close schedule details"
            className="absolute inset-0 h-full w-full cursor-default bg-black/50"
            onClick={closeModal}
          />

          {/* Modal dialog */}
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="schedule-modal-title"
            className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl"
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600">
                  <CalendarDays className="h-5 w-5" />
                </div>

                <div>
                  <h2
                    id="schedule-modal-title"
                    className="text-lg font-bold text-slate-900"
                  >
                    Schedule Details
                  </h2>

                  <p className="text-xs text-slate-500">
                    Complete schedule information
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Close details"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-4 p-5">
              <div className="rounded-xl bg-blue-50 p-4">
                <p className="text-xs font-medium text-blue-600">
                  Schedule ID
                </p>

                <p className="mt-2 break-all font-mono text-sm text-slate-800">
                  {selectedSchedule.id || "Not available"}
                </p>

                {selectedSchedule.id && (
                  <button
                    type="button"
                    onClick={() => handleCopy(selectedSchedule.id!)}
                    className="mt-3 inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-white px-3 py-2 text-xs font-medium text-blue-700 transition hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {copied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}

                    {copied
                      ? "Copied"
                      : copyError
                        ? "Copy failed"
                        : "Copy ID"}
                  </button>
                )}
              </div>

              <DetailRow
                icon={<Clock className="h-5 w-5" />}
                label="Start Time"
                value={formatDate(selectedSchedule.startTime)}
              />

              <DetailRow
                icon={<Clock className="h-5 w-5" />}
                label="End Time"
                value={formatDate(selectedSchedule.endTime)}
              />

              <DetailRow
                icon={<MapPin className="h-5 w-5" />}
                label="Zone ID"
                value={selectedSchedule.zoneId}
              />

              <DetailRow
                icon={<User className="h-5 w-5" />}
                label="Created By"
                value={selectedSchedule.createdBy}
              />

             
            </div>

            {/* Modal Footer */}
            <div className="border-t border-slate-100 p-5">
              <button
                type="button"
                onClick={closeModal}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: unknown;
}) {
  const displayValue =
    value === null || value === undefined || value === ""
      ? "Not available"
      : String(value);

  return (
    <div className="flex items-start gap-3">
      <div className="mt-1 shrink-0 text-slate-400">{icon}</div>

      <div className="min-w-0 flex-1">
        <p className="text-xs text-slate-500">{label}</p>

        <p className="mt-1 break-words text-sm font-semibold text-slate-800">
          {displayValue}
        </p>
      </div>
    </div>
  );
}

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: unknown;
}) {
  const displayValue =
    value === null || value === undefined || value === ""
      ? "Not available"
      : String(value);

  return (
    <div className="flex items-start gap-3 rounded-xl border border-slate-100 p-3.5">
      <div className="mt-0.5 shrink-0 text-slate-400">{icon}</div>

      <div className="min-w-0 flex-1">
        <p className="text-xs text-slate-500">{label}</p>

        <p className="mt-1 break-all text-sm font-medium text-slate-800">
          {displayValue}
        </p>
      </div>
    </div>
  );
}

export default AllSchedulePage;
