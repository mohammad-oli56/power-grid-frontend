
"use server";

import axios from "axios";
import { cookies } from "next/headers";

export type CreateSchedulePayload = {
  zoneId: string;
  startTime: string;
  endTime: string;
  reason: string;
};

export async function createSchedule(payload: CreateSchedulePayload) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      throw new Error("You are not logged in");
    }

    const res = await axios.post(
      "https://assignment-06-mu.vercel.app/api/v1/power-operator/schedules",
      payload,
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
        error.response?.data?.message || "Failed to create schedule"
      );
    }

    throw error;
  }
}
