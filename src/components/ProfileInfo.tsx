"use client";

import useAuth from "@/hooks/useAuth";
import { useAuthStore } from "@/stores/authStore";
import { generatePlaceholderImageUrl } from "@/utils/common.utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function ProfileSkeleton() {
  return (
    <div className="lg:max-w-[512px] w-full max-w-80 mx-auto animate-pulse">
      <div className="flex flex-col gap-2 w-full space-y-4">
        <div className="h-10 w-32 bg-gray-200 rounded mb-4" />
        <div className="avatar">
          <div className="w-10 h-10 rounded-full bg-gray-200" />
        </div>
        <div className="h-4 w-24 bg-gray-200 rounded my-2" />
        <div className="h-4 w-40 bg-gray-200 rounded my-2" />
        <div className="h-10 w-24 bg-gray-200 rounded mt-4" />
      </div>
    </div>
  );
}

export default function ProfileInfo() {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const { handleLogout } = useAuth();

  useEffect(() => {
    if (!user) router.push("/");
  }, [user]);

  return (
    <div className="lg:max-w-[512px] w-full max-w-80 mx-auto">
      {/* Avatar */}
      <div className="flex flex-col gap-2 w-full space-y-4">
        <h1 className="text-[#313131] text-2xl lg:text-[40px] font-bold">
          My Profile
        </h1>
        <div className="space-y-2">
          {user?.name && user?.photoURL && (
            <div className="avatar">
              <Image
                src={user?.photoURL || generatePlaceholderImageUrl(user?.name)}
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
        <button
          type="button"
          className="hover:opacity-75 btn-purple"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
