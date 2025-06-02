import { IResponseFormat } from "@/interfaces/Response";
import { LoginRequestBody, UserResponse } from "@/interfaces/User";

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
