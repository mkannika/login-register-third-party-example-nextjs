import { auth } from "@/lib/firebase";
import { loginWithGoogle } from "@/services/login";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const useLoginThirdParty = () => {
  /**
   * @description Login with Google using OAuth Google Provider Firebase
   */
  const onLoginWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    googleProvider.addScope("email");
    await signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        const { user } = result;
        if (
          user.providerData[0].email !== null &&
          user.providerData[0].email !== undefined &&
          result.providerId !== null &&
          result.providerId !== undefined
        ) {
          console.log({
            email: user.providerData[0].email,
            provider: "google",
            providerUUID: user.uid,
          });

          // After successful login, signin the user to api login
          const data = {
            email: user.providerData[0].email,
            provider: "google",
            providerUUID: user.uid,
          };

          const res = await loginWithGoogle(
            data.email,
            data.provider,
            data.providerUUID,
          );
          if (res) {
            const { status, data, message } = res;
            if (status) {
              console.log({
                title: "Logged In",
                type: "success",
                text: "Logged successfully",
              });
              // Save the user data to local storage
              localStorage.setItem("user", JSON.stringify(data));
            } else {
              console.log({
                title: "Login failed",
                type: "error",
                text: message,
              });
            }
          }
        } else {
          console.log({
            title: "Loged In failed",
            type: "error",
            text: "Logged unsuccessfully",
          });
        }
      })
      .catch((_error) => {
        console.log({
          title: "Error",
          type: "error",
          text: _error.message || "Failed to Login",
        });
      });
  };

  return {
    onLoginWithGoogle,
  };
};

export default useLoginThirdParty;
