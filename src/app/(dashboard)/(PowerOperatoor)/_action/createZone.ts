"use server";

import axios from "axios";
import { cookies } from "next/headers";

export type CreateZonePayload = {
  name: string;
  code: string;
  substation: string;
  feeder: string;
  area: string;
  location: string;
};

export async function createZone(payload: CreateZonePayload) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      throw new Error("You are not logged in");
    }

    const res = await axios.post(
      "https://assignment-06-mu.vercel.app/api/v1/zones",
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
        error.response?.data?.message || "Failed to create zone"
      );
    }

    throw error;
  }
}