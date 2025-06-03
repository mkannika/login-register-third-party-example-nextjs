"use client";

import { loginEmailPassword } from "@/services/auth.service";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

const useAuth = () => {
  const router = useRouter();
  // Only subscribe to setUser action
  const setUser = useAuthStore((state) => state.setUser);

  const loginByEmail = useCallback(
    async (email: string, password: string) => {
      const res = await loginEmailPassword({
        email,
        password,
      });
      if (res.status) {
        setUser({
          email: res.data.email,
          name: res.data.name || "Unknown User",
          photoURL: res.data.photoURL || "",
        });
        router.push("/profile");
      }
    },
    [setUser, router],
  );

  const handleLogout = useCallback(() => {
    console.log("Logging out...");
    // Clear user data and redirect to home
    setUser(null);
    // It clears the auth token from cookies, effectively logging out the user.
    router.push("/");
  }, [setUser, router]);

  return {
    handleLogout,
    loginByEmail,
  };
};

export default useAuth;
