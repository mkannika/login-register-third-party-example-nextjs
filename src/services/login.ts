import { IResponseFormat } from "@/interfaces/IResponse";
import { UserResponse } from "@/interfaces/IUser";

/**
 * @description API function to login with Google using OAuth Google Provider Firebase
 * @param {string} email - The email of the user.
 * @param {string} provider - The provider of the user.
 * @param {string} providerUUID - The unique identifier of the user from the provider.
 * @returns {Promise<void>} - A promise that resolves when the login is successful.
 */

export const loginWithGoogle = (
  email: string,
  provider: string,
  providerUUID: string,
): Promise<IResponseFormat<UserResponse>> =>
  new Promise((resolve, reject) => {
    const body = {
      email,
      providerUUID,
      provider,
    };

    fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
