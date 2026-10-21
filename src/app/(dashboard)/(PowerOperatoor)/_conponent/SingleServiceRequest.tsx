"use client";

import { useSingleServiceRequest } from "@/hooks/poweroperator.hooks";
import { useParams } from "next/navigation";
import React from "react";

type DetailProps = {
  label: string;
  value: unknown;
};

const SingleServiceRequest = () => {
  const params = useParams();
  const id = params.id as string;

  const { data, isPending, isError, error } = useSingleServiceRequest(id);

  if (isPending) {
    return (
      <div className="flex min-h-40 items-center justify-center p-6">
        <p className="animate-pulse text-gray-500">
          Loading service request details...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="m-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
        {error instanceof Error
          ? error.message
          : "Failed to load service request."}
      </div>
    );
  }

  // API response: { success, message, data: { ...request } }
  const request = data?.data;

  if (!request) {
    return (
      <div className="m-6 rounded-lg border p-6 text-center text-gray-500">
        Service request not found.
      </div>
    );
  }

  const formatValue = (value: unknown): string => {
    if (value === null || value === undefined || value === "") {
      return "Not available";
    }

    return String(value);
  };

  const formatLabel = (value?: string | null): string => {
    if (!value) return "Not available";

    return value.replaceAll("_", " ");
  };

  const formatDate = (value?: string | null): string => {
    if (!value) return "Not available";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "Not available";
    }

    return date.toLocaleString();
  };

  const Detail = ({ label, value }: DetailProps) => (
    <div className="min-w-0 rounded-lg bg-gray-50 p-3">
      <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500">
        {label}
      </p>

      <p className="break-words text-sm font-semibold text-gray-800">
        {formatValue(value)}
      </p>
    </div>
  );

  const Section = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <section className="rounded-xl border bg-white p-5 shadow-sm">
      <h2 className="mb-4 border-b pb-3 text-lg font-semibold text-gray-900">
        {title}
      </h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {children}
      </div>
    </section>
  );

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 md:p-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Service Request Details
        </h1>

        <p className="mt-1 break-all text-sm text-gray-500">
          Request ID: {formatValue(request.id)}
        </p>
      </div>

      {/* Service Information */}
      <Section title="Service Information">
        <Detail
          label="Service Type"
          value={formatLabel(request.type)}
        />

        <Detail
          label="Description"
          value={request.description || "No description provided"}
        />

        <Detail
          label="Status"
          value={formatLabel(request.status)}
        />

        <Detail label="Request ID" value={request.id} />

        <Detail
          label="Account Number"
          value={request.accountNumber}
        />

        <Detail label="User ID" value={request.userId} />

        <Detail
          label="Zone ID"
          value={request.zoneId}
        />

        <Detail
          label="Technician ID"
          value={request.technicianId || "Technician not assigned yet"}
        />

        <Detail
          label="Created At"
          value={formatDate(request.createdAt)}
        />

        <Detail
          label="Updated At"
          value={formatDate(request.updatedAt)}
        />

        <Detail
          label="Deleted At"
          value={
            request.deletedAt
              ? formatDate(request.deletedAt)
              : "Not deleted"
          }
        />
      </Section>

      {/* Customer Information */}
      <Section title="Customer Information">
        {!request.user ? (
          <p className="col-span-full rounded-lg bg-yellow-50 p-4 text-sm font-medium text-yellow-700">
            Customer information not available.
          </p>
        ) : (
          <>
            <Detail
              label="Customer Name"
              value={request.user.name || "Name not available"}
            />

            <Detail
              label="Email"
              value={request.user.email || "Email not available"}
            />

            <Detail
              label="Phone"
              value={request.user.phone || "Phone not available"}
            />

            <Detail
              label="Account Number"
              value={request.user.accountNumber}
            />

            <Detail
              label="Customer ID"
              value={request.user.id}
            />
          </>
        )}
      </Section>

      {/* Zone Information */}
      <Section title="Zone Information">
        {!request.zone ? (
          <p className="col-span-full rounded-lg bg-yellow-50 p-4 text-sm font-medium text-yellow-700">
            Zone information not available.
          </p>
        ) : (
          <>
            <Detail label="Zone Name" value={request.zone.name} />

            <Detail label="Zone Code" value={request.zone.code} />

            <Detail label="Area" value={request.zone.area} />

            <Detail label="Location" value={request.zone.location} />

            <Detail
              label="Substation"
              value={request.zone.substation}
            />

            <Detail label="Feeder" value={request.zone.feeder} />

            <Detail label="Zone ID" value={request.zone.id} />

            <Detail
              label="Zone Created At"
              value={formatDate(request.zone.createdAt)}
            />

            <Detail
              label="Zone Updated At"
              value={formatDate(request.zone.updatedAt)}
            />
          </>
        )}
      </Section>

      {/* Payment Information */}
      <Section title="Payment Information">
        {!request.payment ? (
          <div className="col-span-full rounded-lg border border-amber-200 bg-amber-50 p-4">
            <p className="font-semibold text-amber-800">
              Payment not yet.
            </p>

            <p className="mt-1 text-sm text-amber-700">
              No payment information is available for this service request.
            </p>
          </div>
        ) : (
          <>
            <Detail
              label="Payment Status"
              value={formatLabel(request.payment.status)}
            />

            <Detail
              label="Amount"
              value={
                request.payment.amount != null
                  ? `${request.payment.amount} BDT`
                  : "Amount not available"
              }
            />

            <Detail
              label="Payment Method"
              value={request.payment.provider}
            />

            <Detail
              label="Transaction ID"
              value={request.payment.transactionId}
            />

            <Detail
              label="Payment ID"
              value={request.payment.id}
            />

            <Detail
              label="Payment User ID"
              value={request.payment.userId}
            />

            <Detail
              label="Payment Created At"
              value={formatDate(request.payment.createdAt)}
            />

            <Detail
              label="Paid At"
              value={
                request.payment.paidAt
                  ? formatDate(request.payment.paidAt)
                  : "Payment not completed yet"
              }
            />
          </>
        )}
      </Section>

      {/* Technician Information */}
      <Section title="Technician Information">
        {!request.technician && !request.technicianId ? (
          <div className="col-span-full rounded-lg border border-amber-200 bg-amber-50 p-4">
            <p className="font-semibold text-amber-800">
              Technician not assigned yet.
            </p>

            <p className="mt-1 text-sm text-amber-700">
              A technician has not been assigned to this service request.
            </p>
          </div>
        ) : !request.technician ? (
          <div className="col-span-full rounded-lg border border-blue-200 bg-blue-50 p-4">
            <p className="font-semibold text-blue-800">
              Technician assigned.
            </p>

            <p className="mt-1 text-sm text-blue-700">
              Technician details are not available yet.
            </p>

            <p className="mt-2 break-all text-sm text-blue-700">
              Technician ID: {request.technicianId}
            </p>
          </div>
        ) : (
          <>
            <Detail
              label="Technician Name"
              value={
                request.technician?.user?.name ??
                request.technician?.name ??
                "Name not available"
              }
            />

            <Detail
              label="Technician Email"
              value={
                request.technician?.user?.email ??
                request.technician?.email ??
                "Email not available"
              }
            />

            <Detail
              label="Technician Phone"
              value={
                request.technician?.user?.phone ??
                request.technician?.phone ??
                "Phone not available"
              }
            />

            <Detail
              label="Technician ID"
              value={request.technicianId}
            />
          </>
        )}
      </Section>
    </div>
  );
};

export default SingleServiceRequest;