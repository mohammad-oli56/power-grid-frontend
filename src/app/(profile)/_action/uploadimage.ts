
"use server";

import axios from "axios";
import { cookies } from "next/headers";

type UploadResult = {
  success: boolean;
  message: string;
  data?: unknown;
};

export async function updateprofileImage(
  formData: FormData
): Promise<UploadResult> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        message: "You are not logged in. Please log in first.",
      };
    }

    const response = await axios.patch(
      "https://assignment-06-mu.vercel.app/api/v1/auth/profile-upload",
      formData,
      {
        headers: {
          Cookie: `accessToken=${accessToken}`,
          Accept: "application/json",
        },
        timeout: 30000,
      }
    );

    return {
      success: true,
      message:
        response.data?.message ||
        "Profile image updated successfully!",
      data: response.data,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Profile image upload failed:",
        error.response?.status,
        error.response?.data
      );

      const status = error.response?.status;

      let message = "Failed to update profile image.";

      if (status === 401 || status === 403) {
        message =
          "Your session has expired. Please log in again.";
      } else if (error.code === "ECONNABORTED") {
        message =
          "Upload timed out. Please try again.";
      } else if (error.response?.data?.message) {
        message = error.response.data.message;
      } else if (!error.response) {
        message =
          "Unable to connect to the server. Please try again.";
      }

      return {
        success: false,
        message,
      };
    }

    console.error("Unexpected profile upload error:", error);

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}
