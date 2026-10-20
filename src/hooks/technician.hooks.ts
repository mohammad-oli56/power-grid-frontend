import { getAllOutageTechnician } from "@/app/(dashboard)/(TECHNICIAN)/_action/getAllAssignOutage";
import { getAllSingleOutageTechnician } from "@/app/(dashboard)/(TECHNICIAN)/_action/getSingleOutages";
import { OutageStatus, updateOutageStatus } from "@/app/(dashboard)/(TECHNICIAN)/_action/updateOutageStatus";
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
    queryFn: getAllOutageTechnician,
    staleTime: 10 * 60 * 1000, 
    gcTime: 10 * 60 * 1000,   
  });
}




export function useTecSingleCard(id: string) {
  return useQuery({
    queryKey: ["service", id],
    queryFn: () => getAllSingleOutageTechnician(id),
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
