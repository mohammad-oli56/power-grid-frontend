"use server";

import axios from "axios";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type TPrevState = {
  success: boolean;
  message: string;
};

export async function loginAction(
  prevState: TPrevState,
  formData: FormData
): Promise<TPrevState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  let redirectPath = "/";

  try {
    const res = await axios.post(
      "https://assignment-06-mu.vercel.app/api/v1/auth/login",
      {
        email,
        password,
      }
    );

    if (!res.data.success) {
      return {
        success: false,
        message: "Invalid email or password",
      };
    }

    const accessToken = res.data.data.accessToken;
    const refreshToken = res.data.data.refreshToken;

    if (!accessToken || !refreshToken) {
      return {
        success: false,
        message: "Token not found",
      };
    }

    const cookieStore = await cookies();

    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      
      maxAge: 60 * 60 * 24,
    });

    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      
      maxAge: 60 * 60 * 24 * 7,
    });

    const decodedToken = jwt.decode(accessToken) as JwtPayload | null;

    if (!decodedToken) {
      return {
        success: false,
        message: "Invalid token",
      };
    }

    switch (decodedToken.role) {
      case "ADMIN":
        redirectPath = "/admin-dashboard";
        break;

      case "POWER_OPERATOR":
        redirectPath = "/landlord-dashboard";
        break;

      case "TECHNICIAN":
        redirectPath = "/technician-dashboard";
        break;

         case "CUSTOMER":
        redirectPath = "/coustomer-dashboard";
        break;

      default:
        redirectPath = "/";
        break;
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Login failed",
    };
  }

  redirect(redirectPath);
}