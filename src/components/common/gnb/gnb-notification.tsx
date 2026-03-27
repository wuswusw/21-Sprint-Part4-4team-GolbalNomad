"use client";

import Image from "next/image";
import { useRef, useCallback, useState, useEffect } from "react";
import useClickOutside from "@/hooks/use-click-outside";
import Notifications from "@/features/notification/components/notifications";
import { useNotifications } from "@/features/notification/hooks/use-notifications";

const LAST_READ_KEY = "lastNotificationReadAt";

interface GnbNotificationProps {
  isOpen: boolean;
  onToggle: () => void;
}

function GnbNotification({ isOpen, onToggle }: GnbNotificationProps) {
  const notificationRef = useRef<HTMLDivElement>(null);
  const [lastReadAt, setLastReadAt] = useState<string | null>(null);
  const { notifications, totalCount, isLoading, deleteNotification } =
    useNotifications();

  useEffect(() => {
    setLastReadAt(localStorage.getItem(LAST_READ_KEY));
  }, []);

  const close = useCallback(() => {
    if (isOpen) onToggle();
  }, [isOpen, onToggle]);

  const handleToggle = useCallback(() => {
    if (!isOpen) {
      const now = new Date().toISOString();
      localStorage.setItem(LAST_READ_KEY, now);
      setLastReadAt(now);
    }
    onToggle();
  }, [isOpen, onToggle]);

  useClickOutside(notificationRef, close, isOpen);

  const hasUnread =
    notifications.length > 0 &&
    (!lastReadAt ||
      notifications.some(
        (notification) => new Date(notification.createdAt) > new Date(lastReadAt)
      ));

  return (
    <div className="relative" ref={notificationRef}>
      <Image
        src={isOpen ? "/assets/icons/bellBlue.svg" : "/assets/icons/bell.svg"}
        alt="bell"
        width={24}
        height={24}
        onClick={handleToggle}
        className="w-[24px] h-[24px] cursor-pointer"
      />
      {hasUnread && (
        <Image
          src="/assets/icons/statusDot.svg"
          alt="stateDot"
          width={8}
          height={8}
          className="absolute top-0 right-0"
        />
      )}
      {isOpen && (
        <Notifications
          onClose={close}
          lastReadAt={lastReadAt}
          notifications={notifications}
          totalCount={totalCount}
          isLoading={isLoading}
          onDelete={deleteNotification}
        />
      )}
    </div>
  );
}

export default GnbNotification;
