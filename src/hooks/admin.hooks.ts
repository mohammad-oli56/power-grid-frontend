import { getAllReportAdmin } from "@/app/(dashboard)/(admin)/_action/getAdminAllReport";
import { useQuery } from "@tanstack/react-query";


export function useGetAllReport() {
  return useQuery({
    queryKey: ["admindashboard"],
    queryFn: getAllReportAdmin,

    staleTime: 10 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}