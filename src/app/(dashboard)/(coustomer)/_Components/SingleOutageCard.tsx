"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import {
  useCancelOutageCoustomer,
  useGetsingleOutageCoustomer,
} from "@/hooks/coustomer.hooks";
import { useParams } from "next/navigation";

const SingleOutageCard = () => {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const {
    data,
    isPending,
    isError,
  } = useGetsingleOutageCoustomer(id);

  const {
    mutateAsync,
    isPending: outageCancel,
  } = useCancelOutageCoustomer(id);

  if (isPending) {
    return <h1 className="p-6">Loading...</h1>;
  }

  if (isError) {
    return (
      <h1 className="p-6 text-red-500">
        Failed to load outage.
      </h1>
    );
  }

  const outage = data?.data;

  if (!outage) {
    return <h1 className="p-6">Outage not found.</h1>;
  }

  const handleCancel = async () => {
    try {
      const result = await mutateAsync();

      if (result?.success) {
        toast.add({
          type: "success",
          description: "Outage canceled successfully.",
        });
      } else {
        toast.add({
          type: "error",
          description:
            result?.message || "Failed to cancel outage.",
        });
      }
    } catch (error) {
      console.error("Cancel outage error:", error);

      toast.add({
        type: "error",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong while canceling the outage.",
      });
    }
  };

  const isCanceled =
    outage.status === "CANCELLED" ||
    outage.status === "CANCELED";

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="overflow-hidden rounded-xl border bg-white shadow-md">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b bg-gray-50 p-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {outage.title}
            </h1>

            <p className="mt-1 break-all text-sm text-gray-500">
              Outage ID: {outage.id}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              onClick={handleCancel}
              disabled={outageCancel || isCanceled}
              variant="destructive"
            >
              {outageCancel
                ? "Cancelling..."
                : isCanceled
                  ? "Cancelled"
                  : "Cancel Outage"}
            </Button>

            <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              {outage.status}
            </span>
          </div>
        </div>

        {/* Outage Information */}
        <div className="p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">
            Outage Information
          </h2>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Info label="Title" value={outage.title} />
            <Info label="Description" value={outage.description} />
            <Info label="Priority" value={outage.priority} />
            <Info label="Status" value={outage.status} />
            <Info label="Reported By" value={outage.reportedBy} />
            <Info label="Technician ID" value={outage.technicianId} />
            <Info label="Started At" value={formatDate(outage.startedAt)} />
            <Info label="Created At" value={formatDate(outage.createdAt)} />
            <Info label="Updated At" value={formatDate(outage.updatedAt)} />
            <Info label="Restored At" value={formatDate(outage.restoredAt)} />
            <Info label="Deleted At" value={formatDate(outage.deletedAt)} />
            <Info label="Zone ID" value={outage.zoneId} />
          </div>
        </div>

        {/* Zone Information */}
        {outage.zone && (
          <div className="border-t p-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">
              Zone Information
            </h2>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Info label="Zone Name" value={outage.zone.name} />
              <Info label="Zone Code" value={outage.zone.code} />
              <Info label="Area" value={outage.zone.area} />
              <Info label="Location" value={outage.zone.location} />
              <Info label="Substation" value={outage.zone.substation} />
              <Info label="Feeder" value={outage.zone.feeder} />
              <Info label="Zone ID" value={outage.zone.id} />
              <Info
                label="Zone Created At"
                value={formatDate(outage.zone.createdAt)}
              />
              <Info
                label="Zone Updated At"
                value={formatDate(outage.zone.updatedAt)}
              />
              <Info
                label="Zone Deleted At"
                value={formatDate(outage.zone.deletedAt)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Info = ({
  label,
  value,
}: {
  label: string;
  value: string | null | undefined;
}) => (
  <div className="min-w-0">
    <p className="text-sm font-medium text-gray-500">{label}</p>
    <p className="mt-1 break-words text-sm text-gray-800">
      {value ?? "N/A"}
    </p>
  </div>
);

const formatDate = (
  date: string | null | undefined
): string => {
  if (!date) return "N/A";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "N/A";
  }

  return parsedDate.toLocaleString();
};

export default SingleOutageCard;