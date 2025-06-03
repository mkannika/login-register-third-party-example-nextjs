"use client";

import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

const useAuth = () => {
  const router = useRouter();
  // Only subscribe to setUser action
  const setUser = useAuthStore((state) => state.setUser);

  const handleLogout = useCallback(() => {
    console.log("Logging out...");
    // Clear user data and redirect to home
    setUser(null);
    // It clears the auth token from cookies, effectively logging out the user.
    router.push("/");
  }, [setUser, router]);

  return {
    handleLogout,
  };
};

export default useAuth;
