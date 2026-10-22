"use server";

import axios from "axios";
import { cookies } from "next/headers";

export async function assigneTechnicianServiceRequest(
  id: string,
  technicianId: string,
) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  console.log(id,"from action")
  console.log(technicianId,"from action")

  if (!accessToken) {
    throw new Error("You are not logged in");
  }

  try {
    const res = await axios.post(
      `https://assignment-06-mu.vercel.app/api/v1/power-operator/service-requests/${id}/assign`,
      {
        technicianId:technicianId,
      },
      {
        headers: {
          Cookie: `accessToken=${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Assignment status:", error.response?.status);
      console.error("Assignment response:", error.response?.data);

      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Failed to assign technician",
      );
    }

    throw error;
  }
}