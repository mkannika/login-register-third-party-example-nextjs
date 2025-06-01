import { RegisterRequestBody } from "@/interfaces/User";
import { auth } from "@/lib/firebase";
import { loginWithGoogle, registerWithGoogle } from "@/services/auth.service";
import { useAuthStore } from "@/stores/authStore";
import {
  generatePlaceholderImageUrl,
  usernameFromEmail,
} from "@/utils/common.utils";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useToast } from "./use-toast";
const useAuthenThirdParty = () => {
  const { toast } = useToast();
  const router = useRouter();
  // Only subscribe to setUser action
  const setUser = useAuthStore((state) => state.setUser);

  /**
   * @description Login with Google using OAuth Google Provider Firebase
   */
  const onLoginWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    googleProvider.addScope("email");

    try {
      // Sign in with Google
      const result = await signInWithPopup(auth, googleProvider);
      const { user } = result;

      // Validate user data
      if (!user?.providerData[0]?.email || !result.providerId) {
        toast({
          title: "Login Failed",
          description: "Unable to retrieve user information.",
        });
        return;
      }

      // Prepare data for API
      const data = {
        email: user.providerData[0].email,
        provider: "google",
        providerUUID: user.uid,
        name: user.displayName || "Unknown User",
      };

      // Call login API
      const res = await loginWithGoogle(
        data.email,
        data.provider,
        data.providerUUID,
      );

      if (res) {
        const { status, data: userData, message } = res;

        if (status) {
          // Successful login
          toast({
            title: "Logged In",
            description: "You have logged in successfully.",
            style: {
              backgroundColor: "#A7F3D0",
              borderColor: "#A7F3D0",
              color: "black",
            },
          });

          // Save user data to local storage
          setUser(userData);
          // localStorage.setItem("user", JSON.stringify(userData));

          // Redirect to profile
          router.push("/profile");
        } else {
          // Login failed with API error
          toast({
            title: "Login Failed",
            description: message || "An error occurred during login.",
            style: {
              backgroundColor: "#FF8682",
              borderColor: "#FF8682",
              color: "white",
            },
          });
        }
      }
    } catch (error: any) {
      // Handle errors from Firebase or API
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred.",
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
  const onRegisterWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    googleProvider.addScope("email");

    try {
      // Sign in with Google
      const result = await signInWithPopup(auth, googleProvider);
      const { user } = result;

      // Validate user data
      if (!user?.providerData[0]?.email || !result.providerId) {
        toast({
          title: "Registration Failed",
          description: "Unable to retrieve user information.",
        });
        return;
      }

      // Prepare data for API
      const name =
        user.displayName ||
        usernameFromEmail(user.providerData[0].email) ||
        "Unknown User";
      const data: RegisterRequestBody = {
        email: user.providerData[0].email,
        provider: "google",
        providerUUID: user.uid,
        name,
        photoURL: user.photoURL ?? generatePlaceholderImageUrl(name),
      };

      // Call register API
      const res = await registerWithGoogle(data);

      if (res) {
        const { status, message } = res;

        if (status) {
          // Successful registration
          toast({
            title: "Registered",
            description: "You have registered successfully.",
            style: {
              backgroundColor: "#A7F3D0",
              borderColor: "#A7F3D0",
              color: "black",
            },
          });

          setUser(res.data);

          // Redirect to profile
          router.push("/profile");
        } else {
          // Registration failed with API error
          toast({
            title: "Registration Failed",
            description: message || "An error occurred during registration.",
            style: {
              backgroundColor: "#FF8682",
              borderColor: "#FF8682",
              color: "white",
            },
          });
        }
      }
    } catch (error: any) {
      // Handle errors from Firebase or API
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred.",
        style: {
          backgroundColor: "#FF8682",
          borderColor: "#FF8682",
          color: "white",
        },
      });
    }
  };

  return {
    onLoginWithGoogle,
    onRegisterWithGoogle,
  };
};

export default useAuthenThirdParty;
