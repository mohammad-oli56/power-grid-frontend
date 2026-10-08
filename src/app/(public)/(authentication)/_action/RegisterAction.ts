
"use server";

import axios from "axios";

export type FormState = {
  success: boolean;
  message: string;
  email: string;
};

export const registerAction = async (
  prevState: FormState,
  formData: FormData
): Promise<FormState> => {
  try {
    const name = formData.get("name")?.toString().trim() || "";
    const email =
      formData.get("email")?.toString().trim().toLowerCase() || "";
    const phoneNumber =
      formData.get("phoneNumber")?.toString().trim() || "";
    const password = formData.get("password")?.toString() || "";

    // -----------------------------
    // Validation
    // -----------------------------

    if (!name || name.length < 3) {
      return {
        success: false,
        message: "Name must be at least 3 characters.",
        email,
      };
    }

    if (!email) {
      return {
        success: false,
        message: "Email is required.",
        email,
      };
    }

    const emailRegex =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: "Invalid email address.",
        email,
      };
    }

    if (password.length < 6) {
      return {
        success: false,
        message: "Password must be at least 6 characters.",
        email,
      };
    }

    if (phoneNumber) {
      const phoneRegex = /^01[3-9]\d{8}$/;

      if (!phoneRegex.test(phoneNumber)) {
        return {
          success: false,
          message: "Invalid Bangladesh phone number.",
          email,
        };
      }
    }

    // -----------------------------
    // API Request
    // -----------------------------

    const response = await axios.post(
      "https://assignment-06-mu.vercel.app/api/v1/auth/register",
      {
        name,
        email,
        password,
        phoneNumber,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("REGISTER RESPONSE:", response.data);

    return {
      success: true,
      message:
        response.data?.message || "Registration successful!",
      email,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        "REGISTER API ERROR:",
        error.response?.status,
        error.response?.data
      );

      return {
        success: false,
        message:
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Registration failed.",
        email: formData.get("email")?.toString().trim().toLowerCase() || "",
      };
    }

    console.error("REGISTER ERROR:", error);

    return {
      success: false,
      message: "Something went wrong.",
      email: formData.get("email")?.toString().trim().toLowerCase() || "",
    };
  }
};

