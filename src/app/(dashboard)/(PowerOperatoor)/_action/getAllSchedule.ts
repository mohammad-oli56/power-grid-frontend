"use server";

import axios from "axios";
import { cookies } from "next/headers";

export async function getAllSchedules() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) throw new Error("You are not logged in");

    const res = await axios.get(
      "https://assignment-06-mu.vercel.app/api/v1/power-operator/schedules",
      {
       
        headers: {
          Cookie: `accessToken=${accessToken}`,
        },
      }
    );

    return res.data;
} catch (error) {
  if (axios.isAxiosError(error)) {
    console.error("API STATUS:", error.response?.status);
    console.error("API RESPONSE:", error.response?.data);
    console.error("API URL:", error.config?.url);
    console.error("API ERROR:", error.message);

    throw new Error(
      error.response?.data?.message || error.message
    );
  }

  throw error;
}
}