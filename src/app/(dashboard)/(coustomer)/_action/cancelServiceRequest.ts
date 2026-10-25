
"use server";

import axios from "axios";
import { cookies } from "next/headers";

export async function cancelServiceRequestCoustomer(id: string) {
  try {
    if (!id?.trim()) {
      throw new Error("Service request ID is required.");
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      throw new Error("You are not logged in. Please log in again.");
    }

    const response = await axios.post(
      `https://assignment-06-mu.vercel.app/api/v1/customer/service-requests/${encodeURIComponent(id)}/cancel`,
      {},
      {
        headers: {
          Cookie: `accessToken=${accessToken}`,
          Accept: "application/json",
        },
        timeout: 15000,
      }
    );

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Cancel service request API error:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });

      const message =
        error.response?.data?.message ||
        (error.response?.status === 401
          ? "Session expired. Please log in again."
          : error.response?.status === 403
            ? "You are not authorized to cancel this request."
            : error.code === "ECONNABORTED"
              ? "Request timed out. Please try again."
              : "Failed to cancel service request.");

      throw new Error(message);
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error("An unexpected error occurred.");
  }
}
