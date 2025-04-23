"use client";

import GoogleIcon from "@/components/GoogleIcon";
import useLoginThirdParty from "@/hooks/useLoginThirdParty";

export default function LoginThirdParty() {

  const { onLoginWithGoogle } = useLoginThirdParty();

  return (
    <div className="flex justify-center items-center flex-col font-[500]">
      <div className="grid grid-cols-3 gap-2 w-full">
        {/* <button
          className="w-full btn-third-party flex-1 gap-1"
          onClick={() => console.log("Facebook")}
        >
          <FacebookIcon />
        </button> */}
        <button
          className="w-full btn-third-party flex-1 gap-1"
          onClick={onLoginWithGoogle}
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
