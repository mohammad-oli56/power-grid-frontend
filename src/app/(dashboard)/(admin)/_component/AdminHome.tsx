
"use client";

import React from "react";
import {
  AlertTriangle,
  CreditCard,
  ClipboardList,
  Users,
  CheckCircle2,
  Clock,
  Activity,
  XCircle,
  UserCheck,
  UserX,
  Zap,
} from "lucide-react";

import { useGetAllReport } from "@/hooks/admin.hooks";

const AdminHome = () => {
  const { data, isPending, isError } = useGetAllReport();

  if (isPending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  if (isError || !data?.success || !data?.data) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-600">
        Failed to load dashboard statistics. Please try again.
      </div>
    );
  }

  const stats = data.data;

  const cards = [
    {
      title: "Outages",
      total: stats.outages.total,
      icon: AlertTriangle,
      color: "blue",
      items: [
        { label: "Reported", value: stats.outages.reported },
        { label: "Assigned", value: stats.outages.assigned },
        { label: "In Progress", value: stats.outages.inProgress },
        { label: "Restored", value: stats.outages.restored },
      ],
    },
    {
      title: "Payments",
      total: stats.payments.total,
      icon: CreditCard,
      color: "emerald",
      items: [
        { label: "Paid", value: stats.payments.paid },
        { label: "Pending", value: stats.payments.pending },
        { label: "Failed", value: stats.payments.failed },
      ],
    },
    {
      title: "Service Requests",
      total: stats.serviceRequests.total,
      icon: ClipboardList,
      color: "violet",
      items: [
        { label: "Completed", value: stats.serviceRequests.completed },
        { label: "Confirmed", value: stats.serviceRequests.confirmed },
        { label: "In Progress", value: stats.serviceRequests.inProgress },
        { label: "Pending", value: stats.serviceRequests.pending },
      ],
    },
    {
      title: "Users",
      total: stats.users.total,
      icon: Users,
      color: "amber",
      items: [
        { label: "Active", value: stats.users.active },
        { label: "Customers", value: stats.users.customers },
        { label: "Power Operators", value: stats.users.powerOperators },
        { label: "Technicians", value: stats.users.technicians },
        { label: "Blocked", value: stats.users.blocked },
        { label: "Deleted", value: stats.users.deleted },
      ],
    },
  ];

  const themes = {
    blue: {
      icon: "bg-blue-100 text-blue-600",
      accent: "bg-blue-600",
      total: "text-blue-600",
    },
    emerald: {
      icon: "bg-emerald-100 text-emerald-600",
      accent: "bg-emerald-600",
      total: "text-emerald-600",
    },
    violet: {
      icon: "bg-violet-100 text-violet-600",
      accent: "bg-violet-600",
      total: "text-violet-600",
    },
    amber: {
      icon: "bg-amber-100 text-amber-600",
      accent: "bg-amber-500",
      total: "text-amber-600",
    },
  };

  return (
    <div className="min-h-screen space-y-8 bg-slate-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-blue-600">
            ADMINISTRATION
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            Dashboard Overview
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Monitor users, outages, payments, and service requests.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-medium text-emerald-700 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          System Overview
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          const theme = themes[card.color as keyof typeof themes];

          return (
            <div
              key={card.title}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${theme.icon}`}
                >
                  <Icon size={24} />
                </div>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                  Total
                </span>
              </div>

              <div className="mt-5">
                <p className="text-sm font-medium text-slate-500">
                  {card.title}
                </p>
                <h2
                  className={`mt-1 text-4xl font-bold tracking-tight ${theme.total}`}
                >
                  {card.total}
                </h2>
              </div>

              <div className="mt-5 border-t border-slate-100 pt-4">
                <div className="mb-3 flex items-center gap-2">
                  <Activity size={15} className="text-slate-400" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Breakdown
                  </span>
                </div>

                <div className="space-y-3">
                  {card.items.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between gap-3"
                    >
                      <span className="text-sm text-slate-600">
                        {item.label}
                      </span>
                      <span className="min-w-8 rounded-lg bg-slate-50 px-2 py-1 text-center text-sm font-semibold text-slate-800">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional overview */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-emerald-100 p-3 text-emerald-600">
              <CheckCircle2 size={22} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Successful Payments</p>
              <h3 className="text-2xl font-bold text-slate-900">
                {stats.payments.paid}
              </h3>
            </div>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Payments recorded as paid.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
              <Zap size={22} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Restored Outages</p>
              <h3 className="text-2xl font-bold text-slate-900">
                {stats.outages.restored}
              </h3>
            </div>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Outages marked as restored.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-violet-100 p-3 text-violet-600">
              <UserCheck size={22} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Active Users</p>
              <h3 className="text-2xl font-bold text-slate-900">
                {stats.users.active}
              </h3>
            </div>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Users currently marked as active.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
