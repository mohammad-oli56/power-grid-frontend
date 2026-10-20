
"use client";

import React from "react";
import {
  useTechnicianOutage,
  useTechnicianService,
} from "@/hooks/technician.hooks";
import { useMe } from "@/hooks/useMe.hooks";

const TechnicianHomepage = () => {
  const {
    data: meData,
    isPending: isMePending,
    isError: isMeError,
  } = useMe();

  const {
    data: outageData,
    isPending: isOutagePending,
    isError: isOutageError,
  } = useTechnicianOutage();

  const {
    data: serviceData,
    isPending: isServicePending,
    isError: isServiceError,
  } = useTechnicianService();

  const isPending =
    isMePending || isOutagePending || isServicePending;

  if (isPending) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="h-8 w-56 animate-pulse rounded-lg bg-slate-200" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-36 animate-pulse rounded-2xl bg-slate-200"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Profile data
  const profile = meData?.data?.data ?? meData?.data;

  // API response shape অনুযায়ী arrays বের করা
  const outages = Array.isArray(outageData?.data?.data)
    ? outageData.data.data
    : Array.isArray(outageData?.data)
      ? outageData.data
      : [];

  const services = Array.isArray(serviceData?.data?.data)
    ? serviceData.data.data
    : Array.isArray(serviceData?.data)
      ? serviceData.data
      : [];

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        {/* Welcome section */}
        <div className="mb-8">
          <p className="text-sm font-medium text-blue-600">
            Technician Dashboard
          </p>

          <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
            Welcome back{profile?.name ? `, ${profile.name}` : ""}!
          </h1>

          <p className="mt-2 text-slate-500">
            Here is an overview of your technician activities.
          </p>
        </div>

        {/* Error message */}
        {(isMeError || isOutageError || isServiceError) && (
          <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            Some dashboard data could not be loaded. Available data is
            still displayed below.
          </div>
        )}

        {/* Three summary cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Profile card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
              👨‍🔧
            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">
              Technician Profile
            </p>

            <h2 className="mt-2 text-xl font-bold text-slate-900">
              {profile?.name || "Technician"}
            </h2>

            <p className="mt-2 break-words text-sm text-slate-500">
              {profile?.email || "No email available"}
            </p>
          </div>

          {/* Outage card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-2xl">
              ⚡
            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">
              Assigned Outages
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              {outages.length}
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Total outage records assigned to you
            </p>
          </div>

          {/* Services card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-2xl">
              🛠️
            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">
              Assigned Services
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              {services.length}
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Total service requests assigned to you
            </p>
          </div>
        </div>

        {/* Recent services */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-bold text-slate-900">
            Recent Assigned Services
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your latest service requests.
          </p>

          {services.length === 0 ? (
            <p className="py-8 text-center text-sm text-slate-500">
              No assigned services found.
            </p>
          ) : (
            <div className="mt-5 space-y-3">
              {services.slice(0, 5).map((service: any) => (
                <div
                  key={service.id}
                  className="flex flex-col gap-3 rounded-xl border border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <h3 className="font-semibold text-slate-800">
                      {service.type
                        ?.replaceAll("_", " ")
                        .toLowerCase()
                        .replace(/\b\w/g, (char: string) =>
                          char.toUpperCase()
                        ) || "Service Request"}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {service.description || "No description available"}
                    </p>
                  </div>

                  <span className="w-fit rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                    {service.status || "Unknown"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TechnicianHomepage;
