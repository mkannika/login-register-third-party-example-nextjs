import { auth } from "@/lib/firebase";
import { loginWithGoogle, registerWithGoogle } from "@/services/auth.service";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useToast } from "./use-toast";

const useAuthenThirdParty = () => {
  const { toast } = useToast();

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
          localStorage.setItem("user", JSON.stringify(userData));
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
      const data = {
        email: user.providerData[0].email,
        provider: "google",
        providerUUID: user.uid,
        name: user.displayName || "Unknown User",
      };

      // Call register API
      const res = await registerWithGoogle(
        data.email,
        data.provider,
        data.providerUUID,
        data.name,
      );

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
