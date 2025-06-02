export interface IUser {
  email: string;
  jwtToken: string;
  refreshToken: string;
}

export interface LoginRequestBody {
  email: string;
  providerUUID?: string;
  provider?: string;
  password?: string;
}

// Define the shape of the user response
export interface UserResponse
  extends Pick<LoginRequestBody, "provider" | "providerUUID"> {
  id: string;
  email: string;
  name: string;
  photoURL: string;
}

export type RegisterRequestBody = Pick<
  UserResponse,
  "email" | "provider" | "providerUUID" | "photoURL" | "name"
>;
