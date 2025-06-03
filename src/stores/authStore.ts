import { UserStorage } from "@/interfaces/User";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
  user: UserStorage | null;
  setUser: (user: UserStorage | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: "auth-store", // key in localStorage
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user }), // only persist user
    },
  ),
);

// Only subscribe to the user value
// const user = useAuthStore((state) => state.user);

// Only subscribe to logout action
// const logout = useAuthStore((state) => state.logout);
