"use client";

import { useForm } from "@tanstack/react-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useCreateStaff } from "@/hooks/admin.hooks";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

const SPECIALIZATIONS = [
  "Electrical Power Systems",
  "Generator Installation & Maintenance",
  "Substation & Transformer Maintenance",
  "UPS & Battery Backup Systems",
  "Solar Power Systems",
  "Electrical Wiring & Distribution",
  "Power System Protection & Control",
] as const;

const ROLES = ["ADMIN", "POWER_OPERATOR", "TECHNICIAN"] as const;

type StaffRole = (typeof ROLES)[number];

export function CreateStaffForm() {
  const { mutateAsync, isPending } = useCreateStaff();
  const router = useRouter()

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      role: "POWER_OPERATOR" as StaffRole,
      employeeId: "PWR-",
      specialization: "",
    },

    onSubmit: async ({ value }) => {
      const payload = {
        name: value.name.trim(),
        email: value.email.trim(),
        password: value.password,
        phone: value.phone.trim(),
        role: value.role,
        ...(value.role === "TECHNICIAN"
          ? {
              employeeId: value.employeeId.trim(),
              specialization: value.specialization,
            }
          : {}),
      };

      try {
        const result = await mutateAsync(payload);
         if (result.success) {
          toast.add({
            type: "success",
            description: "staff created successfully.",
          });

          // Clear all form values after successful creation
          form.reset();
          router.push("/admin-dashboard/all-users")
        } else {
          toast.add({
            type: "error",
            description:
              result.message || "The zone could not be created.",
            priority: "high",
          });
        }
      } catch (error) {
        console.error("Failed to create staff:", error);
      }
    },
  });

  return (
    <div className="mx-auto w-full max-w-3xl rounded-xl border bg-background p-6 shadow-sm sm:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold tracking-tight">Create Staff</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Add a new staff member to your administration team.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          {/* Name */}
          <form.Field
            name="name"
            validators={{
              onBlur: ({ value }) =>
                !value.trim() ? "Name is required" : undefined,
            }}
          >
            {(field) => {
              const invalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={invalid}>
                  <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={invalid}
                    placeholder="Enter full name"
                    autoComplete="name"
                  />
                  {invalid && (
                    <FieldError
                      errors={field.state.meta.errors.map((message) => ({
                        message,
                      }))}
                    />
                  )}
                </Field>
              );
            }}
          </form.Field>

          {/* Email */}
          <form.Field
            name="email"
            validators={{
              onBlur: ({ value }) => {
                if (!value.trim()) return "Email is required";
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                  return "Enter a valid email address";
                }
                return undefined;
              },
            }}
          >
            {(field) => {
              const invalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={invalid}>
                  <FieldLabel htmlFor={field.name}>Email Address</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={invalid}
                    placeholder="staff@example.com"
                    autoComplete="email"
                  />
                  {invalid && (
                    <FieldError
                      errors={field.state.meta.errors.map((message) => ({
                        message,
                      }))}
                    />
                  )}
                </Field>
              );
            }}
          </form.Field>

          {/* Password */}
          <form.Field
            name="password"
            validators={{
              onBlur: ({ value }) =>
                value.length < 8
                  ? "Password must be at least 8 characters"
                  : undefined,
            }}
          >
            {(field) => {
              const invalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={invalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="password"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={invalid}
                    placeholder="Minimum 8 characters"
                    autoComplete="new-password"
                  />
                  {invalid && (
                    <FieldError
                      errors={field.state.meta.errors.map((message) => ({
                        message,
                      }))}
                    />
                  )}
                </Field>
              );
            }}
          </form.Field>

          {/* Phone */}
          <form.Field
            name="phone"
            validators={{
              onBlur: ({ value }) =>
                !value.trim() ? "Phone number is required" : undefined,
            }}
          >
            {(field) => {
              const invalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={invalid}>
                  <FieldLabel htmlFor={field.name}>Phone Number</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="tel"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={invalid}
                    placeholder="01709876545"
                    autoComplete="tel"
                  />
                  {invalid && (
                    <FieldError
                      errors={field.state.meta.errors.map((message) => ({
                        message,
                      }))}
                    />
                  )}
                </Field>
              );
            }}
          </form.Field>

          {/* Role */}
          <form.Field name="role">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Staff Role</FieldLabel>
                <select
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) =>
                    field.handleChange(e.target.value as StaffRole)
                  }
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                >
                  {ROLES.map((role) => (
                    <option key={role} value={role}>
                      {role.replaceAll("_", " ")}
                    </option>
                  ))}
                </select>
              </Field>
            )}
          </form.Field>

          {/* Technician-only fields */}
          <form.Subscribe selector={(state) => state.values.role}>
            {(role) =>
              role === "TECHNICIAN" ? (
                <div className="space-y-5 rounded-lg border border-dashed p-4">
                  <div>
                    <h3 className="font-medium">Technician Details</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      These fields are required for technicians only.
                    </p>
                  </div>

                  {/* Employee ID */}
                  <form.Field
                    name="employeeId"
                    validators={{
                      onBlur: ({ value }) =>
                        !value.trim()
                          ? "Employee ID is required for technicians"
                          : undefined,
                    }}
                  >
                    {(field) => {
                      const invalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;

                      return (
                        <Field data-invalid={invalid}>
                          <FieldLabel htmlFor={field.name}>
                            Employee ID
                          </FieldLabel>
                          <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            aria-invalid={invalid}
                            placeholder="e.g. PWR-***"
                          />
                          {invalid && (
                            <FieldError
                              errors={field.state.meta.errors.map(
                                (message) => ({ message }),
                              )}
                            />
                          )}
                        </Field>
                      );
                    }}
                  </form.Field>

                  {/* Specialization */}
                  <form.Field
                    name="specialization"
                    validators={{
                      onBlur: ({ value }) =>
                        !value ? "Please select a specialization" : undefined,
                    }}
                  >
                    {(field) => {
                      const invalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;

                      return (
                        <Field data-invalid={invalid}>
                          <FieldLabel htmlFor={field.name}>
                            Specialization
                          </FieldLabel>
                          <select
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            aria-invalid={invalid}
                            className="flex min-h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                          >
                            <option value="">Select specialization</option>
                            {SPECIALIZATIONS.map((item) => (
                              <option key={item} value={item}>
                                {item}
                              </option>
                            ))}
                          </select>
                          {invalid && (
                            <FieldError
                              errors={field.state.meta.errors.map(
                                (message) => ({ message }),
                              )}
                            />
                          )}
                        </Field>
                      );
                    }}
                  </form.Field>
                </div>
              ) : null
            }
          </form.Subscribe>
        </FieldGroup>

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? "Creating Staff..." : "Create Staff"}
          </button>
        </div>
      </form>
    </div>
  );
}
