
"use client";

import React from "react";
import { useZone } from "@/hooks/poweroperator.hooks";

type Zone = {
  id?: string;
  name: string;
  code: string;
  substation: string;
  feeder: string;
  area: string;
  location: string;
};

const Zones = () => {
  const { data, isPending, isError, error } = useZone();

  const zones: Zone[] = Array.isArray(data?.data?.data)
    ? data.data.data
    : Array.isArray(data?.data)
      ? data.data
      : Array.isArray(data)
        ? data
        : [];

  if (isPending) {
    return (
      <div className="flex min-h-60 items-center justify-center">
        <p className="animate-pulse text-sm text-gray-500">
          Loading zones...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
        {error instanceof Error ? error.message : "Failed to load zones."}
      </div>
    );
  }

  return (
    <div className="space-y-5 p-3 sm:p-5 md:p-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
            All Zones
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            View all registered power zones.
          </p>
        </div>

        <span className="rounded-full bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700">
          Total: {zones.length}
        </span>
      </div>

      {zones.length === 0 ? (
        <div className="rounded-xl border border-dashed p-8 text-center sm:p-12">
          <h2 className="font-semibold text-gray-800">No zones found</h2>
          <p className="mt-2 text-sm text-gray-500">
            No zones have been created yet.
          </p>
        </div>
      ) : (
        <>
          {/* Mobile list */}
          <div className="space-y-3 md:hidden">
            {zones.map((zone, index) => (
              <div
                key={zone.id ?? zone.code ?? index}
                className="rounded-xl border bg-white p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="break-words font-semibold text-gray-900">
                      {zone.name}
                    </h2>
                    <p className="mt-1 break-all text-sm text-blue-600">
                      {zone.code}
                    </p>
                  </div>

                  <span className="shrink-0 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                    Zone {index + 1}
                  </span>
                </div>

                <div className="mt-4 divide-y text-sm">
                  <div className="flex justify-between gap-4 py-2">
                    <span className="text-gray-500">Substation</span>
                    <span className="max-w-[60%] break-words text-right font-medium text-gray-800">
                      {zone.substation || "N/A"}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4 py-2">
                    <span className="text-gray-500">Feeder</span>
                    <span className="max-w-[60%] break-words text-right font-medium text-gray-800">
                      {zone.feeder || "N/A"}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4 py-2">
                    <span className="text-gray-500">Area</span>
                    <span className="max-w-[60%] break-words text-right font-medium text-gray-800">
                      {zone.area || "N/A"}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4 py-2">
                    <span className="text-gray-500">Location</span>
                    <span className="max-w-[60%] break-words text-right font-medium text-gray-800">
                      {zone.location || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop / tablet table */}
          <div className="hidden overflow-hidden rounded-xl border bg-white shadow-sm md:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-left text-sm">
                <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Zone</th>
                    <th className="px-5 py-4 font-semibold">Code</th>
                    <th className="px-5 py-4 font-semibold">Substation</th>
                    <th className="px-5 py-4 font-semibold">Feeder</th>
                    <th className="px-5 py-4 font-semibold">Area</th>
                    <th className="px-5 py-4 font-semibold">Location</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {zones.map((zone, index) => (
                    <tr
                      key={zone.id ?? zone.code ?? index}
                      className="transition hover:bg-gray-50"
                    >
                      <td className="px-5 py-4 font-medium text-gray-900">
                        {zone.name || "N/A"}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-blue-600">
                        {zone.code || "N/A"}
                      </td>
                      <td className="px-5 py-4 text-gray-700">
                        {zone.substation || "N/A"}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-gray-700">
                        {zone.feeder || "N/A"}
                      </td>
                      <td className="px-5 py-4 text-gray-700">
                        {zone.area || "N/A"}
                      </td>
                      <td className="px-5 py-4 text-gray-700">
                        {zone.location || "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Zones;
