"use client"

import { cancelOutageCoustomer } from "@/app/(dashboard)/(coustomer)/_action/cancelOutage";
import { createOutage } from "@/app/(dashboard)/(coustomer)/_action/createOutage";
import { getAllNotification } from "@/app/(dashboard)/(coustomer)/_action/getAllNotification";
import { getAllschedule } from "@/app/(dashboard)/(coustomer)/_action/getAllSchedule";
import { getAllZone } from "@/app/(dashboard)/(coustomer)/_action/getAllZone";
import { getAllOutageCoustomer } from "@/app/(dashboard)/(coustomer)/_action/getAlOutage";
import { getAllSingleOutageCoustomer } from "@/app/(dashboard)/(coustomer)/_action/getSingleOutage";
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



export function useGetAllOutageCoustomer() {
  return useQuery({
    queryKey: ["outagedata"],
    queryFn: getAllOutageCoustomer,
  });
}


export function useGetsingleOutageCoustomer(id: string) {
  return useQuery({
    queryKey: ["outagedata", id],
    queryFn: () => getAllSingleOutageCoustomer(id),
    staleTime: 10 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: !!id,
  });
}


export function useCancelOutageCoustomer(id: string) {
const queryClient = useQueryClient();

return useMutation({
mutationFn: async () => {
if (!id) {
throw new Error("Outage ID is required.");
}

  return await cancelOutageCoustomer(id);
},

onSuccess: async () => {
  await Promise.all([
    queryClient.invalidateQueries({
      queryKey: ["outagedata", id],
    }),

    queryClient.invalidateQueries({
      queryKey: ["outagedata"],
    }),
  ]);
},

onError: (error) => {
  console.error("Failed to cancel outage:", error);
},

});
}