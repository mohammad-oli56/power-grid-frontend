"use client";

import {
    useCancelOutageComplain,
  useOutageStatusChange,
  useSingleOutageComplain,
  useTechnicianGet,
} from "@/hooks/poweroperator.hooks";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Phone,
  RefreshCw,
  ShieldAlert,
  UserRound,
  Zap,
  Activity,
  Building2,
  Cable,
} from "lucide-react";
import { AssignTechnicianModal } from "./AssignTechnicianModal";

const formatDate = (date?: string | null) => {
  if (!date) return "Not available";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "Not available";

  return new Intl.DateTimeFormat("en-BD", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(parsed);
};

const SingleOutageComplain = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data, isPending, isError, refetch } = useSingleOutageComplain(id);

  const {
  mutate: cancelOutage,
  isPending: cancelPending,
} = useCancelOutageComplain(id);

  const {
    mutate,
    isPending: statusPending,
    isError: statusError,
    error,
  } = useOutageStatusChange(id);
  //   console.log(data);
  // Supports either the API response or an Axios response.
  const outage = data?.data?.data ?? data?.data;

  const priority = String(outage?.priority ?? "UNKNOWN").toUpperCase();
  const status = String(outage?.status ?? "UNKNOWN").toUpperCase();

  const priorityStyles: Record<string, string> = {
    HIGH: "bg-red-50 text-red-700 ring-red-200",
    MEDIUM: "bg-amber-50 text-amber-700 ring-amber-200",
    LOW: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  };

  const statusStyles: Record<string, string> = {
    REPORTED: "bg-blue-50 text-blue-700 ring-blue-200",
    IN_PROGRESS: "bg-amber-50 text-amber-700 ring-amber-200",
    RESOLVED: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    CANCELLED: "bg-slate-100 text-slate-600 ring-slate-200",
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-6xl animate-pulse space-y-6">
          <div className="h-8 w-56 rounded bg-slate-200" />
          <div className="h-44 rounded-2xl bg-white shadow-sm" />
          <div className="grid gap-6 md:grid-cols-2">
            <div className="h-64 rounded-2xl bg-white" />
            <div className="h-64 rounded-2xl bg-white" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !outage) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center p-6 text-center">
        <div className="mb-4 rounded-full bg-red-50 p-4 text-red-600">
          <AlertCircle className="h-8 w-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">
          Unable to load outage details
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          The complaint could not be found or something went wrong.
        </p>
        <div className="mt-5 flex gap-3">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go back
          </Button>
          <Button onClick={() => refetch()}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Try again
          </Button>
        </div>
      </div>
    );
  }

  const handleStatus = () => {
    mutate();
  };

  const handleCancel = () => {
  cancelOutage();
};

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Navigation */}

        {/* Header */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-blue-600">
              <Zap className="h-4 w-4" />
              Power Operator Dashboard
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Outage Details
            </h1>

            <p className="mt-2 break-all text-sm text-slate-500">
              Complaint ID: {outage.id}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span
              className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold ring-1 ring-inset ${
                priorityStyles[priority] ??
                "bg-slate-100 text-slate-600 ring-slate-200"
              }`}
            >
              <ShieldAlert className="h-4 w-4" />
              {priority} PRIORITY
            </span>

            <span
              className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold ring-1 ring-inset ${
                statusStyles[status] ??
                "bg-slate-100 text-slate-600 ring-slate-200"
              }`}
            >
              <Activity className="h-4 w-4" />
              {status.replaceAll("_", " ")}
            </span>
          </div>
        </div>

        {/* Main Complaint Card */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="bg-gradient-to-r from-blue-700 to-indigo-700 p-6 text-white sm:p-8">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-white/15 p-3">
                <Zap className="h-7 w-7" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-blue-100">
                  Reported Power Outage
                </p>

                <h2 className="mt-2 break-words text-xl font-bold sm:text-2xl">
                  {outage.title ?? "Untitled complaint"}
                </h2>

                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-blue-100">
                  <span className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />
                    Reported {formatDate(outage.createdAt)}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {outage.zone?.area ?? "Unknown area"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <h3 className="flex items-center gap-2 font-semibold text-slate-900">
              <AlertCircle className="h-5 w-5 text-blue-600" />
              Complaint Description
            </h3>

            <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-600">
              {outage.description || "No description provided."}
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <InfoItem
                label="Outage Started"
                value={formatDate(outage.startedAt)}
                icon={<Clock className="h-4 w-4" />}
              />
              <InfoItem
                label="Restored At"
                value={formatDate(outage.restoredAt)}
                icon={<CheckCircle2 className="h-4 w-4" />}
              />
              <InfoItem
                label="Last Updated"
                value={formatDate(outage.updatedAt)}
                icon={<RefreshCw className="h-4 w-4" />}
              />
            </div>
          </div>
        </section>

        {/* Details Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Reporter Information */}
          <DetailCard
            title="Reporter Information"
            subtitle="Contact details of the person who reported the outage"
            icon={<UserRound className="h-5 w-5" />}
          >
            <InfoItem
              label="Full Name"
              value={outage.reporter?.name}
              icon={<UserRound className="h-4 w-4" />}
            />
            <InfoItem
              label="Email Address"
              value={outage.reporter?.email}
              icon={<Mail className="h-4 w-4" />}
            />
            <InfoItem
              label="Phone Number"
              value={outage.reporter?.phone}
              icon={<Phone className="h-4 w-4" />}
            />
            <InfoItem
              label="Reporter ID"
              value={outage.reportedBy}
              icon={<Activity className="h-4 w-4" />}
            />
          </DetailCard>

          {/* Zone Information */}
          <DetailCard
            title="Zone Information"
            subtitle="Electrical zone and distribution details"
            icon={<MapPin className="h-5 w-5" />}
          >
            <InfoItem
              label="Zone Name"
              value={outage.zone?.name}
              icon={<MapPin className="h-4 w-4" />}
            />
            <InfoItem
              label="Area"
              value={outage.zone?.area}
              icon={<Building2 className="h-4 w-4" />}
            />
            <InfoItem
              label="Zone Code"
              value={outage.zone?.code}
              icon={<Activity className="h-4 w-4" />}
            />
            <InfoItem
              label="Feeder"
              value={outage.zone?.feeder}
              icon={<Cable className="h-4 w-4" />}
            />
            <InfoItem
              label="Substation"
              value={outage.zone?.substation}
              icon={<Zap className="h-4 w-4" />}
            />
            <InfoItem
              label="Location"
              value={outage.zone?.location}
              icon={<MapPin className="h-4 w-4" />}
            />
          </DetailCard>

          {/* Technician Information */}
          <DetailCard
            title="Technician Information"
            subtitle="Assigned technician contact details"
            icon={<UserRound className="h-5 w-5" />}
          >
            {outage.technician ? (
              <>
                <InfoItem
                  label="Technician ID"
                  value={outage.technician.id}
                  icon={<Activity className="h-4 w-4" />}
                />

                <InfoItem
                  label="Employee ID"
                  value={outage.technician.employeeId}
                  icon={<UserRound className="h-4 w-4" />}
                />

                <InfoItem
                  label="Technician Name"
                  value={outage.technician.user?.name}
                  icon={<UserRound className="h-4 w-4" />}
                />

                <InfoItem
                  label="Email Address"
                  value={outage.technician.user?.email}
                  icon={<Mail className="h-4 w-4" />}
                />

                <InfoItem
                  label="Phone Number"
                  value={outage.technician.user?.phone}
                  icon={<Phone className="h-4 w-4" />}
                />

                <InfoItem
                  label="Specialization"
                  value={outage.technician.specialization}
                  icon={<Zap className="h-4 w-4" />}
                />

                <InfoItem
                  label="Availability"
                  value={outage.technician.status}
                  icon={<CheckCircle2 className="h-4 w-4" />}
                />
              </>
            ) : (
              <div className="rounded-xl border border-dashed border-amber-200 bg-amber-50 p-4">
                <p className="font-medium text-amber-800">
                  No technician assigned
                </p>
                <p className="mt-1 text-sm text-amber-700">
                  No technician information is available for this outage.
                </p>
              </div>
            )}
          </DetailCard>

          {/* Record Information */}
          <DetailCard
            title="Record Information"
            subtitle="System tracking and audit information"
            icon={<CalendarDays className="h-5 w-5" />}
          >
            <InfoItem
              label="Complaint ID"
              value={outage.id}
              icon={<Activity className="h-4 w-4" />}
            />
            <InfoItem
              label="Created At"
              value={formatDate(outage.createdAt)}
              icon={<CalendarDays className="h-4 w-4" />}
            />
            <InfoItem
              label="Updated At"
              value={formatDate(outage.updatedAt)}
              icon={<RefreshCw className="h-4 w-4" />}
            />
            <InfoItem
              label="Deleted At"
              value={formatDate(outage.deletedAt)}
              icon={<Clock className="h-4 w-4" />}
            />
          </DetailCard>
        </div>

        <div>
          {status === "REPORTED" ? (
            <div className="flex gap-3">
              <Button
                onClick={handleStatus}
                disabled={statusPending }
              >
                {statusPending ? "Acknowledging..." : "Acknowledge Report"}
              </Button>

              <Button
                variant="destructive"
                onClick={handleCancel}
                disabled={cancelPending || statusPending}
              >
                {cancelPending ? "Cancelling..." : "Cancel Outage"}
              </Button>
            </div>
          ) : status === "ACKNOWLEDGED" ? (
            <AssignTechnicianModal id={outage.id} />
          ) : status === "RESTORED" ? (
            <h1 className="text-green-600">Already Restored</h1>
          ) : status === "CANCELLED" ? (
            <h1 className="text-red-600">Schedule Cancelled</h1>
          ) : status === "ASSIGNED" || status === "IN_PROGRESS" ? null : (
            <p>Unknown status</p>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center">
          <div>
            <p className="font-semibold text-slate-900">
              Outage complaint overview
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Review the information above to determine the next action.
            </p>
          </div>

          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to complaints
          </Button>
        </div>
      </div>
    </div>
  );
};

function DetailCard({
  title,
  subtitle,
  icon,
  children,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex items-start gap-3 border-b border-slate-100 pb-5">
        <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600">{icon}</div>
        <div>
          <h3 className="font-semibold text-slate-900">{title}</h3>
          <p className="mt-1 text-xs leading-5 text-slate-500">{subtitle}</p>
        </div>
      </div>

      <div className="space-y-4">{children}</div>
    </section>
  );
}

function InfoItem({
  label,
  value,
  icon,
}: {
  label: string;
  value?: string | number | null;
  icon: React.ReactNode;
}) {
  const displayValue =
    value === null || value === undefined || value === ""
      ? "Not available"
      : String(value);

  return (
    <div className="flex min-w-0 items-start gap-3">
      <div className="mt-0.5 shrink-0 text-slate-400">{icon}</div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
          {label}
        </p>
        <p className="mt-1 break-words text-sm font-medium leading-6 text-slate-800">
          {displayValue}
        </p>
      </div>
    </div>
  );
}

export default SingleOutageComplain;
