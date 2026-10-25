
"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import {
  useCancelServiceRequestCoustomer,
  usePayment,
  useSingleSserviceRequestCoustomer,
} from "@/hooks/coustomer.hooks";
import { useParams } from "next/navigation";

import { useCallback, useEffect, useState } from "react";

const SiglgeServiceRequest = () => {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [countdown, setCountdown] = useState(0);
  const [paymentUrl, setPaymentUrl] = useState("");

  const {
    data,
    isPending,
    isError,
    error,
    refetch,
  } = useSingleSserviceRequestCoustomer(id);

  const {
    mutateAsync: cancelRequest,
    isPending: cancelPending,
  } = useCancelServiceRequestCoustomer(id);

  const {
    mutateAsync: paymentCreate,
    isPending: paymentPending,
  } = usePayment(id);

  // Countdown
  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setTimeout(() => {
      setCountdown((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  // Refresh request when user returns from the bKash tab.
  useEffect(() => {
    const refreshRequest = () => {
      if (document.visibilityState === "visible") {
        void refetch();
      }
    };

    window.addEventListener("focus", refreshRequest);
    document.addEventListener("visibilitychange", refreshRequest);

    return () => {
      window.removeEventListener("focus", refreshRequest);
      document.removeEventListener("visibilitychange", refreshRequest);
    };
  }, [refetch]);

  const formatDate = (date?: string | null) => {
    if (!date) return "N/A";

    const parsedDate = new Date(date);

    return Number.isNaN(parsedDate.getTime())
      ? "N/A"
      : parsedDate.toLocaleString();
  };

  const formatValue = (value: unknown): string => {
    if (value === null || value === undefined || value === "") {
      return "N/A";
    }

    if (typeof value === "object") {
      return JSON.stringify(value);
    }

    return String(value);
  };

  const handleCancel = async () => {
    try {
      const result = await cancelRequest();

      toast.add({
        type: "success",
        description:
          result?.message || "Service request canceled successfully.",
      });

      await refetch();
    } catch (err: unknown) {
      toast.add({
        type: "error",
        description:
          err instanceof Error
            ? err.message
            : "Failed to cancel service request.",
      });
    }
  };

  const handlePayment = async () => {
    if (
      countdown > 0 ||
      paymentPending ||
      cancelPending ||
      isPaymentPaid
    ) {
      return;
    }

    setPaymentUrl("");
    setCountdown(60);

    try {
      const result = await paymentCreate();
      const url = result?.data?.paymentUrl;

      if (!result?.success || !url) {
        setCountdown(0);

        toast.add({
          type: "error",
          description:
            result?.message || "Failed to create payment.",
        });

        return;
      }

      setPaymentUrl(url);

      // Open only after the API successfully returns the payment URL.
      // Do not use the "noopener" feature here because it can make
      // window.open() return null even when the tab opens.
      const paymentWindow = window.open(url, "_blank");

      if (paymentWindow) {
        paymentWindow.opener = null;

        toast.add({
          type: "success",
          description: "Payment page opened successfully.",
        });
      } else {
        toast.add({
          type: "error",
          description:
            "The browser blocked the new tab. Use the payment link below.",
        });
      }
    } catch (err: unknown) {
      setCountdown(0);

      toast.add({
        type: "error",
        description:
          err instanceof Error
            ? err.message
            : "Something went wrong while creating payment.",
      });
    }
  };

  if (isPending) {
    return (
      <div className="p-6 text-lg font-semibold">
        Loading service request...
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="p-6 text-red-500">
        {error instanceof Error
          ? error.message
          : "Failed to load service request."}
      </div>
    );
  }

  const request = data.data;
  const zone = request.zone;

  const isPaymentPaid =
    String(request.payment?.status ?? "").toUpperCase() === "PAID";

  const Field = ({
    label,
    value,
  }: {
    label: string;
    value: unknown;
  }) => (
    <div className="rounded-lg border border-gray-200 p-4">
      <p className="mb-1 text-sm text-gray-500">{label}</p>
      <p className="break-words font-medium text-gray-900">
        {formatValue(value)}
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Service Request Details
            </h1>
            <p className="mt-1 break-all text-sm text-gray-500">
              ID: {request.id}
            </p>
          </div>

          <span className="w-fit rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-800">
            {request.status}
          </span>
        </div>

        {/* API response */}
        <section className="rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">
            Response Information
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Field label="Success" value={data.success} />
            <Field label="Status Code" value={data.statusCode} />
            <Field label="Message" value={data.message} />
          </div>
        </section>

        {/* Service request */}
        <section className="rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">
            Service Request Information
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Field label="Request ID" value={request.id} />
            <Field label="Account Number" value={request.accountNumber} />
            <Field label="Request Type" value={request.type} />
            <Field label="Status" value={request.status} />
            <Field label="Description" value={request.description} />
            <Field label="User ID" value={request.userId} />
            <Field label="Technician ID" value={request.technicianId} />
            <Field label="Payment Status" value={request.payment?.status} />
            <Field label="Payment Amount" value={request.payment?.amount} />
            <Field
              label="Transaction ID"
              value={request.payment?.transactionId}
            />
            <Field
              label="Paid At"
              value={formatDate(request.payment?.paidAt)}
            />
            <Field label="Created At" value={formatDate(request.createdAt)} />
            <Field label="Updated At" value={formatDate(request.updatedAt)} />
            <Field label="Zone ID" value={request.zoneId} />
          </div>
        </section>

        {/* Payment completed */}
        {isPaymentPaid && (
          <section className="rounded-xl border border-green-200 bg-green-50 p-5">
            <h2 className="text-lg font-semibold text-green-800">
              ✓ Payment Completed
            </h2>

            <p className="mt-1 text-sm text-green-700">
              Your payment was successful.
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Field label="Paid Amount" value={request.payment?.amount} />
              <Field
                label="Transaction ID"
                value={request.payment?.transactionId}
              />
              <Field
                label="Payment Provider"
                value={request.payment?.provider}
              />
              <Field
                label="Payment Date"
                value={formatDate(request.payment?.paidAt)}
              />
            </div>
          </section>
        )}

        {/* Zone information */}
        {zone && (
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">
              Zone Information
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Field label="Zone ID" value={zone.id} />
              <Field label="Zone Name" value={zone.name} />
              <Field label="Zone Code" value={zone.code} />
              <Field label="Area" value={zone.area} />
              <Field label="Location" value={zone.location} />
              <Field label="Feeder" value={zone.feeder} />
              <Field label="Substation" value={zone.substation} />
            </div>
          </section>
        )}

        {/* Actions */}
        <section className="flex flex-wrap items-center gap-3 rounded-xl border bg-white p-5 shadow-sm">
          {!isPaymentPaid && request.status === "PENDING" && (
            <Button
              onClick={handleCancel}
              disabled={cancelPending || paymentPending}
            >
              {cancelPending ? "Canceling..." : "Cancel Service Request"}
            </Button>
          )}

          {!isPaymentPaid && request.status === "CONFIRMED" && (
            <Button
              onClick={handlePayment}
              disabled={paymentPending || cancelPending || countdown > 0}
            >
              {paymentPending
                ? "Creating Payment..."
                : countdown > 0
                  ? `Pay Again in ${countdown}s`
                  : "Pay Now By BKASH"}
            </Button>
          )}

          {/* Fallback when the browser blocks the popup */}
          {!isPaymentPaid && paymentUrl && (
            <a
              href={paymentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md bg-pink-600 px-4 py-2 text-sm font-medium text-white hover:bg-pink-700"
            >
              Continue to bKash Payment
            </a>
          )}

          {!isPaymentPaid &&
            !["PENDING", "CONFIRMED"].includes(request.status) && (
              <p className="text-sm text-gray-500">
                No actions available for this request status.
              </p>
            )}
        </section>
      </div>
    </div>
  );
};

export default SiglgeServiceRequest;
