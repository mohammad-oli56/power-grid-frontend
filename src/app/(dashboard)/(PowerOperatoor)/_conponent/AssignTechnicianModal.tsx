"use client";

import { Button } from "@/components/ui/button";
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
  useTechnicianGet,
  useAssigneTechnician,
} from "@/hooks/poweroperator.hooks";
import { useState } from "react";
import {
  UserRound,
  Phone,
  CheckCircle2,
  XCircle,
  Users,
  Loader2,
} from "lucide-react";

type Technician = {
  id: string;
  status?: string;
  user?: {
    name?: string;
    phone?: string;
    isActive?: boolean;
  };
};

type AssignTechnicianModalProps = {
  id: string; // Outage ID
};

export function AssignTechnicianModal({
  id,
}: AssignTechnicianModalProps) {
  const { data, isPending, isError, error } = useTechnicianGet();

  const [selectedTechnician, setSelectedTechnician] = useState<string | null>(
    null,
  );

  const {
    mutate: assignTechnician,
    isPending: isAssigning,
    isError: isAssignError,
    error: assignError,
    isSuccess: isAssignSuccess,
  } = useAssigneTechnician(id);

  const technicians: Technician[] = Array.isArray(data?.data?.data)
    ? data.data.data
    : Array.isArray(data?.data)
      ? data.data
      : Array.isArray(data)
        ? data
        : [];

  const selectedTechnicianData = technicians.find(
    (technician) => technician.id === selectedTechnician,
  );

  const canAssign =
    selectedTechnicianData?.status === "AVAILABLE" &&
    selectedTechnicianData?.user?.isActive === true;

  const handleAssign = () => {
    if (!selectedTechnician || !canAssign || isAssigning) return;

    assignTechnician(selectedTechnician, {
      onSuccess: () => {
        setSelectedTechnician(null);
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger render={<Button>Assign Technician</Button>} />

      <DialogContent className="max-h-[85vh] overflow-y-auto rounded-2xl border-slate-200 p-0 sm:max-w-lg">
        <DialogHeader className="border-b border-slate-100 bg-slate-50/80 p-6">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <Users className="h-6 w-6" />
          </div>

          <DialogTitle className="text-xl font-bold text-slate-900">
            Assign Technician
          </DialogTitle>

          <DialogDescription className="text-sm text-slate-500">
            Select an active, available technician for this power outage.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 p-5">
          {isPending ? (
            <div className="flex items-center justify-center gap-2 py-10 text-sm text-slate-500">
              <Loader2 className="h-5 w-5 animate-spin" />
              Loading technicians...
            </div>
          ) : isError ? (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
              {error instanceof Error
                ? error.message
                : "Failed to load technicians."}
            </div>
          ) : technicians.length === 0 ? (
            <div className="py-10 text-center text-sm text-slate-500">
              No technicians found.
            </div>
          ) : (
            technicians.map((technician) => {
              const isSelected = selectedTechnician === technician.id;
              const isAvailable = technician.status === "AVAILABLE";
              const isActive = technician.user?.isActive === true;
              const isSelectable = isAvailable && isActive;

              return (
                <button
                  key={technician.id}
                  type="button"
                  disabled={!isSelectable || isAssigning}
                  onClick={() => setSelectedTechnician(technician.id)}
                  className={`w-full rounded-xl border p-4 text-left transition-all ${
                    !isSelectable
                      ? "cursor-not-allowed border-slate-200 bg-slate-100 opacity-60"
                      : isSelected
                        ? "border-blue-500 bg-blue-50/70 ring-2 ring-blue-100"
                        : "border-slate-200 bg-white hover:border-blue-200 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                      <UserRound className="h-5 w-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="font-semibold text-slate-900">
                          {technician.user?.name ?? "Unknown Technician"}
                        </h3>

                        {isSelected && (
                          <CheckCircle2 className="h-5 w-5 text-blue-600" />
                        )}
                      </div>

                      <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                        <Phone className="h-3.5 w-3.5" />
                        {technician.user?.phone ?? "No phone number"}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                            isAvailable
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {technician.status ?? "UNKNOWN"}
                        </span>

                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                            isActive
                              ? "bg-blue-50 text-blue-700"
                              : "bg-red-50 text-red-700"
                          }`}
                        >
                          {isActive ? (
                            <CheckCircle2 className="h-3 w-3" />
                          ) : (
                            <XCircle className="h-3 w-3" />
                          )}
                          {isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })
          )}

          {isAssignError && (
            <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {assignError instanceof Error
                ? assignError.message
                : "Failed to assign technician."}
            </p>
          )}

          {isAssignSuccess && (
            <p className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">
              Technician assigned successfully!
            </p>
          )}
        </div>

        <DialogFooter className="border-t border-slate-100 bg-slate-50/70 p-5 sm:justify-between">
          <DialogClose
            render={
              <Button variant="outline" disabled={isAssigning}>
                Cancel
              </Button>
            }
          />

          <Button
            disabled={!canAssign || isAssigning}
            onClick={handleAssign}
          >
            {isAssigning ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Assigning...
              </>
            ) : (
              "Confirm Assignment"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}