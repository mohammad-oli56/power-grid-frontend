"use client";

import {
  useDeleteSchedule,
  useScheduleSingleGetPowerOperator,
} from "@/hooks/poweroperator.hooks";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Zap,
  MapPin,
  CalendarDays,
  Clock3,
  CheckCircle2,
  CircleDot,
  AlertCircle,
  Wrench,
  Hash,
  Activity,
  UserRound,
  Mail,
  ShieldCheck,
  Info,
  CalendarClock,
  RefreshCw,
  Building2,
  Cable,
  Timer,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogDemo } from "./UpdateScheduleTime";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const SingleSchedule = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data, isPending, isError, error } =
    useScheduleSingleGetPowerOperator(id);

  const {
    mutate: deleteSchedule,
    isPending: isDeleting,
    isError: isDeleteError,
    error: deleteError,
  } = useDeleteSchedule(id);

  const schedule = data?.data;

  const formatDate = (value?: string | null) => {
    if (!value) return "Not available";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return "Not available";

    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
      timeZoneName: "short",
    });
  };

  const statusConfig: Record<
    string,
    { label: string; className: string; dot: string }
  > = {
    SCHEDULED: {
      label: "Scheduled",
      className: "bg-amber-50 text-amber-700 ring-amber-600/20",
      dot: "bg-amber-500",
    },
    ACTIVE: {
      label: "Active",
      className: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
      dot: "bg-emerald-500",
    },
    COMPLETED: {
      label: "Completed",
      className: "bg-blue-50 text-blue-700 ring-blue-600/20",
      dot: "bg-blue-500",
    },
  };

  const status = statusConfig[schedule?.status ?? ""] ?? {
    label: schedule?.status ?? "Unknown",
    className: "bg-slate-100 text-slate-600 ring-slate-500/20",
    dot: "bg-slate-400",
  };

  const Detail = ({
    label,
    value,
    icon: Icon,
    fullWidth = false,
  }: {
    label: string;
    value: unknown;
    icon?: React.ElementType;
    fullWidth?: boolean;
  }) => (
    <div
      className={`group rounded-xl border border-slate-100 bg-slate-50/70 p-4 transition-colors hover:border-blue-100 hover:bg-blue-50/40 ${
        fullWidth ? "sm:col-span-2 lg:col-span-3" : ""
      }`}
    >
      <div className="mb-2 flex items-center gap-2">
        {Icon && (
          <Icon className="h-4 w-4 shrink-0 text-slate-400 transition-colors group-hover:text-blue-500" />
        )}
        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
          {label}
        </p>
      </div>
      <p className="break-words text-sm font-semibold leading-6 text-slate-800">
        {value == null || value === "" ? "Not available" : String(value)}
      </p>
    </div>
  );

  const Section = ({
    title,
    subtitle,
    icon: Icon,
    children,
  }: {
    title: string;
    subtitle: string;
    icon: React.ElementType;
    children: React.ReactNode;
  }) => (
    <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-5 md:px-6">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-bold text-slate-900">{title}</h2>
          <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3 p-5 sm:grid-cols-2 md:p-6 lg:grid-cols-3">
        {children}
      </div>
    </section>
  );

  if (isPending) {
    return (
      <main className="min-h-screen bg-slate-50 p-5 md:p-8">
        <div className="mx-auto max-w-7xl animate-pulse space-y-6">
          <div className="h-8 w-52 rounded-lg bg-slate-200" />
          <div className="h-56 rounded-2xl bg-slate-200" />
          <div className="h-64 rounded-2xl bg-white" />
          <div className="h-64 rounded-2xl bg-white" />
        </div>
      </main>
    );
  }

  if (isError) {
    console.error("Schedule error:", error);

    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 p-5">
        <div className="w-full max-w-md rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50">
            <AlertCircle className="h-7 w-7 text-red-500" />
          </div>
          <h2 className="mt-5 text-xl font-bold text-slate-900">
            Unable to load schedule
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            We couldn't retrieve the schedule information. Please try again.
          </p>
          <Button
            onClick={() => window.location.reload()}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <RefreshCw className="h-4 w-4" />
            Try again
          </Button>
        </div>
      </main>
    );
  }

  if (!schedule) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 p-5">
        <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <CalendarClock className="mx-auto h-12 w-12 text-slate-300" />
          <h2 className="mt-4 text-xl font-bold text-slate-900">
            Schedule not found
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            This schedule may have been removed or is no longer available.
          </p>
          <Button
            onClick={() => router.back()}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Go back
          </Button>
        </div>
      </main>
    );
  }

  const handleDelete = () => {
    deleteSchedule(undefined, {
      onSuccess: () => {
        router.push("/power-operator-dashboard/schedules");
      },
    });
  };

  return (
    <main className="min-h-screen bg-[#f6f8fc] px-4 py-6 md:px-8 md:py-9">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Breadcrumb and Back */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Zap className="h-4 w-4 text-blue-600" />
            <span>Power Management</span>
            <span className="text-slate-300">/</span>
            <span className="font-medium text-slate-800">Schedule Details</span>
          </div>

          <Button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-blue-200 hover:text-blue-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>

        {/* Hero */}
        <section className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-blue-950 to-blue-800 p-6 text-white shadow-xl shadow-blue-950/10 md:p-9">
          <div className="pointer-events-none absolute -right-12 -top-24 -z-10 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 right-1/3 -z-10 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-7 lg:flex-row lg:items-center">
            <div className="min-w-0">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-blue-100 backdrop-blur-sm">
                <Activity className="h-3.5 w-3.5" />
                Power outage management
              </div>

              <h1 className="text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
                Schedule Details
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-blue-100/80 md:text-base">
                View outage timing, zone information, maintenance reasons, and
                schedule ownership in one place.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-xs font-medium text-white">
                  <Hash className="h-3.5 w-3.5 text-blue-200" />
                  ID: {schedule.id ?? "N/A"}
                </span>

                <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-xs font-medium text-white">
                  <MapPin className="h-3.5 w-3.5 text-blue-200" />
                  {schedule.zone?.area ?? "Unknown area"}
                </span>
              </div>
            </div>

            <div className="flex shrink-0 flex-col items-start gap-3 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md sm:min-w-52">
              <span className="text-xs font-medium uppercase tracking-widest text-blue-100/80">
                Current status
              </span>

              <span
                className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-bold ring-1 ring-inset ${status.className}`}
              >
                <span className={`h-2 w-2 rounded-full ${status.dot}`} />
                {status.label}
              </span>

              <p className="text-xs leading-5 text-blue-100/70">
                Schedule tracking information
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative mt-8 grid gap-4 border-t border-white/15 pt-6 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-300">
                <CircleDot className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-blue-100/70">
                  Scheduled start
                </p>
                <p className="mt-1 text-sm font-semibold text-white">
                  {formatDate(schedule.startTime)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-400/15 text-sky-300">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-blue-100/70">
                  Scheduled end
                </p>
                <p className="mt-1 text-sm font-semibold text-white">
                  {formatDate(schedule.endTime)}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Overview */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              label: "Schedule status",
              value: status.label,
              icon: Activity,
              color: "bg-blue-50 text-blue-600",
            },
            {
              label: "Zone",
              value: schedule.zone?.name ?? schedule.zone?.area ?? "N/A",
              icon: MapPin,
              color: "bg-violet-50 text-violet-600",
            },
            {
              label: "Start date",
              value: schedule.startTime
                ? new Date(schedule.startTime).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    timeZone: "UTC",
                  })
                : "N/A",
              icon: CalendarDays,
              color: "bg-emerald-50 text-emerald-600",
            },
            {
              label: "Schedule reason",
              value: schedule.reason ?? "Not specified",
              icon: Wrench,
              color: "bg-amber-50 text-amber-600",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="flex min-w-0 items-start gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${item.color}`}
              >
                <item.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-slate-500">
                  {item.label}
                </p>
                <p className="mt-2 break-words text-sm font-bold text-slate-800">
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* Schedule Information */}
        <Section
          title="Schedule Information"
          subtitle="Core outage and maintenance details"
          icon={CalendarClock}
        >
          <Detail label="Schedule ID" value={schedule.id} icon={Hash} />
          <Detail label="Zone ID" value={schedule.zoneId} icon={MapPin} />
          <Detail label="Status" value={status.label} icon={Activity} />
          <Detail
            label="Start Time"
            value={formatDate(schedule.startTime)}
            icon={Clock3}
          />
          <Detail
            label="End Time"
            value={formatDate(schedule.endTime)}
            icon={Timer}
          />
          <Detail
            label="Reason"
            value={schedule.reason}
            icon={Wrench}
            fullWidth
          />
          <Detail
            label="Created At"
            value={formatDate(schedule.createdAt)}
            icon={CalendarDays}
          />
          <Detail
            label="Updated At"
            value={formatDate(schedule.updatedAt)}
            icon={RefreshCw}
          />
          <Detail
            label="Deleted At"
            value={formatDate(schedule.deletedAt)}
            icon={Info}
          />
        </Section>

        {/* Zone Information */}
        <Section
          title="Zone Information"
          subtitle="Location and electrical distribution details"
          icon={Building2}
        >
          <Detail label="Zone Name" value={schedule.zone?.name} icon={MapPin} />
          <Detail label="Area" value={schedule.zone?.area} icon={MapPin} />
          <Detail label="Zone Code" value={schedule.zone?.code} icon={Hash} />
          <Detail
            label="Location"
            value={schedule.zone?.location}
            icon={MapPin}
          />
          <Detail label="Feeder" value={schedule.zone?.feeder} icon={Cable} />
          <Detail
            label="Substation"
            value={schedule.zone?.substation}
            icon={Zap}
          />
          <Detail
            label="Zone Created At"
            value={formatDate(schedule.zone?.createdAt)}
            icon={CalendarDays}
          />
          <Detail
            label="Zone Updated At"
            value={formatDate(schedule.zone?.updatedAt)}
            icon={RefreshCw}
          />
          <Detail
            label="Zone Deleted At"
            value={formatDate(schedule.zone?.deletedAt)}
            icon={Info}
          />
        </Section>

        {/* Creator Information */}
        <Section
          title="Creator Information"
          subtitle="Details about the person who created the schedule"
          icon={ShieldCheck}
        >
          <Detail label="Creator ID" value={schedule.creator?.id} icon={Hash} />
          <Detail
            label="Creator Name"
            value={schedule.creator?.name}
            icon={UserRound}
          />
          <Detail
            label="Creator Email"
            value={schedule.creator?.email}
            icon={Mail}
          />
          <Detail
            label="Created By"
            value={schedule.createdBy}
            icon={UserRound}
          />
        </Section>

        {/* Footer */}
        <div className="flex flex-col items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white px-5 py-4 shadow-sm sm:flex-row">
          <DialogDemo
            data={{
              id: schedule.id,
              startTime: schedule.startTime,
              endTime: schedule.endTime,
            }}
          />

          <AlertDialog>
            <AlertDialogTrigger
              render={
                <Button variant="destructive" disabled={isDeleting}>
                  {isDeleting ? "Deleting..." : "Delete Schedule"}
                </Button>
              }
            />
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this schedule?</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this schedule? This action
                  cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
                  {isDeleting ? "Deleting..." : "Yes, Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {isDeleteError && (
            <p className="text-sm text-red-500">
              {deleteError?.message || "Failed to delete schedule"}
            </p>
          )}
          <Button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-sm font-semibold text-black transition hover:text-blue-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to schedules
          </Button>
        </div>
      </div>
    </main>
  );
};

export default SingleSchedule;
