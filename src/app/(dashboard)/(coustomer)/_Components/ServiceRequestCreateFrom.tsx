"use client";

import { toast } from "@/components/ui/toast";
import { useCreateServiceRequest, useGetAllZoneCoustomer } from "@/hooks/coustomer.hooks";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SERVICE_TYPES = [
  { value: "METER_INSPECTION", price: 499 },
  { value: "METER_REPLACEMENT", price: 999 },
  { value: "NEW_CONNECTION", price: 1499 },
  { value: "METER_RELOCATION", price: 799 },
  { value: "EMERGENCY_METER_CHECK", price: 599 },
  { value: "LOAD_INCREASE_REQUEST", price: 1299 },
  { value: "LOAD_DECREASE_REQUEST", price: 699 },
  { value: "ELECTRICAL_WIRING_INSPECTION", price: 899 },
  { value: "CONNECTION_DISCONNECTION", price: 599 },
  { value: "POWER_QUALITY_INSPECTION", price: 1099 },
] as const;

const ServiceRequestCreateFrom = () => {
  const [submitError, setSubmitError] = useState("");
  const router = useRouter()

  const {
    data,
    isPending: zonesLoading,
    isError: zonesError,
  } = useGetAllZoneCoustomer();

  const {
    mutateAsync,
    isPending,
  } = useCreateServiceRequest();

  const zones = data?.data ?? [];

  const form = useForm({
    defaultValues: {
      zoneId: "",
      type: "",
      description: "",
    },

    onSubmit: async ({ value }) => {
      setSubmitError("");

      try {
        const result = await mutateAsync({
          zoneId: value.zoneId,
          type: value.type,
          description: value.description.trim(),
        });

        if(result.success){
             toast.add({
            type: "success",
            description: "Event has been created.",
          })
          router.push("/coustomer-dashboard/my-service-request")
        }
      } catch (error) {
        setSubmitError(
          error instanceof Error
            ? error.message
            : "Failed to create service request."
        );
      }
    },
  });

  if (zonesLoading) {
    return <p className="p-6">Loading zones...</p>;
  }

  if (zonesError) {
    return (
      <p className="p-6 text-red-500">
        Failed to load zones. Please try again.
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h1 className="mb-2 text-2xl font-bold text-gray-800">
          Create Service Request
        </h1>

        <p className="mb-6 text-sm text-gray-500">
          Select your zone and service type, then describe your issue.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-5"
        >
          {/* Zone dropdown */}
          <form.Field
            name="zoneId"
            validators={{
              onChange: ({ value }) =>
                value ? undefined : "Please select a zone.",
            }}
          >
            {(field) => (
              <div>
                <label
                  htmlFor="zoneId"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Select Zone
                </label>

                <select
                  id="zoneId"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm outline-none focus:border-blue-500"
                  required
                >
                  <option value="">Choose a zone</option>

                  {zones.map((zone: { id: string; name: string }) => (
                    <option key={zone.id} value={zone.id}>
                      {zone.name}
                    </option>
                  ))}
                </select>

                {field.state.meta.errors.length > 0 && (
                  <p className="mt-1 text-sm text-red-500">
                    {field.state.meta.errors.join(", ")}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          {/* Service type dropdown */}
          <form.Field
            name="type"
            validators={{
              onChange: ({ value }) =>
                value ? undefined : "Please select a service type.",
            }}
          >
            {(field) => {
              const selectedService = SERVICE_TYPES.find(
                (service) => service.value === field.state.value
              );

              return (
                <div>
                  <label
                    htmlFor="type"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Service Type
                  </label>

                  <select
                    id="type"
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm outline-none focus:border-blue-500"
                    required
                  >
                    <option value="">Choose a service</option>

                    {SERVICE_TYPES.map((service) => (
                      <option
                        key={service.value}
                        value={service.value}
                      >
                        {service.value.replaceAll("_", " ")} — ৳
                        {service.price}
                      </option>
                    ))}
                  </select>

                  {selectedService && (
                    <p className="mt-2 text-sm text-gray-600">
                      Estimated price:{" "}
                      <span className="font-semibold text-blue-600">
                        ৳{selectedService.price}
                      </span>
                    </p>
                  )}

                  {field.state.meta.errors.length > 0 && (
                    <p className="mt-1 text-sm text-red-500">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  )}
                </div>
              );
            }}
          </form.Field>

          {/* Description */}
          <form.Field
            name="description"
            validators={{
              onChange: ({ value }) =>
                value.trim().length === 0
                  ? "Please enter a description."
                  : undefined,
            }}
          >
            {(field) => (
              <div>
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Description
                </label>

                <textarea
                  id="description"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Describe your service request..."
                  rows={4}
                  required
                  className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm outline-none focus:border-blue-500"
                />

                {field.state.meta.errors.length > 0 && (
                  <p className="mt-1 text-sm text-red-500">
                    {field.state.meta.errors.join(", ")}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          {submitError && (
            <p role="alert" className="text-sm text-red-600">
              {submitError}
            </p>
          )}

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <button
                type="submit"
                disabled={!canSubmit || isSubmitting || isPending}
                className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isPending || isSubmitting
                  ? "Creating Request..."
                  : "Create Service Request"}
              </button>
            )}
          </form.Subscribe>
        </form>
      </div>
    </div>
  );
};

export default ServiceRequestCreateFrom;