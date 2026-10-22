"use server";

import axios from "axios";
import { cookies } from "next/headers";

export type CreateStaffPayload = {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: "ADMIN" | "POWER_OPERATOR" | "TECHNICIAN";
  employeeId?: string;
  specialization?: string;
};

export async function createStaff(payload: CreateStaffPayload) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      throw new Error("You are not logged in");
    }

    const res = await axios.post(
      "https://assignment-06-mu.vercel.app/api/v1/admin/createStaff",
      payload,
      {
        headers: {
          Cookie: `accessToken=${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to create staff",
      );
    }

    throw error;
  }
}