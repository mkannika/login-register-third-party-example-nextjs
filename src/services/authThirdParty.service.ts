import { IResponseFormat } from "@/interfaces/Response";
import {
  LoginRequestBody,
  RegisterRequestBody,
  UserResponse,
} from "@/interfaces/User";

/**
 * @description API function to login with Google using OAuth Google Provider Firebase
 * @param {string} email - The email of the user.
 * @param {string} provider - The provider of the user.
 * @param {string} providerUUID - The unique identifier of the user from the provider.
 * @returns {Promise<void>} - A promise that resolves when the login is successful.
 */

export const loginWithProvider = async ({
  email,
}: Omit<LoginRequestBody, "password">): Promise<
  IResponseFormat<UserResponse>
> => {
  const body = {
    email,
  };

  try {
    const response = await fetch("/api/auth/login-provider", {
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

// Register the user to the API
export const registerWithProvider = async ({
  email,
  provider,
  providerUUID,
  name,
  photoURL,
}: RegisterRequestBody): Promise<IResponseFormat<UserResponse>> => {
  const body = {
    email,
    provider,
    providerUUID,
    name,
    photoURL,
  };

  try {
    const response = await fetch("/api/auth/register-provider", {
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
    return error || "An unexpected error occurred during login";
  }
};
