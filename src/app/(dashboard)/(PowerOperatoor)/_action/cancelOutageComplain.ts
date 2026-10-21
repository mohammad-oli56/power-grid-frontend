"use server";

import axios from "axios";
import { cookies } from "next/headers";

export async function cancelOutageComplain(id: string) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    throw new Error("You are not logged in");
  }

  try {
    const res = await axios.post(
      `https://assignment-06-mu.vercel.app/api/v1/power-operator/outages/${id}/cancel`,
      {}, // Empty request body
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
      console.error("Cancel API status:", error.response?.status);
      console.error("Cancel API response:", error.response?.data);

      throw new Error(
        typeof error.response?.data === "object"
          ? error.response?.data?.message || "Failed to cancel outage"
          : "Failed to cancel outage"
      );
    }

    throw error;
  }
}