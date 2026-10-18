"use client"

import { getAllNotification } from "@/app/(dashboard)/(coustomer)/_action/getAllNotification";
import { getAllschedule } from "@/app/(dashboard)/(coustomer)/_action/getAllSchedule";
import { useQuery } from "@tanstack/react-query";

export function useScheduleGet() {
  return useQuery({
    queryKey: ["schedule"],
    queryFn: getAllschedule,
  });
}


