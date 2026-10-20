
"use client";

import { Button } from "@/components/ui/button";
import { useTecSingleCard } from "@/hooks/technician.hooks";
import {
  updateOutageStatus,
  type OutageStatus,
} from "../_action/updateOutageStatus";
import { useState } from "react";

const SingleOutage = ({ id }: { id: string }) => {
  const { data, isPending, isError, refetch } = useTecSingleCard(id);

  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpdateStatus = async (status: OutageStatus) => {
    try {
      setIsUpdating(true);
      setMessage("");

      await updateOutageStatus(id, status);

      setMessage(`Status updated to ${status.replace("_", " ")} successfully!`);

      await refetch();
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Failed to update status"
      );
    } finally {
      setIsUpdating(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <p className="animate-pulse text-gray-500">
          Loading outage details...
        </p>
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="mx-auto mt-10 max-w-xl rounded-xl border border-red-200 bg-red-50 p-6 text-center">
        <h2 className="text-lg font-semibold text-red-700">
          Unable to load outage
        </h2>
        <p className="mt-2 text-sm text-red-600">
          Please try again later.
        </p>
      </div>
    );
  }

  const outage = data.data;

  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-6">
      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <div className="border-b bg-slate-50 p-6">
          <p className="text-sm font-medium text-blue-600">
            Technician Dashboard / Outage Details
          </p>

          <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
            {outage.title}
          </h1>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
              Priority: {outage.priority}
            </span>

            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
              Status: {outage.status?.replace("_", " ") || "Unknown"}
            </span>
          </div>
        </div>

        <div className="space-y-6 p-6">
          <section>
            <h2 className="text-lg font-semibold text-slate-900">
              Outage Description
            </h2>
            <p className="mt-2 whitespace-pre-wrap leading-7 text-slate-600">
              {outage.description}
            </p>
          </section>

          <div className="border-t" />

          <section>
            <h2 className="text-lg font-semibold text-slate-900">
              Reporter Information
            </h2>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Full Name</p>
                <p className="mt-1 font-medium text-slate-900">
                  {outage.reporter?.name || "Not available"}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Phone Number</p>
                <p className="mt-1 break-words font-medium text-slate-900">
                  {outage.reporter?.phone || "Not available"}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 sm:col-span-2">
                <p className="text-sm text-slate-500">Email Address</p>
                <p className="mt-1 break-words font-medium text-slate-900">
                  {outage.reporter?.email || "Not available"}
                </p>
              </div>
            </div>
          </section>

          <div className="border-t" />

          <section className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-slate-500">Service Area</p>
              <p className="mt-1 font-medium text-slate-900">
                {outage.zone?.area || "Not available"}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Reported On</p>
              <p className="mt-1 font-medium text-slate-900">
                {outage.createdAt
                  ? new Date(outage.createdAt).toLocaleString()
                  : "Not available"}
              </p>
            </div>
          </section>

          <div className="border-t pt-5">
            <h2 className="mb-3 text-lg font-semibold text-slate-900">
              Update Outage Status
            </h2>

            <div className="flex flex-col gap-3 sm:flex-row">

            {outage.status === "ASSIGNED" && (
  <Button
    onClick={() => handleUpdateStatus("IN_PROGRESS")}
    disabled={isUpdating}
    className="w-full bg-amber-600 hover:bg-amber-700 sm:w-auto"
  >
    {isUpdating ? "Updating..." : "Mark In Progress"}
  </Button>
)}

{outage.status === "IN_PROGRESS" && (
  <Button
    onClick={() => handleUpdateStatus("RESTORED")}
    disabled={isUpdating}
    className="w-full bg-emerald-600 hover:bg-emerald-700 sm:w-auto"
  >
    {isUpdating ? "Updating..." : "Mark Restored"}
  </Button>
)}
              
            
               
             
            </div>

            {message && (
              <p className="mt-4 rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleOutage;
