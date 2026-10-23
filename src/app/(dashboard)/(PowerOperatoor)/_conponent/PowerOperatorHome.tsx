"use client";

import {
  useOutageComplain,
  useScheduleGetPowerOperator,
  useServiceRequest,
  useTechnicianGet,
  useZone,
} from "@/hooks/poweroperator.hooks";

import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  ClipboardList,
  MapPin,
  Users,
  Zap,
  RefreshCw,
} from "lucide-react";

const PowerOperatorHome = () => {
  const {
    data: zoneData,
    isPending: zonePending,
    isError: zoneError,
    refetch: refetchZones,
  } = useZone();

  const {
    data: technicianData,
    isPending: technicianPending,
    isError: technicianError,
    refetch: refetchTechnicians,
  } = useTechnicianGet();

  const {
    data: powerOperatorData,
    isPending: powerOperatorPending,
    isError: powerOperatorError,
    refetch: refetchPowerOperators,
  } = useScheduleGetPowerOperator();

  const {
    data: outageComplainData,
    isPending: outageComplainPending,
    isError: outageComplainError,
    refetch: refetchOutages,
  } = useOutageComplain();

  const {
    data: serviceRequestData,
    isPending: serviceRequestPending,
    isError: serviceRequestError,
    refetch: refetchServices,
  } = useServiceRequest();

  const stats = [
    {
      title: "Total Zones",
      value: zoneData?.data?.length ?? 0,
      pending: zonePending,
      error: zoneError,
      icon: MapPin,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      accent: "bg-blue-600",
      description: "Managed service areas",
      refetch: refetchZones,
    },
    {
      title: "Technicians",
      value: technicianData?.data?.length ?? 0,
      pending: technicianPending,
      error: technicianError,
      icon: Users,
      iconBg: "bg-violet-100",
      iconColor: "text-violet-600",
      accent: "bg-violet-600",
      description: "Technical workforce",
      refetch: refetchTechnicians,
    },
    {
      title: "Operator Schedules",
      value: powerOperatorData?.data?.data?.length ?? 0,
      pending: powerOperatorPending,
      error: powerOperatorError,
      icon: Zap,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      accent: "bg-amber-500",
      description: "Power operator assignments",
      refetch: refetchPowerOperators,
    },
    {
      title: "Outage Complaints",
      value: outageComplainData?.data?.data?.length ?? 0,
      pending: outageComplainPending,
      error: outageComplainError,
      icon: AlertTriangle,
      iconBg: "bg-rose-100",
      iconColor: "text-rose-600",
      accent: "bg-rose-500",
      description: "Reported power interruptions",
      refetch: refetchOutages,
    },
    {
      title: "Service Requests",
      value: serviceRequestData?.data?.data?.length ?? 0,
      pending: serviceRequestPending,
      error: serviceRequestError,
      icon: ClipboardList,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      accent: "bg-emerald-500",
      description: "Customer service records",
      refetch: refetchServices,
    },
  ];

  const totalRecords = stats.reduce(
    (total, stat) => total + (stat.error ? 0 : stat.value),
    0,
  );

  const isLoading = stats.some((stat) => stat.pending);
  const hasError = stats.some((stat) => stat.error);

  return (
    <main className="min-h-screen bg-slate-50/80 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Page heading */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-blue-600">
              <Activity size={16} />
              Power Management
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Dashboard Overview
            </h1>

            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Monitor your power operations, workforce, and service activity.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm sm:self-auto">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
              <Zap className="text-emerald-600" size={21} />
            </div>

            <div>
              <p className="text-xs font-medium text-slate-500">
                Total Records
              </p>
              <p className="text-xl font-bold text-slate-900">
                {isLoading
                  ? "..."
                  : hasError
                    ? "Partial"
                    : totalRecords.toLocaleString()}
              </p>
            </div>
          </div>
        </header>

        {/* Welcome banner */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-950 via-blue-950 to-blue-800 p-6 text-white shadow-lg sm:p-8">
          <div className="pointer-events-none absolute -right-12 -top-24 h-64 w-64 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -right-2 -top-12 h-48 w-48 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -bottom-20 right-1/4 h-48 w-48 rounded-full bg-blue-400/10 blur-2xl" />

          <div className="relative z-10 max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-medium text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Operations Dashboard
            </div>

            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Your operations, at a glance.
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-blue-100/80 sm:text-base">
              Keep track of service zones, technician resources, operator
              schedules, outages, and customer requests in one place.
            </p>
          </div>

          <Zap
            className="absolute bottom-4 right-8 hidden text-white/10 sm:block"
            size={150}
            strokeWidth={1}
          />
        </section>

        {/* Section heading */}
        <section>
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Operational Statistics
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                An overview of your current records
              </p>
            </div>

           {hasError && (
  <output className="flex items-center gap-2 text-sm text-rose-600">
    <AlertTriangle size={16} aria-hidden="true" />
    <span>Some data could not be loaded</span>
  </output>
)}
          </div>

          {/* Statistics cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <article
                  key={stat.title}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50 sm:p-6"
                >
                  <div
                    className={`absolute left-0 top-0 h-1 w-full ${stat.accent} opacity-80`}
                  />

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-slate-500">
                        {stat.title}
                      </p>

                      {stat.pending ? (
                        <output
  className="mt-3 block h-10 w-24 animate-pulse rounded-lg bg-slate-100"
  aria-label={`Loading ${stat.title}`}
/>
                      ) : stat.error ? (
                        <div className="mt-3 flex items-center gap-2">
                          <span className="text-2xl font-bold text-rose-600">
                            —
                          </span>
                          <button
                            type="button"
                            onClick={() => stat.refetch()}
                            className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-800"
                          >
                            <RefreshCw size={12} />
                            Retry
                          </button>
                        </div>
                      ) : (
                        <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                          {stat.value.toLocaleString()}
                        </p>
                      )}
                    </div>

                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${stat.iconBg} ${stat.iconColor} transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon size={23} strokeWidth={2} />
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                    <p className="text-xs leading-5 text-slate-500">
                      {stat.description}
                    </p>

                    <ArrowUpRight
                      size={17}
                      className="shrink-0 text-slate-300 transition-colors group-hover:text-slate-600"
                    />
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Footer note */}
        <footer className="flex flex-col gap-2 border-t border-slate-200 pt-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>Power Management System</p>
          <p>Operational overview and record summary</p>
        </footer>
      </div>
    </main>
  );
};

export default PowerOperatorHome;
