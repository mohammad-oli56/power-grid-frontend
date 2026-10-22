
"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  useDeleteuser,
  useSingleUserInfo,
  useUpdateUserStatus,
} from "@/hooks/admin.hooks";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

type UserStatus = "ACTIVE" | "BLOCKED";

const SingleUserInfo = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const {
    data,
    isPending,
    isError,
  } = useSingleUserInfo(id);

  const {
    mutateAsync: updateStatus,
    isPending: isUpdatingStatus,
  } = useUpdateUserStatus(id);

  const {
    mutateAsync: deleteUserMutation,
    isPending: isDeleting,
  } = useDeleteuser();

  if (isPending) {
    return (
      <p className="p-6 text-center">
        Loading user information...
      </p>
    );
  }

  if (isError) {
    return (
      <p className="p-6 text-center text-red-500">
        Failed to load user information.
      </p>
    );
  }

  const user = data?.data;

  if (!user) {
    return (
      <p className="p-6 text-center">
        User information not found.
      </p>
    );
  }

  const handleUpdateStatus = async (status: UserStatus) => {
    if (user.status === status) return;

    try {
      const result = await updateStatus({ status });

      if (result?.success) {
        toast.add({
          type: "success",
          description:
            result.message ||
            `User status updated to ${status}.`,
        });
      } else {
        toast.add({
          type: "error",
          description:
            result?.message || "Failed to update user status.",
        });
      }
    } catch (error) {
      toast.add({
        type: "error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to update user status.",
      });
    }
  };

  const handleDeleteUser = async () => {
    try {
      const result = await deleteUserMutation(user.id);

      if (result?.success) {
        toast.add({
          type: "success",
          description:
            result.message || "User deleted successfully.",
        });

        setDeleteDialogOpen(false);
        router.push("/admin-dashboard/all-users");
      } else {
        toast.add({
          type: "error",
          description:
            result?.message || "Failed to delete user.",
        });
      }
    } catch (error) {
      toast.add({
        type: "error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to delete user.",
      });
    }
  };

  const userInfo = [
    { label: "Full Name", value: user.name },
    { label: "Email", value: user.email },
    { label: "Phone", value: user.phone },
    { label: "Account Number", value: user.accountNumber },
    { label: "Address", value: user.address },
    { label: "Role", value: user.role },
    { label: "Status", value: user.status },
    {
      label: "Active",
      value: user.isActive ? "Yes" : "No",
    },
    {
      label: "Email Verified",
      value: user.emailVerified ? "Yes" : "No",
    },
    { label: "Provider", value: user.provider },
    { label: "Google ID", value: user.googleid ?? "N/A" },
    {
      label: "Profile Photo",
      value: user.profilePhoto ?? "N/A",
    },
    {
      label: "Created At",
      value: formatDate(user.createdAt),
    },
    {
      label: "Updated At",
      value: formatDate(user.updatedAt),
    },
    {
      label: "Deleted At",
      value: formatDate(user.deletedAt),
    },
  ];

  const nextStatus: UserStatus =
    user.status === "ACTIVE" ? "BLOCKED" : "ACTIVE";

  return (
    <div className="mx-auto w-full max-w-5xl p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          User Information
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          View complete details for this customer.
        </p>
      </div>

      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-3 border-b pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold">
              {user.name}
            </h2>

            <p className="text-sm text-muted-foreground">
              {user.email}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
              {user.role}
            </span>

            <span
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                user.status === "ACTIVE"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {user.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {userInfo.map((item) => (
            <div
              key={item.label}
              className="rounded-lg bg-muted/50 p-4"
            >
              <p className="mb-1 text-sm text-muted-foreground">
                {item.label}
              </p>

              <p className="break-words font-medium">
                {item.value ?? "N/A"}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 border-t pt-4">
          <p className="break-all text-xs text-muted-foreground">
            User ID: {user.id}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button
            type="button"
            disabled={isUpdatingStatus || isDeleting}
            variant={
              user.status === "ACTIVE"
                ? "destructive"
                : "default"
            }
            onClick={() => handleUpdateStatus(nextStatus)}
          >
            {isUpdatingStatus
              ? "Updating..."
              : user.status === "ACTIVE"
                ? "Block User"
                : "Activate User"}
          </Button>

          <Dialog
            open={deleteDialogOpen}
            onOpenChange={(open) => {
              if (!isDeleting) {
                setDeleteDialogOpen(open);
              }
            }}
          >
            <DialogTrigger
              render={
                <Button
                  type="button"
                  variant="destructive"
                  disabled={isDeleting || isUpdatingStatus}
                >
                  Delete User
                </Button>
              }
            />

            <DialogContent showCloseButton={!isDeleting}>
              <DialogHeader>
                <DialogTitle>
                  Are you absolutely sure?
                </DialogTitle>

                <DialogDescription>
                  You are about to delete{" "}
                  <span className="font-semibold text-foreground">
                    {user.name}
                  </span>
                  . This action may not be reversible. Are you sure
                  you want to continue?
                </DialogDescription>
              </DialogHeader>

              <DialogFooter>
                <DialogClose
                  render={
                    <Button
                      type="button"
                      variant="outline"
                      disabled={isDeleting}
                    >
                      Cancel
                    </Button>
                  }
                />

                <Button
                  type="button"
                  variant="destructive"
                  disabled={isDeleting}
                  onClick={handleDeleteUser}
                >
                  {isDeleting
                    ? "Deleting..."
                    : "Yes, Delete User"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

function formatDate(date: string | null | undefined) {
  if (!date) return "N/A";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "N/A";
  }

  return parsedDate.toLocaleString("en-BD", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default SingleUserInfo;
