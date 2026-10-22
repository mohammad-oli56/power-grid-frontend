"use server";

import axios from "axios";
import { cookies } from "next/headers";

export async function deleteusser(id: string) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      throw new Error("You are not logged in");
    }

    const res = await axios.delete(
      `https://assignment-06-mu.vercel.app/api/v1/admin/users/${id}/delete`,
      {
        headers: {
          Cookie: `accessToken=${accessToken}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to delete schedule"
      );
    }

    throw error;
  }
}