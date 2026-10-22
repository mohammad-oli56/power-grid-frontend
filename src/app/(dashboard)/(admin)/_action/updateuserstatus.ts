
"use server";

import axios from "axios";
import { cookies } from "next/headers";

export interface IUpdatUserStatusPayload {
  status: "ACTIVE" | "BLOCKED";
}

export async function updateServiceStatusUser(
  id: string,
  payload: IUpdatUserStatusPayload
) 

{
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
// console.log(id,payload)
  if (!accessToken) {
    throw new Error("You are not logged in");
  }
// console.log("line 23",payload.status)
  try {
    const response = await axios.patch(
      `https://assignment-06-mu.vercel.app/api/v1/admin/users/${id}/status`,
      {
        status:payload.status
      },
      {
        headers: {
          Cookie: `accessToken=${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          "Failed to update service status"
      );
    }

    throw error;
  }
}
