"use server";

import axios from "axios";
import { cookies } from "next/headers";

export async function updatOutageStatusServiceRequest(id: string) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    throw new Error("You are not logged in");
  }

  try {
    const res = await axios.patch(
      `https://assignment-06-mu.vercel.app/api/v1/power-operator/service-requests/${id}/status`,
      {
        status: "CONFIRMED",
      },
      {
        headers: {
          Cookie: `accessToken=${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          "Failed to acknowledge outage"
      );
    }

    throw error;
  }
}