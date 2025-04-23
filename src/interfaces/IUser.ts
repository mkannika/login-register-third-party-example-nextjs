export interface IUser {
  email: string;
  jwtToken: string;
  refreshToken: string;
}

export interface LoginRequestBody {
  email: string;
  providerUUID: string;
  provider: string;
}

// Define the shape of the user response
export interface UserResponse {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
}
