
"use server";

import axios from "axios";
import { cookies } from "next/headers";

export const getMe = async () => {
  try {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        message: "You are not logged in",
      };
    }

    const res = await axios.get(
      "https://assignment-06-mu.vercel.app/api/v1/auth/me",
      {
        headers: {
          Cookie: `accessToken=${accessToken}`,
        },
      }
    );

    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message:
          error.response?.data?.message || "Failed to fetch user",
      };
    }

    return {
      success: false,
      message: "Failed to fetch user",
    };
  }
};

