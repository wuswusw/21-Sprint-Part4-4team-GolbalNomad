"use client";

import Image from "next/image";
import { useRef, useCallback } from "react";
import useClickOutside from "@/hooks/useClickOutside";
import Notifications from "@/features/notification/components/notifications";

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
      <Image
        src={isOpen ? "/assets/icons/bellBlue.svg" : "/assets/icons/bell.svg"}
        alt="bell"
        width={24}
        height={24}
        onClick={onToggle}
        className="w-[24px] h-[24px] cursor-pointer"
      />
      <Image
        src="/assets/icons/statusDot.svg"
        alt="stateDot"
        width={8}
        height={8}
        className="absolute top-0 right-0"
      />
      {isOpen && (
        <Notifications onClose={close} />
      )}
    </div>
  );
}

export default GnbNotification;
