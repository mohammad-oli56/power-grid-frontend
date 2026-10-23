
"use client";

import { toast } from "@/components/ui/toast";
import { useCreateOutage, useGetAllZoneCoustomer } from "@/hooks/coustomer.hooks";

import { useForm } from "@tanstack/react-form";

type Priority = "LOW" | "MEDIUM" | "HIGH";

const CreateOutageFrom = () => {
  const {
    data,
    isPending: zonesLoading,
    isError: zonesError,
  } = useGetAllZoneCoustomer();

  const {
    mutateAsync,
    isPending: isCreating,
    isError: createError,
    error: mutationError,
  } = useCreateOutage();

  const form = useForm({
    defaultValues: {
      zoneId: "",
      title: "",
      description: "",
      priority: "MEDIUM" as Priority,
    },

    onSubmit: async ({ value }) => {
      try {
        const result = await mutateAsync(value);
        if(result.success){
             toast.add({
            type: "success",
            description: "Event has been created.",
          })
        }

        
        form.reset();
      } catch (error) {
        console.error(
          "Failed to create outage:",
          error instanceof Error ? error.message : error
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

  const zones = data?.data ?? [];

  return (
    <div className="mx-auto max-w-2xl p-6">
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h1 className="mb-6 text-2xl font-bold">Create Outage</h1>

        {createError && (
          <p className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600">
            {mutationError instanceof Error
              ? mutationError.message
              : "Failed to create outage"}
          </p>
        )}

        <form
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-5"
        >
          {/* Zone selection */}
          <form.Field
            name="zoneId"
            validators={{
              onChange: ({ value }) =>
                !value ? "Please select a zone" : undefined,
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <label htmlFor={field.name} className="block font-medium">
                  Select Zone
                </label>

                <select
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  className="w-full rounded-md border p-3"
                >
                  <option value="">Choose a zone</option>

                  {zones.map(
                    (zone: {
                      id: string;
                      name: string;
                      code: string;
                    }) => (
                      <option key={zone.id} value={zone.id}>
                        {zone.name} ({zone.code})
                      </option>
                    )
                  )}
                </select>

                {field.state.meta.isTouched &&
                  field.state.meta.errors.map((error) => (
                    <p key={error} className="text-sm text-red-500">
                      {error}
                    </p>
                  ))}
              </div>
            )}
          </form.Field>

          {/* Title */}
          <form.Field
            name="title"
            validators={{
              onChange: ({ value }) =>
                !value.trim() ? "Title is required" : undefined,
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <label htmlFor={field.name} className="block font-medium">
                  Outage Title
                </label>

                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="Power outage in Gulshan Zone"
                  className="w-full rounded-md border p-3"
                />

                {field.state.meta.isTouched &&
                  field.state.meta.errors.map((error) => (
                    <p key={error} className="text-sm text-red-500">
                      {error}
                    </p>
                  ))}
              </div>
            )}
          </form.Field>

          {/* Description */}
          <form.Field
            name="description"
            validators={{
              onChange: ({ value }) =>
                !value.trim() ? "Description is required" : undefined,
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <label htmlFor={field.name} className="block font-medium">
                  Description
                </label>

                <textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="Describe the power outage..."
                  rows={4}
                  className="w-full rounded-md border p-3"
                />

                {field.state.meta.isTouched &&
                  field.state.meta.errors.map((error) => (
                    <p key={error} className="text-sm text-red-500">
                      {error}
                    </p>
                  ))}
              </div>
            )}
          </form.Field>

          {/* Priority */}
          <form.Field name="priority">
            {(field) => (
              <div className="space-y-2">
                <label htmlFor={field.name} className="block font-medium">
                  Priority
                </label>

                <select
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(event) =>
                    field.handleChange(event.target.value as Priority)
                  }
                  className="w-full rounded-md border p-3"
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </select>
              </div>
            )}
          </form.Field>

          {/* Submit */}
          <button
            type="submit"
            disabled={isCreating}
            className="w-full rounded-md bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isCreating ? "Creating Outage..." : "Create Outage"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateOutageFrom;
