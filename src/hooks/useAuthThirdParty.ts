"use client";

import { RegisterRequestBody } from "@/interfaces/User";
import { auth } from "@/lib/firebase";
import {
  loginWithProvider,
  registerWithProvider,
} from "@/services/authThirdParty.service";
import { useAuthStore } from "@/stores/authStore";
import {
  generatePlaceholderImageUrl,
  usernameFromEmail,
} from "@/utils/common.utils";
import {
  FacebookAuthProvider,
  fetchSignInMethodsForEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { useToast } from "./use-toast";

type ProviderType = "google" | "facebook";

const useAuthThirdParty = () => {
  const { toast } = useToast();
  const router = useRouter();
  // Only subscribe to setUser action
  const setUser = useAuthStore((state) => state.setUser);

  /**
   * @description Login with OAuth Provider (Google or Facebook)
   */
  const loginWithOAuthProvider = async (providerType: ProviderType) => {
    let provider: GoogleAuthProvider | FacebookAuthProvider;
    if (providerType === "google") {
      provider = new GoogleAuthProvider();
      provider.addScope("email");
    } else if (providerType === "facebook") {
      provider = new FacebookAuthProvider();
      provider.addScope("email");
    } else {
      toast({
        title: "Provider Error",
        description: "Invalid authentication provider.",
      });
      return;
    }

    try {
      // Sign in with selected provider
      const result = await signInWithPopup(auth, provider);
      const { user } = result;

      if (!user?.providerData[0]?.email || !result.providerId) {
        toast({
          title: "Login Failed",
          description: "Unable to retrieve user information.",
        });
        return;
      }

      // Call login API
      const res = await loginWithProvider({
        email: user.providerData[0].email,
      });

      if (res) {
        const { status, data: userData, message } = res;

        if (status) {
          // If login is successful, set user data in the store
          setUser({
            email: userData.email,
            name: userData.name,
            photoURL:
              userData.photoURL || generatePlaceholderImageUrl(userData.name),
          });

          toast({
            title: "Logged In",
            description: "You have logged in successfully.",
            style: {
              backgroundColor: "#A7F3D0",
              borderColor: "#A7F3D0",
              color: "black",
            },
          });

          setTimeout(() => {
            router.push("/profile");
          }, 1000);
        } else {
          toast({
            title: "Login Failed",
            description: message || "เกิดข้อผิดพลาดในการเข้าสู่ระบบ",
            style: {
              backgroundColor: "#FF8682",
              borderColor: "#FF8682",
              color: "white",
            },
          });
        }
      }
    } catch (error: any) {
      // Handle account-exists-with-different-credential
      if (error.code === "auth/account-exists-with-different-credential") {
        const email = error.customData?.email;
        console.log("email", email);
        console.log("data", error.customData);

        if (email) {
          const methods = await fetchSignInMethodsForEmail(auth, email);

          // Guide user to sign in with the existing provider
          if (methods.includes("password")) {
            toast({
              title: "บัญชีนี้มีอยู่แล้วโดยใช้รหัสผ่าน",
              description:
                "กรุณาเข้าสู่ระบบด้วยรหัสผ่านของคุณเพื่อเชื่อมโยงผู้ให้บริการนี้",
              style: {
                backgroundColor: "#FF8682",
                borderColor: "#FF8682",
                color: "white",
              },
            });
            // Optionally, prompt for password and link
            // (You can implement a modal for password input here)
          } else if (
            methods.includes("google.com") ||
            methods.includes("facebook.com")
          ) {
            const existingProvider = methods.includes("google.com")
              ? "Google"
              : "Facebook";
            toast({
              title: "บัญชีนี้มีอยู่แล้ว",
              description: `บัญชีนี้มีอยู่แล้วโดยใช้ ${existingProvider} โปรดเข้าสู่ระบบด้วย ${existingProvider} และเชื่อมโยงจากโปรไฟล์ของคุณ`,
              style: {
                backgroundColor: "#FF8682",
                borderColor: "#FF8682",
                color: "white",
              },
            });
          } else {
            toast({
              title: "บัญชีนี้มีอยู่แล้ว",
              description: `โปรดเข้าสู่ระบบด้วยผู้ให้บริการที่มีอยู่แล้วและเชื่อมโยงจากโปรไฟล์ของคุณ`,
              style: {
                backgroundColor: "#FF8682",
                borderColor: "#FF8682",
                color: "white",
              },
            });
          }
        }
        return;
      }

      toast({
        title: "Error",
        description: error.message || "เกิดข้อผิดพลาดที่ไม่คาดคิด",
        style: {
          backgroundColor: "#FF8682",
          borderColor: "#FF8682",
          color: "white",
        },
      });
    }
  };

  /**
   * @description Register with Google using OAuth Google Provider Firebase
   */
  // Register with Google or Facebook
  const registerWithOAuthProvider = async (providerType: ProviderType) => {
    let provider;
    if (providerType === "google") {
      provider = new GoogleAuthProvider();
      provider.addScope("email");
    } else if (providerType === "facebook") {
      provider = new FacebookAuthProvider();
      provider.addScope("email");
    } else {
      toast({
        title: "Provider Error",
        description: "Invalid authentication provider.",
      });
      return;
    }

    try {
      const result = await signInWithPopup(auth, provider);
      const { user } = result;

      if (!user?.providerData[0]?.email || !result.providerId) {
        toast({
          title: "Registration Failed",
          description: "Unable to retrieve user information.",
        });
        return;
      }

      const name =
        user.displayName ||
        usernameFromEmail(user.providerData[0].email) ||
        "Unknown User";
      const data: RegisterRequestBody = {
        email: user.providerData[0].email,
        provider: user.providerData[0].providerId,
        providerUUID: user.uid,
        name,
        photoURL: user.photoURL ?? generatePlaceholderImageUrl(name),
      };

      const res = await registerWithProvider(data);

      if (res?.status) {
        toast({
          title: "Registered",
          description: "You have registered successfully.",
          style: {
            backgroundColor: "#A7F3D0",
            borderColor: "#A7F3D0",
            color: "black",
          },
        });

        setUser({
          email: data.email,
          name: data.name,
          photoURL: data.photoURL || generatePlaceholderImageUrl(data.name),
        });

        router.push("/profile");
      } else {
        toast({
          title: "Registration Failed",
          description: res?.message || "An error occurred during registration.",
          style: {
            backgroundColor: "#FF8682",
            borderColor: "#FF8682",
            color: "white",
          },
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "เกิดข้อผิดพลาดที่ไม่คาดคิด",
        style: {
          backgroundColor: "#FF8682",
          borderColor: "#FF8682",
          color: "white",
        },
      });
    }
  };

  return {
    loginWithOAuthProvider,
    registerWithOAuthProvider,
  };
};

export default useAuthThirdParty;
