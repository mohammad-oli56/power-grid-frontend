import { getAllReportAdmin } from "@/app/(dashboard)/(admin)/_action/getAdminAllReport";
import { getAllAuditLogs } from "@/app/(dashboard)/(admin)/_action/getAllAuditLogs";
import { getAllUsers } from "@/app/(dashboard)/(admin)/_action/getAllusers";
import { useQuery } from "@tanstack/react-query";


export function useGetAllReport() {
  return useQuery({
    queryKey: ["admindashboard"],
    queryFn: getAllReportAdmin,

    staleTime: 10 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}


export function useGetAllAuditLogs() {
  return useQuery({
    queryKey: ["adminauditlogs"],
    queryFn: getAllAuditLogs,

    staleTime: 10 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
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