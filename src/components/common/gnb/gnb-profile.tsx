"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useCallback } from "react";
import useClickOutside from "@/hooks/useClickOutside";

interface GnbProfileProps {
  nickname?: string;
  profileImage?: string;
  isOpen: boolean;
  onToggle: () => void;
  onLogout: () => void;
}

function GnbProfile({
  nickname,
  profileImage,
  isOpen,
  onToggle,
  onLogout,
}: GnbProfileProps) {
  const profileRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    if (isOpen) onToggle();
  }, [isOpen, onToggle]);

  useClickOutside(profileRef, close, isOpen);

  return (
    <div className="flex items-center">
      <Image
        src={profileImage || "/assets/images/default profile.png"}
        alt="profile"
        width={30}
        height={30}
        unoptimized
        className="w-[30px] h-[30px] rounded-full"
      />
      <div className="relative" ref={profileRef}>
        <span
          className="text-14 text-gray-950 ml-[10px] cursor-pointer"
          onClick={onToggle}
        >
          {nickname || "이름 없음"}
        </span>
        {isOpen && (
          <div className="flex flex-col items-center justify-center w-32 px-[14px] py-4 rounded-xl shadow-[0px_2px_8px_0px_#78748640] absolute top-9 right-0 z-100">
            <ul className="w-full flex flex-col gap-[14px] justify-center text-16 text-gray-600">
              <li>
                <button
                  className="w-full flex items-center justify-center text-14 py-[15px] hover:ring-primary-100 hover:ring-2 hover:text-gray-950 rounded-xl"
                  onClick={onLogout}
                >
                  로그아웃
                </button>
              </li>
              <li>
                <Link
                  href="/main/profile"
                  className="flex items-center justify-center text-14 py-[15px] hover:ring-primary-100 hover:ring-2 hover:text-gray-950 rounded-xl"
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
