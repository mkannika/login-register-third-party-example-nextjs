export const MESSAGES = {
  AUTH: {
    // Auth messages
    LOGIN_SUCCESS: "Login successful",
    LOGIN_FAILURE: "Login failed. Please check your credentials.",
    REGISTER_SUCCESS:
      "Registration successful. Please check your email to verify your account.",
    REGISTER_FAILURE: "Registration failed. Please try again later.",
    RESET_PASSWORD_SUCCESS: "Reset password email sent successfully",
    RESET_PASSWORD_FAILURE:
      "Failed to send password reset link. Please try again later.",
    RESET_PASSWORD_IS_PENDING:
      "A reset password request is already in progress. Please check your email.",

    // Profile messages
    PROFILE_UPDATE_SUCCESS: "Profile updated successfully.",
    PROFILE_UPDATE_FAILURE: "Failed to update profile. Please try again later.",
  },

  // Common messages
  COMMON: {
    SUCCESS: "Success",
    FAILURE: "Failed",
  },

  // Error messages
  ERROR: {
    // Auth errors
    LOGIN_FAILURE: "Invalid email or password.",
    REGISTER_FAILURE: "Email already exists.",
    RESET_PASSWORD_FAILURE: "Invalid token.",
    VERIFY_EMAIL_FAILURE: "Invalid token.",
    FORGOT_PASSWORD_FAILURE: "Invalid email.",
  },
};
