"use client";

import { Button } from "@/components/ui/button";
import { useGetAllOutageCoustomer } from "@/hooks/coustomer.hooks";
import { useRouter } from "next/navigation";

interface Outage {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
}

const MyOutages = () => {
  const { data, isPending, isError } = useGetAllOutageCoustomer();
  const router = useRouter()

  if (isPending) return <h1>Loading...</h1>;

  if (isError) return <h1>Failed to load outages.</h1>;

  const outages: Outage[] = data?.data ?? [];

  const handeldetails = (id:string)=>{
    router.push(`/coustomer-dashboard/my-outages/${id}`)
  }

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">My Outages</h1>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="border-b p-4">Title</th>
              <th className="border-b p-4">Description</th>
              <th className="border-b p-4">Status</th>
              <th className="border-b p-4">Created At</th>
              <th className="border-b p-4">Details</th>
            </tr>
          </thead>

          <tbody>
            {outages.length > 0 ? (
              outages.map((outage: Outage) => (
                <tr key={outage.id} className="hover:bg-gray-50">
                  <td className="border-b p-4 font-medium">
                    {outage.title}
                  </td>

                  <td className="border-b p-4">
                    {outage.description}
                  </td>

                  <td className="border-b p-4">
                    {outage.status}
                  </td>

                  <td className="whitespace-nowrap border-b p-4">
                    {new Date(outage.createdAt).toLocaleString()}
                  </td>
                  <td className="whitespace-nowrap border-b p-4">
                   <Button onClick={()=>handeldetails(outage.id)}>
                    details
                   </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-6 text-center">
                  No outages found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOutages;