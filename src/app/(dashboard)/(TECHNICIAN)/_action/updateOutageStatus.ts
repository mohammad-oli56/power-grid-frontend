
"use server";

import axios from "axios";
import { cookies } from "next/headers";

export type OutageStatus = "IN_PROGRESS" | "RESTORED";

export async function updateOutageStatus(
  id: string,
  status: OutageStatus
) {
  console.log(id,status)
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    throw new Error("You are not logged in");
  }

  try {
    const res = await axios.patch(
      `https://assignment-06-mu.vercel.app/api/v1/technician/outages/my-assigned/${id}/status`,
      {
        status:  status ,
      },
      {
        headers: {
          Cookie: `accessToken=${accessToken}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to update outage status"
      );
    }

    throw error;
  }
}
