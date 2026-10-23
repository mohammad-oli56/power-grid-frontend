"use server";

import axios from "axios";
import { cookies } from "next/headers";

export type CreateServiceRequestPayload = {
  zoneId: string;
  type: string;
  description: string;
};

export async function createServiceRequest(
  payload: CreateServiceRequestPayload
) {
  try {
    // Validate payload
    if (!payload.zoneId || !payload.type || !payload.description?.trim()) {
      throw new Error(
        "Zone, service type, and description are required."
      );
    }

    // Get access token
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      throw new Error("You are not logged in. Please log in again.");
    }

    // Create service request
    const res = await axios.post(
      "https://assignment-06-mu.vercel.app/api/v1/customer/service-requests",
      {
        zoneId: payload.zoneId,
        type: payload.type,
        description: payload.description.trim(),
      },
      {
        headers: {
          Cookie: `accessToken=${accessToken}`,
          "Content-Type": "application/json",
        },
        timeout: 15000,
      }
    );

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Create Service Request API Error:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });

      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Failed to create service request."
      );
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error("An unexpected error occurred.");
  }
}