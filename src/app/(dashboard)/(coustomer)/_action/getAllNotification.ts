"use server";

import axios from "axios";
import { cookies } from "next/headers";

export async function getAllNotification() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) throw new Error("You are not logged in");

    const res = await axios.get(
      "https://assignment-06-mu.vercel.app/api/v1/customer/notification",
      {
        // params: zoneId ? { zoneId } : {},
        headers: {
          Cookie: `accessToken=${accessToken}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch notification"
      );
    }
    throw error;
  }
}