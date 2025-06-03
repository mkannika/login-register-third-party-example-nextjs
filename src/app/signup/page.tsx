import BaseProvider from "@/components/BaseProvider";
import FormRegister from "@/components/FormRegister";
import LogoIcon from "@/components/LogoIcon";
import IMAGE_REGISTER from "@/public/image_02.webp";
import Image from "next/image";
import Link from "next/link";

export default function SignUp() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 lg:pb-20 lg:gap-16 xl:p-20 font-[family-name:var(--font-geist-sans)] max-w-[1140px] mx-auto">
      <header className="header w-full">
        <Link
          href="/"
          className="flex items-center gap-2 text-[#313131] sm:text-[35px] text-lg leading-[150%] tracking-[-0.353px] font-bold justify-end"
        >
          <div className="sm:w-[34px] sm:h-[34px] flex items-center justify-center w-[20px]">
            <LogoIcon />
          </div>
          <span>Your Logo</span>
        </Link>
      </header>
      <main className="lg:grid lg:grid-cols-2 grid-cols-1 gap-8 lg:gap-16 w-full h-full items-center flex flex-col justify-center">
        <div className="lg:max-w-[512px] w-full max-w-80 order-2">
          <div className="flex flex-col gap-2 sm:mb-10 mb-4">
            <h1 className="text-[#313131] text-2xl lg:text-[40px] font-bold">
              Sign up
            </h1>
            <p className="text-[#313131] text-[16px] font-normal opacity-75">
              Let’s get you all st up so you can access your personal account.
            </p>
          </div>
          <BaseProvider>
            <FormRegister />
          </BaseProvider>
        </div>
        <div className="lg:max-w-[616px] w-full lg:flex flex-col items-center justify-center hidden">
          <div className="image-register">
            <Image
              src={IMAGE_REGISTER.src}
              alt="Register Image"
              blurDataURL={IMAGE_REGISTER.blurDataURL}
              width={IMAGE_REGISTER.width}
              height={IMAGE_REGISTER.height}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
