import FormNewPassword from "@/components/FormNewPassword";
import LogoIcon from "@/components/LogoIcon";
import IMAGE from "@/public/image_03.webp";
import Image from "next/image";
import Link from "next/link";

export default function PageNewPassword() {
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
          <div className="flex flex-col gap-4 lg:gap-6 lg:mb-6 mb-4">
            <h1 className="text-[#313131] text-2xl lg:text-[40px] font-bold lg:whitespace-nowrap">
              Set a password
            </h1>
            <p className="text-[#313131] text-[14px] lg:text-[16px] font-normal opacity-75">
              Your previous password has been reseted. Please set a new password
              for your account.
            </p>
          </div>
          <FormNewPassword />
        </div>
        <div className="lg:max-w-[616px] w-full lg:flex flex-col items-center justify-center hidden">
          <div className="image-">
            <Image
              src={IMAGE.src}
              alt="Image"
              blurDataURL={IMAGE.blurDataURL}
              width={IMAGE.width}
              height={IMAGE.height}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
