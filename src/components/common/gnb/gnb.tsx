"use client";

import { useState, useCallback } from "react";
import GnbLogo from "./gnb-logo";
import GnbAuth from "./gnb-auth";
import GnbNotification from "./gnb-notification";
import GnbProfile from "./gnb-profile";

interface GnbProps {
  isLogin?: boolean;
  nickname?: string;
  profileImage?: string;
  onLogout?: () => void;
}

function Gnb({
  isLogin = false,
  nickname,
  profileImage,
  onLogout,
}: GnbProps) {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleNotificationToggle = useCallback(() => {
    setIsNotificationOpen((prev) => !prev);
    setIsProfileOpen(false);
  }, []);

  const handleProfileToggle = useCallback(() => {
    setIsProfileOpen((prev) => !prev);
    setIsNotificationOpen(false);
  }, []);

  const handleLogout = useCallback(() => {
    setIsProfileOpen(false);
    onLogout?.();
  }, [onLogout]);

  return (
    <div className="flex justify-between items-center w-full h-12 tablet:h-[80px] desktop:px-50 tablet:px-[30px] px-6 tablet:py-6 py-2">
      <GnbLogo />

      {!isLogin ? (
        <GnbAuth />
      ) : (
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
  );
}

export default Gnb;