"use server";

import axios from "axios";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function googleaccount(payload: string) {
  try {
    const res = await axios.post(
      "https://assignment-06-mu.vercel.app/api/v1/auth/google",
      {
        idToken: payload,
      }
    );

    if (!res.data.success) {
      throw new Error(
        res.data.message || "Google login failed"
      );
    }

    const accessToken = res.data.data.accessToken;

    if (!accessToken) {
      throw new Error("Access token not found");
    }

    const decodedToken = jwt.decode(
      accessToken
    ) as JwtPayload | null;

    if (!decodedToken) {
      throw new Error("Invalid access token");
    }

    const role = decodedToken.role;

    if (typeof role !== "string" || !role) {
      throw new Error("User role not found in token");
    }

    const cookieStore = await cookies();

    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return {
      success: true,
      message: "Google login successful",
      role,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
        error.message ||
        "Google login failed"
      );
    }

    throw error;
  }
}