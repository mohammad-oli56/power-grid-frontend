"use server";

import axios from "axios";
import { cookies } from "next/headers";

export async function updatShceduleTime(
  id: string,
  payload: {
    startTime: string;
    endTime: string;
  }
) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    throw new Error("You are not logged in");
  }

  try {
    const res = await axios.patch(
      `https://assignment-06-mu.vercel.app/api/v1/power-operator/schedules/${id}`,
      {
        startTime: payload.startTime,
        endTime: payload.endTime,
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
          "Failed to update schedule time"
      );
    }

    throw error;
  }
}