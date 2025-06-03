"use client";

import GoogleIcon from "@/components/GoogleIcon";
import useAuthThirdParty from "@/hooks/useAuthThirdParty";
import FacebookIcon from "./FacebookIcon";

export default function LoginThirdParty() {
  const { loginWithOAuthProvider } = useAuthThirdParty();

  return (
    <div className="flex justify-center items-center flex-col font-[500] mt-6">
      <div className="flex justify-center items-center gap-2 w-full">
        <button
          className="w-full btn-third-party flex-1 gap-1"
          onClick={() => loginWithOAuthProvider("facebook")}
        >
          <FacebookIcon />
        </button>
        <button
          className="w-full btn-third-party flex-1 gap-1"
          onClick={() => loginWithOAuthProvider("google")}
        >
          <GoogleIcon />
        </button>
        {/* <button className="w-full btn-third-party flex-1 gap-1">
          <AppleIcon />
        </button> */}
      </div>
    </div>
  );
}
