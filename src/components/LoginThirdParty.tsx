"use client";

import GoogleIcon from "@/components/GoogleIcon";
import useAuthThirdParty from "@/hooks/useAuthThirdParty";
import AppleIcon from "./AppleIcon";
import FacebookIcon from "./FacebookIcon";

export default function LoginThirdParty() {
  const { onLoginWithGoogle } = useAuthThirdParty();

  return (
    <div className="flex justify-center items-center flex-col font-[500] mt-6">
      <div className="flex justify-center items-center gap-2 w-full">
        <button
          className="w-full btn-third-party flex-1 gap-1"
          onClick={() => console.log("Facebook")}
        >
          <FacebookIcon />
        </button>
        <button
          className="w-full btn-third-party flex-1 gap-1"
          onClick={onLoginWithGoogle}
        >
          <GoogleIcon />
        </button>
        <button className="w-full btn-third-party flex-1 gap-1">
          <AppleIcon />
        </button>
      </div>
    </div>
  );
}
