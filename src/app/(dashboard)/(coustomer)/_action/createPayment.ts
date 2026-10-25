
"use server";

import axios from "axios";
import { cookies } from "next/headers";

export async function payment(id: string) {
  try {
    if (!id?.trim()) {
      throw new Error("Service request ID is required.");
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      throw new Error("You are not logged in.");
    }

    const response = await axios.post(
      "https://assignment-06-mu.vercel.app/api/v1/customer/payment/create",
      {
        requestId: id,
        paymentMethod: "BKASH",
      },
      {
        headers: {
          Cookie: `accessToken=${accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        timeout: 15000,
      }
    );

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Create payment API error:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });

      const responseData = error.response?.data;

      throw new Error(
        typeof responseData?.message === "string"
          ? responseData.message
          : "Failed to create payment."
      );
    }

    throw error instanceof Error
      ? error
      : new Error("An unexpected error occurred.");
  }
}
