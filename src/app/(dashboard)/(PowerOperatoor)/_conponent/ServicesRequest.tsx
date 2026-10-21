"use client";

import { useServiceRequest } from "@/hooks/poweroperator.hooks";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const ServicesRequest = () => {
    const router= useRouter()
  const { data, isPending, isError, error } = useServiceRequest();

  if (isPending) {
    return <h1 className="p-6 text-lg">Loading...</h1>;
  }

  if (isError) {
    return (
      <p className="p-6 text-red-500">
        {error instanceof Error
          ? error.message
          : "Failed to load service requests"}
      </p>
    );
  }

  // API response: data.data.data is the service requests array
  const serviceRequests = data?.data?.data ?? [];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-green-100 text-green-700";
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      case "CANCELLED":
        return "bg-red-100 text-red-700";
      case "COMPLETED":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleViewDetails = (id: string) => {
    router.push(`/power-operator-dashboard/services-request/${id}`);
  };

  return (
    <div className="space-y-5 p-6">
      <div>
        <h1 className="text-2xl font-bold">Service Requests</h1>
        <p className="mt-1 text-sm text-gray-500">
          Total requests: {serviceRequests.length}
        </p>
      </div>

      {serviceRequests.length === 0 ? (
        <p className="rounded-lg border p-6 text-center text-gray-500">
          No service requests found.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {serviceRequests.map((request: any) => (
            <div
              key={request.id}
              className="rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <h2 className="font-semibold text-gray-900">
                  {request.type.replaceAll("_", " ")}
                </h2>

                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                    request.status
                  )}`}
                >
                  {request.status.replaceAll("_", " ")}
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-xs font-medium text-gray-500">
                    Description
                  </p>
                  <p className="mt-1 text-sm text-gray-800">
                    {request.description || "No description"}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-500">
                    Requested by
                  </p>
                  <p className="mt-1 text-sm font-medium text-gray-800">
                    {request.user?.name || "Unknown user"}
                  </p>
                </div>
              </div>
              <button
                        type="button"
                        onClick={() => handleViewDetails(request.id)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        View Details
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServicesRequest;