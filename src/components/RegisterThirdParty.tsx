"use client";

import GoogleIcon from "@/components/GoogleIcon";
import useLoginThirdParty from "@/hooks/useAuthenThirdParty";

export default function LoginThirdParty() {
  const { onRegisterWithGoogle } = useLoginThirdParty();

  return (
    <div className="flex justify-center items-center flex-col font-[500] mt-6">
      <div className="grid grid-cols-3 gap-2 w-full">
        <button
          className="w-full btn-third-party flex-1 gap-1"
          onClick={onRegisterWithGoogle}
        >
          <GoogleIcon />
        </button>
      </div>
    </div>
  );
}
