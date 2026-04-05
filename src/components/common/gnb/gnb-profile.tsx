"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useCallback } from "react";
import useClickOutside from "@/hooks/useClickOutside";

interface GnbProfileProps {
  nickname?: string;
  profileImage?: string;
  isOpen: boolean;
  onToggle: () => void;
  onLogout: () => void | Promise<void>;
}

function GnbProfile({
  nickname,
  profileImage,
  isOpen,
  onToggle,
  onLogout,
}: GnbProfileProps) {
  const router = useRouter();
  const profileRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    if (isOpen) onToggle();
  }, [isOpen, onToggle]);

  useClickOutside(profileRef, close, isOpen);

  const handleLogout = async () => {
    await onLogout();
    router.push("/?authMessage=logout");
  };

  return (
    <div className="flex items-center">
      <Image
        src={profileImage || "/assets/images/default profile.png"}
        alt="profile"
        width={30}
        height={30}
        unoptimized
        className="h-[30px] w-[30px] rounded-full"
      />
      <div className="relative" ref={profileRef}>
        <span
          className="ml-[10px] cursor-pointer text-14 text-gray-950"
          onClick={onToggle}
        >
          {nickname || "이름 없음"}
        </span>
        {isOpen && (
          <div className="absolute top-9 right-0 z-50 flex w-32 flex-col items-center justify-center rounded-xl bg-white px-[14px] py-4 shadow-[0px_2px_8px_0px_#78748640]">
            <ul className="flex w-full flex-col justify-center gap-[14px] text-16 text-gray-600">
              <li>
                <button
                  className="hover:ring-primary-100 hover:text-gray-950 flex w-full items-center justify-center rounded-xl py-[15px] text-14 hover:ring-2"
                  onClick={handleLogout}
                >
                  로그아웃
                </button>
              </li>
              <li>
                <Link
                  href="/main/profile"
                  className="hover:ring-primary-100 hover:text-gray-950 flex items-center justify-center rounded-xl py-[15px] text-14 hover:ring-2"
                >
                  마이페이지
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default GnbProfile;