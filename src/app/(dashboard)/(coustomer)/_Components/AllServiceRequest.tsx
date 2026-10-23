"use client";

import { useGetAllServiceRequest } from "@/hooks/coustomer.hooks";
import React from "react";

const AllServiceRequest = () => {
  const { data, isPending, isError } = useGetAllServiceRequest();

  if (isPending) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <p className="text-gray-500">Loading service requests...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
        Failed to load service requests. Please try again.
      </div>
    );
  }

  // API response: data.data.data contains the service request array
  const serviceRequests = data?.data?.data ?? [];

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("en-BD", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatType = (type: string) => {
    return type
      .split("_")
      .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
      .join(" ");
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      case "APPROVED":
        return "bg-blue-100 text-blue-700";
      case "IN_PROGRESS":
        return "bg-indigo-100 text-indigo-700";
      case "COMPLETED":
        return "bg-green-100 text-green-700";
      case "REJECTED":
        return "bg-red-100 text-red-700";
      case "CANCELLED":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Service Requests
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          View your service request history and current status.
        </p>
      </div>

      {serviceRequests.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
          <p className="text-gray-600">No service requests found.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Service Type
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Status
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Description
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Created At
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {serviceRequests.map(
                  (request: {
                    id: string;
                    type: string;
                    status: string;
                    description: string;
                    createdAt: string;
                  }) => (
                    <tr
                      key={request.id}
                      className="transition-colors hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {formatType(request.type)}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                            request.status
                          )}`}
                        >
                          {formatType(request.status)}
                        </span>
                      </td>

                      <td className="max-w-xs whitespace-normal break-words px-6 py-4 text-sm text-gray-600">
                        {request.description || "—"}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                        {formatDate(request.createdAt)}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          <div className="border-t border-gray-200 px-6 py-3 text-sm text-gray-500">
            Total requests: {serviceRequests.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllServiceRequest;