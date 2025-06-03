export interface IUser {
  email: string;
  jwtToken: string;
  refreshToken: string;
}

export interface LoginRequestBody {
  email: string;
  providerUUID?: string;
  provider?: string;
  password?: string; // Optional for third-party logins
}

// Define the shape of the user response
export interface UserResponse
  extends Pick<LoginRequestBody, "provider" | "providerUUID"> {
  id: string;
  email: string;
  name: string;
  photoURL?: string;
  password?: string;
}

export type RegisterRequestBody = Pick<
  UserResponse,
  "email" | "provider" | "providerUUID" | "photoURL" | "name" | "password"
>;

// Type User for save in localStorage public data ONLY
export type UserStorage = {
  email: string;
  name: string;
  photoURL: string;
};
