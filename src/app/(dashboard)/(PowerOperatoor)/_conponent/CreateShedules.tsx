
"use client";

import React from "react";
import { useForm } from "@tanstack/react-form";
import { useZone, useCreateSchedule } from "@/hooks/poweroperator.hooks";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

type Zone = {
  id: string;
  name: string;
  code?: string;
};

const CreateSchedules = () => {
  const {
    data: zoneData,
    isPending: zonesLoading,
    isError: zonesError,
    error: zoneError,
  } = useZone();

  const { mutateAsync, isPending: isCreating } = useCreateSchedule();
  const router = useRouter()
  

  const zones: Zone[] = Array.isArray(zoneData?.data?.data)
    ? zoneData.data.data
    : Array.isArray(zoneData?.data)
      ? zoneData.data
      : Array.isArray(zoneData)
        ? zoneData
        : [];

  const form = useForm({
    defaultValues: {
      zoneId: "",
      startTime: "",
      endTime: "",
      reason: "",
    },

    onSubmit: async ({ value }) => {
      try {
        if (!value.zoneId) {
          toast.add({
            type: "error",
            description: "Please select a zone.",
            priority: "high",
          });
          
        }

        if (
          !value.startTime ||
          !value.endTime ||
          new Date(value.endTime) <= new Date(value.startTime)
        ) {
          toast.add({
            type: "error",
            description: "End time must be later than start time.",
            priority: "high",
          });
          return;
        }

        // datetime-local values are local wall-clock times.
        // The API example uses Bangladesh time (+06:00).
        const toDhakaISO = (dateTime: string) => `${dateTime}:00+06:00`;

        const payload = {
          zoneId: value.zoneId,
          startTime: toDhakaISO(value.startTime),
          endTime: toDhakaISO(value.endTime),
          reason: value.reason.trim(),
        };

        const result = await mutateAsync(payload);

        if (result?.success) {
          toast.add({
            type: "success",
            description: result.message || "Schedule created successfully.",
          });

          
          router.push("/power-operator-dashboard/schedules")
        } else {
          toast.add({
            type: "error",
            description: result?.message || "Failed to create schedule.",
            priority: "high",
          });
        }
      } catch (error) {
        toast.add({
          type: "error",
          description:
            error instanceof Error
              ? error.message
              : "Something went wrong while creating the schedule.",
          priority: "high",
        });
      }
    },
  });

  if (zonesError) {
    return (
      <div className="m-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        {zoneError instanceof Error
          ? zoneError.message
          : "Failed to load zones."}
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl p-3 sm:p-6">
      <div className="rounded-xl border bg-white p-4 shadow-sm sm:p-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Create Schedule
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Select a zone and enter the schedule details.
        </p>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            void form.handleSubmit();
          }}
          className="mt-6 space-y-5"
        >
          {/* Zone dropdown */}
          <form.Field name="zoneId">
            {(field) => (
              <div className="space-y-2">
                <label
                  htmlFor={field.name}
                  className="text-sm font-medium text-gray-700"
                >
                  Select Zone
                </label>

                <select
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) =>
                    field.handleChange(event.target.value)
                  }
                  disabled={zonesLoading || isCreating || zones.length === 0}
                  required
                  className="w-full rounded-md border bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100"
                >
                  <option value="">
                    {zonesLoading ? "Loading zones..." : "Choose a zone"}
                  </option>

                  {zones.map((zone) => (
                    <option key={zone.id} value={zone.id}>
                      {zone.name}
                      {zone.code ? ` (${zone.code})` : ""}
                    </option>
                  ))}
                </select>

                {zones.length === 0 && !zonesLoading && (
                  <p className="text-xs text-red-600">
                    No zones available. Please create a zone first.
                  </p>
                )}
              </div>
            )}
          </form.Field>

          {/* Start time */}
          <form.Field name="startTime">
            {(field) => (
              <div className="space-y-2">
                <label
                  htmlFor={field.name}
                  className="text-sm font-medium text-gray-700"
                >
                  Start Time
                </label>

                <input
                  id={field.name}
                  name={field.name}
                  type="datetime-local"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) =>
                    field.handleChange(event.target.value)
                  }
                  disabled={isCreating}
                  required
                  className="w-full min-w-0 rounded-md border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </form.Field>

          {/* End time */}
          <form.Field name="endTime">
            {(field) => (
              <div className="space-y-2">
                <label
                  htmlFor={field.name}
                  className="text-sm font-medium text-gray-700"
                >
                  End Time
                </label>

                <input
                  id={field.name}
                  name={field.name}
                  type="datetime-local"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) =>
                    field.handleChange(event.target.value)
                  }
                  disabled={isCreating}
                  required
                  className="w-full min-w-0 rounded-md border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </form.Field>

          {/* Reason */}
          <form.Field name="reason">
            {(field) => (
              <div className="space-y-2">
                <label
                  htmlFor={field.name}
                  className="text-sm font-medium text-gray-700"
                >
                  Reason
                </label>

                <textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) =>
                    field.handleChange(event.target.value)
                  }
                  placeholder="e.g. Repair line"
                  rows={3}
                  required
                  disabled={isCreating}
                  className="w-full resize-y rounded-md border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </form.Field>

          <Button
            type="submit"
            disabled={isCreating || zonesLoading || zones.length === 0}
            className="w-full"
          >
            {isCreating ? "Creating Schedule..." : "Create Schedule"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateSchedules;
