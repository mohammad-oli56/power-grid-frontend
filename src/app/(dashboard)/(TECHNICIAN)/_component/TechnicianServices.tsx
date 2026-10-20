
"use client";

import { Button } from "@/components/ui/button";
import { useTechnicianService } from "@/hooks/technician.hooks";
import { useRouter } from "next/navigation";

const TechnicianServices = () => {
  const { data, isPending, isError } = useTechnicianService();
  const router = useRouter();

  if (isPending) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <p className="animate-pulse text-gray-500">
          Loading services...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-center text-red-600">
        Failed to load technician services.
      </div>
    );
  }

  // Actual response: data.data.data
  const services = Array.isArray(data?.data?.data)
    ? data.data.data
    : [];

  return (
    <div className="mx-auto max-w-6xl p-4 sm:p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          My Assigned Services
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          View your assigned services and track their status.
        </p>

        <p className="mt-3 text-sm font-medium text-slate-700">
          Total Services: {data?.data?.meta?.total ?? services.length}
        </p>
      </div>

      {/* Empty State */}
      {services.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center">
          <h2 className="text-lg font-semibold text-slate-800">
            No Assigned Services
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            You don't have any assigned services right now.
          </p>
        </div>
      ) : (
        /* Service Cards */
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service: any) => (
            <div
              key={service.id}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Service Type */}
              <div className="mb-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                  Service Type
                </p>

                <h2 className="mt-2 text-lg font-bold leading-7 text-slate-900">
                  {service.type
                    ?.replaceAll("_", " ")
                    .toLowerCase()
                    .replace(/\b\w/g, (char: string) =>
                      char.toUpperCase()
                    ) || "Unknown Service"}
                </h2>
              </div>

              {/* Status */}
              <div>
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                    service.status === "CONFIRMED"
                      ? "bg-emerald-100 text-emerald-700"
                      : service.status === "PENDING"
                      ? "bg-amber-100 text-amber-700"
                      : service.status === "CANCELLED"
                      ? "bg-red-100 text-red-700"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {service.status?.replaceAll("_", " ") || "Unknown"}
                </span>
              </div>

              {/* Description */}
              <div className="mt-5 flex-1">
                <p className="mb-2 text-sm font-semibold text-slate-700">
                  Description
                </p>

                <p className="line-clamp-3 text-sm leading-6 text-slate-500">
                  {service.description || "No description available."}
                </p>
              </div>

              {/* Date */}
              <div className="mt-5 border-t border-slate-100 pt-4">
                <p className="text-xs text-slate-400">
                  Created At
                </p>

                <p className="mt-1 text-sm font-medium text-slate-600">
                  {service.createdAt
                    ? new Date(service.createdAt).toLocaleDateString()
                    : "Not available"}
                </p>
              </div>

              {/* View Details */}
              <div className="mt-4">
                <Button
                  className="w-full"
                  onClick={() =>
                    router.push(
                      `/technician-dashboard/assigne-service/${service.id}`
                    )
                  }
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TechnicianServices;
