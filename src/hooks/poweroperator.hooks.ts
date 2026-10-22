import { assigneTechnician } from "@/app/(dashboard)/(PowerOperatoor)/_action/assignTechnician";
import { assigneTechnicianServiceRequest } from "@/app/(dashboard)/(PowerOperatoor)/_action/assignTechnicianService";
import { cancelOutageComplain } from "@/app/(dashboard)/(PowerOperatoor)/_action/cancelOutageComplain";
import { cancelServiceRequestn } from "@/app/(dashboard)/(PowerOperatoor)/_action/cancelServiceRequest";
import { updatOutageStatusComplain } from "@/app/(dashboard)/(PowerOperatoor)/_action/changeStatusComplainOutage";
import { updatOutageStatusServiceRequest } from "@/app/(dashboard)/(PowerOperatoor)/_action/changleStatusServiceRequest";
import { createSchedule } from "@/app/(dashboard)/(PowerOperatoor)/_action/createSchedule";
import { createZone } from "@/app/(dashboard)/(PowerOperatoor)/_action/createZone";
import { deleteShdedule } from "@/app/(dashboard)/(PowerOperatoor)/_action/deleteSchedule";
import { getOutageComplain } from "@/app/(dashboard)/(PowerOperatoor)/_action/getAllOutageComplains";
import { getAllSchedules } from "@/app/(dashboard)/(PowerOperatoor)/_action/getAllSchedule";
import { getAllServiceRequest } from "@/app/(dashboard)/(PowerOperatoor)/_action/getAllServiceRequest";

import { getAllZone } from "@/app/(dashboard)/(PowerOperatoor)/_action/getAllZone";
import { getsingleSingleOutageProblem } from "@/app/(dashboard)/(PowerOperatoor)/_action/getSingleOutageComplain";
import { getsingleSchedulePowerOperator } from "@/app/(dashboard)/(PowerOperatoor)/_action/getSingleSchedule";
import { getSingleServiceRequest } from "@/app/(dashboard)/(PowerOperatoor)/_action/getSingleServiceRequest";
import { getAllTechnician } from "@/app/(dashboard)/(PowerOperatoor)/_action/technicians";
import { updatShceduleTime } from "@/app/(dashboard)/(PowerOperatoor)/_action/updateScheduleTime";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useZone() {
  return useQuery({
    queryKey: ["zonepoweroperator"],
    queryFn: getAllZone,

    staleTime: 10 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}


export function useCreateZones() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createZone,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["zonepoweroperator"],
      });
    },
  });
}




export function useTechnicianGet() {
  return useQuery({
    queryKey: ["technicianpoweroperator"],
    queryFn: getAllTechnician,
    staleTime: 10 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}


export const useCreateSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["schedulespoweroprator"],
      });
    },
  });
};


export function useScheduleGetPowerOperator() {
  return useQuery({
    queryKey: ["schedulespoweroprator"],
    queryFn: getAllSchedules,
    staleTime: 10 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}


export function useScheduleSingleGetPowerOperator(id: string) {
  return useQuery({
    queryKey: ["schedulePowerOperator", id],
    queryFn: () => getsingleSchedulePowerOperator(id),
    staleTime: 10 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: !!id,
  });
}

type UpdateScheduleTimePayload = {
  startTime: string;
  endTime: string;
};

export function useUpdateScheduleTime(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (time: UpdateScheduleTimePayload) =>
      updatShceduleTime(id, time),

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["schedulePowerOperator", id],
        }),
        queryClient.invalidateQueries({
          queryKey: ["schedulePowerOperator"],
        }),
      ]);
    },

  });
}



export const useDeleteSchedule = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteShdedule(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["schedulespoweroprator"],
      });
    },
  });
};




export const useOutageComplain = () => {
  return useQuery({
    queryKey: ["OutageComplain"],
    queryFn: getOutageComplain,
    staleTime: 10 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}



export function useSingleOutageComplain(id: string) {
  return useQuery({
    queryKey: ["OutageComplain", id],
    queryFn: () => getsingleSingleOutageProblem(id),
    staleTime: 10 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: !!id,
  });
}


export function useOutageStatusChange(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      updatOutageStatusComplain(id),

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["OutageComplain", id],
        }),
        queryClient.invalidateQueries({
          queryKey: ["OutageComplain"],
        }),
      ]);
    },

  });
}


export function useAssigneTechnician(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (technicianId: string) =>
      assigneTechnician(id, technicianId),

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["OutageComplain", id],
        }),
        queryClient.invalidateQueries({
          queryKey: ["OutageComplain"],
        }),
      ]);
    },

  });
}


export function useCancelOutageComplain(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      cancelOutageComplain(id),

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["OutageComplain", id],
        }),
        queryClient.invalidateQueries({
          queryKey: ["OutageComplain"],
        }),
      ]);
    },

  });
}



export const useServiceRequest = () => {
  return useQuery({
    queryKey: ["servicerequest"],
    queryFn: getAllServiceRequest,
    staleTime: 10 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}


export function useSingleServiceRequest(id: string) {
  return useQuery({
    queryKey: ["servicerequest", id],
    queryFn: () => getSingleServiceRequest(id),
    staleTime: 10 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: !!id,
  });
}





export function useAssigneTechnicianServiceRequest(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (technicianId: string) =>
      assigneTechnicianServiceRequest(id, technicianId),

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["servicerequest", id],
        }),
        queryClient.invalidateQueries({
          queryKey: ["servicerequest"],
        }),
      ]);
    },

  });
}



export function useChangeStatusServiceRequest(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      updatOutageStatusServiceRequest(id),

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["servicerequest", id],
        }),
        queryClient.invalidateQueries({
          queryKey: ["servicerequest"],
        }),
      ]);
    },

  });
}


export function useCancelServiceRequest(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      cancelServiceRequestn(id),

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["servicerequest", id],
        }),
        queryClient.invalidateQueries({
          queryKey: ["servicerequest"],
        }),
      ]);
    },

  });
}