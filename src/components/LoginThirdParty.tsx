"use client";

import AppleIcon from "@/components/AppleIcon";
import FacebookIcon from "@/components/FacebookIcon";
import GoogleIcon from "@/components/GoogleIcon";

export default function LoginThirdParty() {

  return (
    <div className="flex justify-center items-center flex-col font-[500] my-6">
      {/* <DividerWithText
        content={
          <span className="whitespace-nowrap inline-block relative top-[-2px] text-[12px]">
            Or authorize with
          </span>
        }
      /> */}
      <div className="grid grid-cols-3 gap-2 w-full">
        <button
          className="w-full btn-third-party flex-1 gap-1"
          onClick={() => console.log("Facebook")}
        >
          <FacebookIcon />
        </button>
        <button
          className="w-full btn-third-party flex-1 gap-1"
          onClick={() => console.log("Google")}
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
