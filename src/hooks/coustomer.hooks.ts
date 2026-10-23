"use client"

import { createOutage } from "@/app/(dashboard)/(coustomer)/_action/createOutage";
import { getAllNotification } from "@/app/(dashboard)/(coustomer)/_action/getAllNotification";
import { getAllschedule } from "@/app/(dashboard)/(coustomer)/_action/getAllSchedule";
import { getAllZone } from "@/app/(dashboard)/(coustomer)/_action/getAllZone";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useScheduleGet() {
  return useQuery({
    queryKey: ["schedule"],
    queryFn: getAllschedule,
  });
}


export function useGetAllZoneCoustomer() {
  return useQuery({
    queryKey: ["coustomerZone"],
    queryFn: getAllZone,
  });
}

export function useCreateOutage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOutage,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["outagedata"],
      });
    },
  });
}

