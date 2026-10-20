
"use client";

import React from "react";
import { useTechnicianGet } from "@/hooks/poweroperator.hooks";

type Technician = {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  status?: string;
  zone?: {
    name?: string;
  } | string;
  user?: {
    name?: string;
    email?: string;
    phone?: string;
  };
};

const Technicians = () => {
  const { data, isPending, isError, error } = useTechnicianGet();

  if (isPending) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading technicians...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="m-4 rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
        {error instanceof Error
          ? error.message
          : "Failed to load technicians."}
      </div>
    );
  }

  const technicians: Technician[] = Array.isArray(data?.data?.data)
    ? data.data.data
    : Array.isArray(data?.data)
      ? data.data
      : Array.isArray(data)
        ? data
        : [];

  return (
    <div className="space-y-5 p-4 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Technicians
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            View technician information.
          </p>
        </div>

        <span className="rounded-full bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700">
          Total: {technicians.length}
        </span>
      </div>

      {technicians.length === 0 ? (
        <div className="rounded-xl border border-dashed p-8 text-center">
          <p className="font-medium text-gray-700">
            No technicians found.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {technicians.map((technician, index) => {
            const name = technician.user?.name ?? technician.name ?? "Technician";
            const email = technician.user?.email ?? technician.email;
            const phone = technician.user?.phone ?? technician.phone;

            const zone =
              typeof technician.zone === "string"
                ? technician.zone
                : technician.zone?.name;

            return (
              <div
                key={technician.id ?? email ?? index}
                className="rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-700">
                    {name.charAt(0).toUpperCase()}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h2 className="break-words font-semibold text-gray-900">
                      {name}
                    </h2>
                    {email && (
                      <p className="mt-1 break-all text-sm text-gray-500">
                        {email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-4 space-y-3 border-t pt-4 text-sm">
                  {phone && (
                    <div className="flex justify-between gap-3">
                      <span className="text-gray-500">Phone</span>
                      <span className="break-all text-right font-medium text-gray-800">
                        {phone}
                      </span>
                    </div>
                  )}

                  {zone && (
                    <div className="flex justify-between gap-3">
                      <span className="text-gray-500">Zone</span>
                      <span className="text-right font-medium text-gray-800">
                        {zone}
                      </span>
                    </div>
                  )}

                  {technician.status && (
                    <div className="flex justify-between gap-3">
                      <span className="text-gray-500">Status</span>
                      <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                        {technician.status}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Technicians;
