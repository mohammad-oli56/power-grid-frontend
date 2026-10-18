
"use server";

import axios from "axios";
import { cookies } from "next/headers";

export type TPrevState = {
  success: boolean;
  message: string;
};

export async function verifyAction(
  prevState: TPrevState,
  formData: FormData
): Promise<TPrevState> {
  try {
    const email =
      formData.get("email")?.toString().trim().toLowerCase() || "";

    const otp =
      formData.get("otp")?.toString().trim() || "";

    // -----------------------------
    // Validation
    // -----------------------------

    if (!email) {
      return {
        success: false,
        message: "Email is required.",
      };
    }

    if (!otp) {
      return {
        success: false,
        message: "OTP is required.",
      };
    }

    if (otp.length !== 6) {
      return {
        success: false,
        message: "OTP must be 6 digits.",
      };
    }

    // -----------------------------
    // Verify Email API
    // -----------------------------

    const response = await axios.post(
      "https://assignment-06-mu.vercel.app/api/v1/auth/verify-email",
      {
        email,
        otp,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // console.log("VERIFY OTP RESPONSE:", response.data);

    // -----------------------------
    // Get Tokens
    // -----------------------------

    const accessToken = response.data?.data?.accessToken;
    const refreshToken = response.data?.data?.refreshToken;

    if (!accessToken || !refreshToken) {
      return {
        success: false,
        message: "Verification successful, but tokens were not received.",
      };
    }

    // -----------------------------
    // Set Cookies
    // -----------------------------

    const cookieStore = await cookies();

    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60, // 1 hour
    });

    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return {
      success: true,
      message:
        response.data?.message ||
        "Account verified successfully!",
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        "VERIFY OTP API ERROR:",
        error.response?.status,
        error.response?.data
      );

      return {
        success: false,
        message:
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Invalid OTP. Please try again.",
      };
    }

    console.error("VERIFY OTP ERROR:", error);

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}

