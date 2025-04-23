import FormLogin from "@/components/FormLogin";
import LogoIcon from "@/components/LogoIcon";
import IMAGE_LOGIN from "@/public/image_01.webp";
import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 lg:pb-20 lg:gap-16 xl:p-20 font-[family-name:var(--font-geist-sans)] max-w-[1140px] mx-auto">
      <header className="header w-full">
        <Link href="/" className="flex items-center gap-2 text-[#313131] text-[35px] leading-[150%] tracking-[-0.353px] font-bold">
          <LogoIcon />
          <span>Your Logo</span>
        </Link>
      </header>
      <main className="grid lg:grid-cols-2 grid-cols-1 gap-8 lg:gap-16 w-full h-full items-center">
        <div className="lg:max-w-[512px] w-full">
          <div className="flex flex-col gap-2 mb-10">
            <h1 className="text-[#313131] text-[40px] font-bold">Login</h1>
            <p className="text-[#313131] text-[16px] font-normal opacity-75">
              Welcome back! Please login to your account.
            </p>
          </div>
          <FormLogin />
        </div>
        <div className="lg:max-w-[616px] w-full flex flex-col items-center justify-center">
          <div className="image-">
            <Image
              src={IMAGE_LOGIN.src}
              alt="Login Image"
              blurDataURL={IMAGE_LOGIN.blurDataURL}
              width={IMAGE_LOGIN.width}
              height={IMAGE_LOGIN.height}
            />
          </div>
        </div>
      </main>
    </div>
  );
}