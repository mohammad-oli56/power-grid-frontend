import { createZone } from "@/app/(dashboard)/(PowerOperatoor)/_action/createZone";
import { getAllZone } from "@/app/(dashboard)/(PowerOperatoor)/_action/getAllZone";
import { getAllTechnician } from "@/app/(dashboard)/(PowerOperatoor)/_action/technicians";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useZone() {
  return useQuery({
    queryKey: ["zone"],
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
        queryKey: ["zone"],
      });
    },
  });
}




export function useTechnicianGet() {
  return useQuery({
  queryKey: ["zone"],
    queryFn: getAllTechnician,
    staleTime: 10 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

