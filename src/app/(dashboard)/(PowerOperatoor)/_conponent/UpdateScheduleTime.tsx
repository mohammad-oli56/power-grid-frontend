"use client";

import { useEffect, useState } from "react";

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
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateScheduleTime } from "@/hooks/poweroperator.hooks";

type UpdateData = {
  id: string;
  startTime: string;
  endTime: string;
};

type DialogDemoProps = {
  data: UpdateData;
};

function toLocalDateTime(value: string) {
  const date = new Date(value);
  const offset = date.getTimezoneOffset() * 60000;

  return new Date(date.getTime() - offset)
    .toISOString()
    .slice(0, 16);
}

export function DialogDemo({ data }: DialogDemoProps) {
  const { mutate, isPending, isSuccess, isError, error } =
    useUpdateScheduleTime(data.id);

  const [open, setOpen] = useState(false);
  const [startTime, setStartTime] = useState(
    toLocalDateTime(data.startTime)
  );
  const [endTime, setEndTime] = useState(
    toLocalDateTime(data.endTime)
  );
  const [validationError, setValidationError] = useState("");

  // Reset the fields whenever the dialog opens with current schedule data.
  useEffect(() => {
    if (open) {
      setStartTime(toLocalDateTime(data.startTime));
      setEndTime(toLocalDateTime(data.endTime));
      setValidationError("");
    }
  }, [open, data.startTime, data.endTime]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidationError("");

    if (!startTime || !endTime) {
      setValidationError("Please select both start and end times.");
      return;
    }

    if (new Date(endTime) <= new Date(startTime)) {
      setValidationError("End time must be after start time.");
      return;
    }

    mutate(
      {
        startTime: new Date(startTime).toISOString(),
        endTime: new Date(endTime).toISOString(),
      },
      {
        onSuccess: () => {
          setOpen(false);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="outline" />}>
        Update Schedule
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Update Schedule Time</DialogTitle>
            <DialogDescription>
              Change the start and end times for this schedule.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="my-5">
            <Field>
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </Field>

            <Field>
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </Field>
          </FieldGroup>

          {validationError && (
            <p className="mb-3 text-sm text-red-500">
              {validationError}
            </p>
          )}

          {isError && (
            <p className="mb-3 text-sm text-red-500">
              {error?.message || "Failed to update schedule."}
            </p>
          )}

          {isSuccess && (
            <p className="mb-3 text-sm text-green-600">
              Schedule updated successfully!
            </p>
          )}

          <DialogFooter>
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="outline"
                  disabled={isPending}
                >
                  Cancel
                </Button>
              }
            />

            <Button type="submit" disabled={isPending}>
              {isPending ? "Updating..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}