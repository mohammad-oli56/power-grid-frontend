"use server";

import axios from "axios";
import { cookies } from "next/headers";

export async function cancelOutageCoustomer(id: string) {
  try {
    if (!id) {
      throw new Error("Outage ID is required");
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      throw new Error("You are not logged in");
    }

    const res = await axios.post(
      `https://assignment-06-mu.vercel.app/api/v1/customer/outages/${id}/cancel`,
      {}, // Empty request body
      {
        headers: {
          Cookie: `accessToken=${accessToken}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Cancel outage API error:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });

      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Failed to cancel outage"
      );
    }

    throw error;
  }
}