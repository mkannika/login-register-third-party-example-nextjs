import { IResponseFormat } from "@/interfaces/Response";
import {
  LoginRequestBody,
  RegisterRequestBody,
  UserResponse,
} from "@/interfaces/User";

/**
 * @description API function to login with email and password
 * @param param0 - The login request body containing email and password.
 * @returns {Promise<IResponseFormat<UserResponse>>} - A promise that resolves to the user response.
 * @throws {Error} - Throws an error if the login fails or if there is an unexpected error.
 */
export const loginEmailPassword = async ({
  email,
  password,
}: LoginRequestBody): Promise<IResponseFormat<UserResponse>> => {
  const body = {
    email,
    password,
  };

  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    // Check if the response is not OK
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to login");
    }

    // Parse and return the response data
    const data: IResponseFormat<UserResponse> = await response.json();
    return data;
  } catch (error: any) {
    // Return the error message from the API or a generic error message
    return error || "An unexpected error occurred during login";
  }
};

/**
 * @description API function to register a new user
 */
export const register = async (
  data: Pick<RegisterRequestBody, "email" | "password" | "name">,
): Promise<IResponseFormat<UserResponse>> => {
  const body = {
    email: data.email,
    password: data.password,
    name: data.name,
  };

  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    // Check if the response is not OK
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to register");
    }

    // Parse and return the response data
    const data: IResponseFormat<UserResponse> = await response.json();
    return data;
  } catch (error: any) {
    // Return the error message from the API or a generic error message
    return error || "An unexpected error occurred during registration";
  }
};

/**
 * @description API function to forget password
 * @param email - The email address of the user who wants to reset their password.
 * @returns {Promise<IResponseFormat<null>>} - A promise that resolves to a response indicating success or failure.
 * @throws {Error} - Throws an error if the request fails or if there is an unexpected error.
 */
export const forgotPassword = async (
  email: string,
): Promise<
  IResponseFormat<{
    message: string;
    success: boolean;
  }>
> => {
  const body = {
    email,
  };

  try {
    const response = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    // Check if the response is not OK
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to reset password");
    }

    // Parse and return the response data
    const data: IResponseFormat<{
      message: string;
      success: boolean;
    }> = await response.json();
    return data;
  } catch (error: any) {
    // Return the error message from the API or a generic error message
    return error || "An unexpected error occurred during password reset";
  }
};

/**
 * @description API function to reset password
 * @param token - The token provided by the user after clicking on the password reset link.
 * @param password - The new password for the user.
 * @returns {Promise<IResponseFormat<null>>} - A promise that resolves to a response indicating success or failure.
 * @throws {Error} - Throws an error if the request fails or if there is an unexpected error.
 */
export const resetPassword = async (
  token: string,
  password: string,
): Promise<
  IResponseFormat<{
    message: string;
    success: boolean;
  }>
> => {
  const body = {
    token,
    password,
  };

  try {
    const response = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    // Check if the response is not OK
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to reset password");
    }

    // Parse and return the response data
    const data: IResponseFormat<{
      message: string;
      success: boolean;
    }> = await response.json();
    return data;
  } catch (error: any) {
    // Return the error message from the API or a generic error message
    return error || "An unexpected error occurred during password reset";
  }
};

/**
 * @description API function to verify email
 * @param token - The token provided by the user after clicking on the verification link.
 * @returns {Promise<IResponseFormat<null>>} - A promise that resolves to a response indicating success or failure.
 * @throws {Error} - Throws an error if the request fails or if there is an unexpected error.
 */
export const verifyEmail = async (
  token: string,
): Promise<
  IResponseFormat<{
    message: string;
    success: boolean;
  }>
> => {
  const body = {
    token,
  };

  try {
    const response = await fetch("/api/auth/verify-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    // Check if the response is not OK
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to verify email");
    }

    // Parse and return the response data
    const data: IResponseFormat<{
      message: string;
      success: boolean;
    }> = await response.json();
    return data;
  } catch (error: any) {
    // Return the error message from the API or a generic error message
    return error || "An unexpected error occurred during email verification";
  }
};
