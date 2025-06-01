"use client";

import LogoIcon from "@/components/LogoIcon";
import { useAuthStore } from "@/stores/authStore";
import { generatePlaceholderImageUrl } from "@/utils/common.utils";
import Image from "next/image";
import Link from "next/link";

export default function Dashboard() {
  const user = useAuthStore((state) => state.user);
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
          <div className="lg:max-w-[512px] w-full max-w-80 mx-auto">
            {/* Avatar */}
            <div className="flex flex-col gap-2 w-full space-y-4">
              <h1 className="text-[#313131] text-2xl lg:text-[40px] font-bold">
                My Profile
              </h1>
              <div className="space-y-2">
                {user?.name && (
                  <div className="avatar">
                    <Image
                      src={
                        user?.photoURL ||
                        generatePlaceholderImageUrl(user?.name)
                      }
                      alt="Avatar"
                      className="w-10 h-10 rounded-full"
                      width={40}
                      height={40}
                    />
                  </div>
                )}
                <div className="text-[#313131] text-[16px] font-bold">
                  {user?.name}
                </div>
                <div className="text-[#313131] text-[16px] font-bold">
                  {user?.email}
                </div>
              </div>
              {/* Logout Button */}
              <button type="submit" className="hover:opacity-75">
                Logout
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
