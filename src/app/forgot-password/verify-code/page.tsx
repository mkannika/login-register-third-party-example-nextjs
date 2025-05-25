import FormVerifyCode from "@/components/FormVerifyCode";
import LogoIcon from "@/components/LogoIcon";
import IMAGE_01 from "@/public/image_01.webp";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function VerifyCode() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 lg:pb-20 gap-2 lg:gap-16 xl:p-20 font-[family-name:var(--font-geist-sans)] max-w-[1140px] mx-auto">
      <header className="header w-full">
        <Link
          href="/"
          className="flex items-center gap-2 text-[#313131] text-[35px] leading-[150%] tracking-[-0.353px] font-bold"
        >
          <LogoIcon />
          <span>Your Logo</span>
        </Link>
      </header>
      <main className="lg:grid lg:grid-cols-2 grid-cols-1 gap-8 lg:gap-16 w-full h-full items-center flex flex-col justify-center">
        <div className="lg:max-w-[512px] w-full max-w-80">
          <div className="flex flex-col gap-2 lg:mb-6 mb-4">
            <Link
              href="/"
              className="text-[14px] font-medium hover:underline flex items-center gap-2 opacity-70 lg:mb-6 mb-4"
            >
              <ArrowLeft className="w-[16px]" /> Back to Login
            </Link>
            <h1 className="text-[#313131] text-2xl lg:text-[40px] font-bold lg:whitespace-nowrap">
              Verify code
            </h1>
            <p className="text-[#313131] text-[14px] lg:text-[16px] font-normal opacity-75">
              An authentication code has been sent to your email.
            </p>
          </div>
          <FormVerifyCode />
        </div>
        <div className="lg:max-w-[616px] w-full lg:flex flex-col items-center justify-center hidden">
          <div className="image-">
            <Image
              src={IMAGE_01.src}
              alt="Image"
              blurDataURL={IMAGE_01.blurDataURL}
              width={IMAGE_01.width}
              height={IMAGE_01.height}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
