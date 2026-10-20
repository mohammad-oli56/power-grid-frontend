
"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useTecSingleCardService, useUpdateServiceStatus } from "@/hooks/technician.hooks";

type ServiceStatus = "IN_PROGRESS" | "COMPLETED";

interface Service {
  id: string;
  accountNumber?: string;
  type?: string;
  status: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  user?: {
    name?: string;
    email?: string;
    phone?: string;
  };
  zone?: {
    name?: string;
    code?: string;
    substation?: string;
    feeder?: string;
  };
}

const SingleService = () => {
  const params = useParams();
  const id = params.id as string;

  const { data, isPending, isError, refetch } =
    useTecSingleCardService(id);

  const statusMutation = useUpdateServiceStatus(id);

  // API response: { data: { ...service } }
  const service: Service | undefined = data?.data;

  const handleUpdateStatus = (status: ServiceStatus) => {
    statusMutation.mutate({ status });
  };

  const formatText = (value?: string) => {
    if (!value) return "N/A";

    return value
      .replaceAll("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const formatDate = (value?: string) => {
    if (!value) return "N/A";

    const date = new Date(value);

    return Number.isNaN(date.getTime())
      ? "N/A"
      : date.toLocaleString();
  };

  const getStatusStyle = (status?: string) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-blue-100 text-blue-700";
      case "IN_PROGRESS":
        return "bg-amber-100 text-amber-700";
      case "COMPLETED":
        return "bg-emerald-100 text-emerald-700";
      case "CANCELLED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  if (isPending) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <p className="animate-pulse text-gray-500">
          Loading service details...
        </p>
      </div>
    );
  }

  if (isError || !service) {
    return (
      <div className="mx-auto mt-10 max-w-xl rounded-xl border border-red-200 bg-red-50 p-6 text-center">
        <h2 className="text-lg font-semibold text-red-700">
          Unable to load service
        </h2>

        <p className="mt-2 text-sm text-red-600">
          Please try again later.
        </p>

        <Button className="mt-4" onClick={() => refetch()}>
          Try Again
        </Button>
      </div>
    );
  }

  const isUpdating = statusMutation.isPending;

  return (
    <div className="mx-auto max-w-5xl p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <p className="text-sm font-medium text-blue-600">
          Technician Dashboard / Service Details
        </p>

        <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
          {formatText(service.type)}
        </h1>

        <p className="mt-2 break-all text-sm text-slate-500">
          Service ID: {service.id}
        </p>
      </div>

      {/* Main Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
        {/* Status and Account */}
        <div className="flex flex-col gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-slate-500">Current Status</p>

            <span
              className={`mt-2 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${getStatusStyle(
                service.status
              )}`}
            >
              {formatText(service.status)}
            </span>
          </div>

          <div>
            <p className="text-sm text-slate-500">Account Number</p>
            <p className="mt-1 font-semibold text-slate-800">
              {service.accountNumber || "N/A"}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="py-6">
          <h2 className="mb-2 text-lg font-semibold text-slate-800">
            Description
          </h2>

          <p className="rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-600">
            {service.description || "No description available."}
          </p>
        </div>

        {/* Customer Information */}
        <div className="border-t border-slate-100 py-6">
          <h2 className="mb-4 text-lg font-semibold text-slate-800">
            Customer Information
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <Info label="Customer Name" value={service.user?.name} />
            <Info label="Email" value={service.user?.email} />
            <Info label="Phone" value={service.user?.phone} />
          </div>
        </div>

        {/* Zone Information */}
        <div className="border-t border-slate-100 py-6">
          <h2 className="mb-4 text-lg font-semibold text-slate-800">
            Zone Information
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <Info label="Zone Name" value={service.zone?.name} />
            <Info label="Zone Code" value={service.zone?.code} />
            <Info
              label="Substation"
              value={service.zone?.substation}
            />
            <Info label="Feeder" value={service.zone?.feeder} />
          </div>
        </div>

        {/* Dates */}
        <div className="grid gap-4 border-t border-slate-100 py-6 sm:grid-cols-2">
          <Info
            label="Created At"
            value={formatDate(service.createdAt)}
          />
          <Info
            label="Last Updated"
            value={formatDate(service.updatedAt)}
          />
        </div>

        {/* Mutation Error */}
        {statusMutation.isError && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {statusMutation.error instanceof Error
              ? statusMutation.error.message
              : "Failed to update service status."}
          </div>
        )}

        {/* Status Actions */}
        <div className="flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row">
          {service.status === "CONFIRMED" && (
            <Button
              disabled={isUpdating}
              onClick={() => handleUpdateStatus("IN_PROGRESS")}
              className="w-full sm:w-auto"
            >
              {isUpdating ? "Updating..." : "Start Service"}
            </Button>
          )}

          {service.status === "IN_PROGRESS" && (
            <Button
              disabled={isUpdating}
              onClick={() => handleUpdateStatus("COMPLETED")}
              className="w-full bg-emerald-600 hover:bg-emerald-700 sm:w-auto"
            >
              {isUpdating ? "Updating..." : "Complete Service"}
            </Button>
          )}

          {service.status === "COMPLETED" && (
            <p className="rounded-lg bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
              This service has been completed.
            </p>
          )}

          {service.status === "CANCELLED" && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              This service has been cancelled.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

function Info({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-2 break-words text-sm font-semibold text-slate-800">
        {value || "N/A"}
      </p>
    </div>
  );
}

export default SingleService;
