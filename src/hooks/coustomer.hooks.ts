"use client"

import { cancelOutageCoustomer } from "@/app/(dashboard)/(coustomer)/_action/cancelOutage";
import { cancelServiceRequestCoustomer } from "@/app/(dashboard)/(coustomer)/_action/cancelServiceRequest";
import { createOutage } from "@/app/(dashboard)/(coustomer)/_action/createOutage";
import { payment } from "@/app/(dashboard)/(coustomer)/_action/createPayment";
import { createServiceRequest } from "@/app/(dashboard)/(coustomer)/_action/createServiceRequest";
import { getAllNotification } from "@/app/(dashboard)/(coustomer)/_action/getAllNotification";
import { getAllschedule } from "@/app/(dashboard)/(coustomer)/_action/getAllSchedule";
import { getAllServiceRequestCoustomer } from "@/app/(dashboard)/(coustomer)/_action/getAllServiceRequest";
import { getAllZone } from "@/app/(dashboard)/(coustomer)/_action/getAllZone";
import { getAllOutageCoustomer } from "@/app/(dashboard)/(coustomer)/_action/getAlOutage";
import { getAllSingleOutageCoustomer } from "@/app/(dashboard)/(coustomer)/_action/getSingleOutage";
import { getAllSingleServiceCoustomer } from "@/app/(dashboard)/(coustomer)/_action/singleServiceRequest";
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



export function useCreateServiceRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createServiceRequest,

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["serviceRequestData"],
        }),
      ]);
    },

    onError: (error) => {
      console.error("Failed to create service request:", error.message);
    },
  });
}


export function useGetAllServiceRequest() {
  return useQuery({
   queryKey: ["serviceRequestData"],
    queryFn: getAllServiceRequestCoustomer,
  });
}

export function useSingleSserviceRequestCoustomer(id: string) {
  return useQuery({
    queryKey: ["serviceRequestData", id],
    queryFn: () => getAllSingleServiceCoustomer(id),
    staleTime: 10 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: !!id,
  });
}



export function useCancelServiceRequestCoustomer(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["cancelServiceRequest", id],

    mutationFn: async () => {
      if (!id) {
        throw new Error("Service request ID is required.");
      }

      const result = await cancelServiceRequestCoustomer(id);

      if (!result?.success) {
        throw new Error(
          result?.message || "Failed to cancel service request."
        );
      }

      return result;
    },

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["serviceRequestData", id],
        }),
        queryClient.invalidateQueries({
          queryKey: ["serviceRequestData"],
        }),
      ]);
    },

    onError: (error) => {
      console.error("Failed to cancel service request:", error);
    },
  });
}

export function usePayment(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createPayment", id],

    mutationFn: async () => {
      if (!id) {
        throw new Error("Service request ID is required.");
      }

      const result = await payment(id);

      if (!result?.success) {
        throw new Error(
          result?.message || "Failed to create payment."
        );
      }

      return result;
    },

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["serviceRequestData", id],
        }),
        queryClient.invalidateQueries({
          queryKey: ["serviceRequestData"],
        }),
      ]);
    },

    onError: (error) => {
      console.error("Failed to create payment:", error);
    },
  });
}