import { getAllOutageTechnician } from "@/app/(dashboard)/(TECHNICIAN)/_action/getAllAssignOutage";
import { getAllServiceTechnician } from "@/app/(dashboard)/(TECHNICIAN)/_action/getAllAssignService";
import { getAllSingleOutageTechnician } from "@/app/(dashboard)/(TECHNICIAN)/_action/getSingleOutages";
import { getAllSingleServiceTechnician } from "@/app/(dashboard)/(TECHNICIAN)/_action/getSingleServices";
import { OutageStatus, updateOutageStatus } from "@/app/(dashboard)/(TECHNICIAN)/_action/updateOutageStatus";
import { updateServiceStatus } from "@/app/(dashboard)/(TECHNICIAN)/_action/updateServiceStatu";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useTechnicianOutage() {
  return useQuery({
    queryKey: ["outage"],
    queryFn: getAllOutageTechnician,
    staleTime: 10 * 60 * 1000, 
    gcTime: 10 * 60 * 1000,   
  });
}


export function useTechnicianService() {
  return useQuery({
    queryKey: ["service"],
    queryFn: getAllServiceTechnician,
    staleTime: 10 * 60 * 1000, 
    gcTime: 10 * 60 * 1000,   
  });
}




export function useTecSingleCard(id: string) {
  return useQuery({
    queryKey: ["outage", id],
    queryFn: () => getAllSingleOutageTechnician(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

export function useTecSingleCardService(id: string) {
  return useQuery({
    queryKey: ["service", id],
    queryFn: () => getAllSingleServiceTechnician(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}



export function useUpdateStatus(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (status: OutageStatus) =>
      updateOutageStatus(id, status),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["service", id],
      });
    },
  });
}


export function useUpdateServiceStatus(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (status:any) =>
      updateServiceStatus(id, status),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["service", id],
      });
    },
  });
}
