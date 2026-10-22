import { createStaff, CreateStaffPayload } from "@/app/(dashboard)/(admin)/_action/createStaff";
import { getAllReportAdmin } from "@/app/(dashboard)/(admin)/_action/getAdminAllReport";
import { getAllAuditLogs } from "@/app/(dashboard)/(admin)/_action/getAllAuditLogs";
import { getAllUsers } from "@/app/(dashboard)/(admin)/_action/getAllusers";
import { CreateStaffForm } from "@/app/(dashboard)/(admin)/_component/CreateStaffForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export function useGetAllReport() {
  return useQuery({
    queryKey: ["admindashboard"],
    queryFn: getAllReportAdmin,

    staleTime: 10 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}


export function useGetAllAuditLogs(page: number = 1) {
  return useQuery({
    queryKey: ["adminauditlogs", page],
    queryFn: () => getAllAuditLogs(page, 10),
    staleTime: 10 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}


export function useCreateStaff() {
const queryClient = useQueryClient();

return useMutation({
mutationFn: (payload: CreateStaffPayload) => createStaff(payload),

onSuccess: () => {
  queryClient.invalidateQueries({
    queryKey: ["adminallusers"],
  });
},

});
}


export function useGetAllUsers() {
  return useQuery({
    queryKey: ["adminallusers"],
    queryFn: getAllUsers,

    staleTime: 10 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}