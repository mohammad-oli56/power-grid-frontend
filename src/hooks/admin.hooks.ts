import { createStaff, CreateStaffPayload } from "@/app/(dashboard)/(admin)/_action/createStaff";
import { deleteusser } from "@/app/(dashboard)/(admin)/_action/deleteuser";
import { getAllReportAdmin } from "@/app/(dashboard)/(admin)/_action/getAdminAllReport";
import { getAllAuditLogs } from "@/app/(dashboard)/(admin)/_action/getAllAuditLogs";
import { getAllUsers } from "@/app/(dashboard)/(admin)/_action/getAllusers";
import { getsingleSUserInfo } from "@/app/(dashboard)/(admin)/_action/singleUserInfo";
import { IUpdatUserStatusPayload, updateServiceStatusUser } from "@/app/(dashboard)/(admin)/_action/updateuserstatus";
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



export function useSingleUserInfo(id: string) {
  return useQuery({
    queryKey: ["adminusers", id],
    queryFn: () => getsingleSUserInfo(id),
    staleTime: 10 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: !!id,
  });
}

export function useUpdateUserStatus(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IUpdatUserStatusPayload) =>
      updateServiceStatusUser(id, payload),

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
         queryKey: ["adminallusers"],
        }),
        queryClient.invalidateQueries({
           queryKey: ["adminusers", id],
        }),
      ]);
    },
  });
}



export function useDeleteuser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteusser(id),

    onSuccess: async (_, id) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["adminallusers"],
        }),
      ]);
    },
  });
}