
"use client";

import React from "react";
import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useCreateZones } from "@/hooks/poweroperator.hooks";
import { useRouter } from "next/navigation";

const CreateZone = () => {
  const { mutateAsync, isPending } = useCreateZones();
    const routet =  useRouter()
  const form = useForm({
    defaultValues: {
      name: "",
      code: "",
      substation: "",
      feeder: "",
      area: "",
      location: "",
    },

    onSubmit: async ({ value }) => {
      try {
        const result = await mutateAsync(value);

        if (result.success) {
          toast.add({
            type: "success",
            description: "Zone has been created successfully.",
          });

          // Clear all form values after successful creation
          form.reset();
          routet.push("/power-operator-dashboard/zones")
        } else {
          toast.add({
            type: "error",
            description:
              result.message || "The zone could not be created.",
            priority: "high",
          });
        }
      } catch (error) {
        toast.add({
          type: "error",
          description:
            error instanceof Error
              ? error.message
              : "The zone could not be created.",
          priority: "high",
        });
      }
    },
  });

  return (
    <div className="mx-auto rounded-xl border p-6 shadow-sm">
      <h1 className="mb-6 text-2xl font-bold">Create Zone</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void form.handleSubmit();
        }}
        className="space-y-5"
      >
        {(
          [
            ["name", "Zone Name", "Enter zone name"],
            ["code", "Zone Code", "DHK-BAD-01"],
            ["substation", "Substation", "Enter substation name"],
            ["feeder", "Feeder", "BAD-F-101"],
            ["area", "Area", "Enter area"],
            ["location", "Location", "Enter location"],
          ] as const
        ).map(([name, label, placeholder]) => (
          <form.Field key={name} name={name}>
            {(field) => (
              <div className="space-y-2">
                <label
                  htmlFor={field.name}
                  className="text-sm font-medium"
                >
                  {label}
                </label>

                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder={placeholder}
                  required
                  disabled={isPending}
                  className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                />
              </div>
            )}
          </form.Field>
        ))}

        <Button
          type="submit"
          className="w-full"
          disabled={isPending}
        >
          {isPending ? "Creating Zone..." : "Create Zone"}
        </Button>
      </form>
    </div>
  );
};

export default CreateZone;
