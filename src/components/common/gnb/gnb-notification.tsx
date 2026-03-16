"use client";

import { useRef, useCallback } from "react";
import useClickOutside from "@/hooks/useClickOutside";

interface GnbNotificationProps {
  isOpen: boolean;
  onToggle: () => void;
}

function GnbNotification({ isOpen, onToggle }: GnbNotificationProps) {
  const notificationRef = useRef<HTMLDivElement>(null);
  const close = useCallback(() => {
    if (isOpen) onToggle();
  }, [isOpen, onToggle]);

  useClickOutside(notificationRef, close, isOpen);

  return (
    <div className="relative" ref={notificationRef}>
      <img
        src={isOpen ? "/assets/icons/bellBlue.svg" : "/assets/icons/bell.svg"}
        alt="bell"
        onClick={onToggle}
        className="w-[24px] h-[24px] cursor-pointer"
      />
      <img
        src="/assets/icons/statusDot.svg"
        alt="stateDot"
        className="absolute top-0 right-0"
      />
      {isOpen && (
        <div className="absolute w-60 h-60 top-9 right-0 bg-white rounded-lg shadow-[0px_2px_8px_0px_#78748640]">
          <h1>알림</h1>
        </div>
      )}
    </div>
  );
}

export default GnbNotification;
