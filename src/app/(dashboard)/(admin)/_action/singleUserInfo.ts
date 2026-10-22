
"use server";

import axios from "axios";
import { cookies } from "next/headers";

export async function getsingleSUserInfo(id: string) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    throw new Error("You are not logged in. Please login again.");
  }

  if (!id) {
    throw new Error("User ID is required.");
  }

  try {
    const response = await axios.get(
      `https://assignment-06-mu.vercel.app/api/v1/admin/users/${id}`,
      {
        headers: {
          Cookie: `accessToken=${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Get Single User Error:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
        userId: id,
      });

      const apiMessage = error.response?.data?.message;

      throw new Error(
        typeof apiMessage === "string"
          ? apiMessage
          : `Failed to fetch user information (${error.response?.status ?? "Network Error"})`
      );
    }

    console.error("Unexpected Get Single User Error:", error);
    throw new Error("Something went wrong while fetching user information.");
  }
}
