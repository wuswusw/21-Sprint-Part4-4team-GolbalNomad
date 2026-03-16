"use client";

import { useState, useCallback } from "react";
import GnbLogo from "./gnb-logo";
import GnbAuth from "./gnb-auth";
import GnbNotification from "./gnb-notification";
import GnbProfile from "./gnb-profile";

interface GnbProps {
  nickname?: string;
  profileImage?: string;
}

function Gnb({ nickname, profileImage }: GnbProps) {
  const [isLogin, setIsLogin] = useState(false); // api 연결 후 상태 관리 변경해야함
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleNotificationToggle = useCallback(() => setIsNotificationOpen((prev) => !prev), []);
  const handleProfileToggle = useCallback(() => setIsProfileOpen((prev) => !prev), []);
  const handleLogout = useCallback(() => setIsLogin(false), []);

  return (
    <div>
      <button
        onClick={() => setIsLogin((prev) => !prev)}
        className="fixed bottom-4 right-4 z-50 bg-primary-500 text-white px-3 py-1 rounded text-12"
      >
        임시 로그인 토글 (전역 로그인 상태 관리 적용 후 삭제해야함)
      </button>
      <div className="flex justify-between items-center w-full h-12 tablet:h-[80px] desktop:px-50 tablet:px-[30px] px-6 tablet:py-6 py-2">
        <GnbLogo />
        {!isLogin && (
            <GnbAuth />
        )}
        {isLogin && (
          <div className="flex items-center">
            <GnbNotification
              isOpen={isNotificationOpen}
              onToggle={handleNotificationToggle}
            />
            <span className="mx-5 text-gray-100">|</span>
            <GnbProfile
              nickname={nickname}
              profileImage={profileImage}
              isOpen={isProfileOpen}
              onToggle={handleProfileToggle}
              onLogout={handleLogout}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Gnb;
