import LogoIcon from "@/components/LogoIcon";
import ProfileInfo from "@/components/ProfileInfo";
import Link from "next/link";

export default function Profile() {
  return (
    <div className="bg-[#EFF3FF] fixed w-full h-full top-0 left-0">
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
        <main className="lg:grid grid-cols-1 gap-8 lg:gap-16 w-full flex flex-col justify-center my-6">
          <ProfileInfo />
        </main>
      </div>
    </div>
  );
}
