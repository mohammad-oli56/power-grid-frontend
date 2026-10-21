import { createSchedule } from "@/app/(dashboard)/(PowerOperatoor)/_action/createSchedule";
import { createZone } from "@/app/(dashboard)/(PowerOperatoor)/_action/createZone";
import { deleteShdedule } from "@/app/(dashboard)/(PowerOperatoor)/_action/deleteSchedule";
import { getOutageComplain } from "@/app/(dashboard)/(PowerOperatoor)/_action/getAllOutageComplains";
import { getAllSchedules } from "@/app/(dashboard)/(PowerOperatoor)/_action/getAllSchedule";

import { getAllZone } from "@/app/(dashboard)/(PowerOperatoor)/_action/getAllZone";
import { getsingleSchedulePowerOperator } from "@/app/(dashboard)/(PowerOperatoor)/_action/getSingleSchedule";
import { getAllTechnician } from "@/app/(dashboard)/(PowerOperatoor)/_action/technicians";
import { updatShceduleTime } from "@/app/(dashboard)/(PowerOperatoor)/_action/updateScheduleTime";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useZone() {
  return useQuery({
    queryKey: ["zonepoweroperator"],
    queryFn:  getAllZone,
    
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



export const useDeleteSchedule = (id:string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn:()=> deleteShdedule(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["schedulespoweroprator"],
      });
    },
  });
};




export const useOutageComplain =()=>{
  return useQuery({
    queryKey:["OutageComplain"],
    queryFn:getOutageComplain,
     staleTime: 10 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}