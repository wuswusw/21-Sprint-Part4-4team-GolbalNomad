"use client";

import Image from "next/image";
import { useRef, useCallback, useEffect, useState } from "react";
import useClickOutside from "@/hooks/use-click-outside";
import Notifications from "@/features/notification/components/notifications";
import { useNotifications } from "@/features/notification/hooks/use-notifications";
import { isNotificationJustNow } from "@/lib/utils";

interface GnbNotificationProps {
  isOpen: boolean;
  onToggle: () => void;
}

const JUST_NOW_UI_TICK_MS = 10_000;

function GnbNotification({ isOpen, onToggle }: GnbNotificationProps) {
  const notificationRef = useRef<HTMLDivElement>(null);
  const [, setJustNowTick] = useState(0);

  useEffect(() => {
    const id = window.setInterval(
      () => setJustNowTick((n) => n + 1),
      JUST_NOW_UI_TICK_MS
    );
    return () => window.clearInterval(id);
  }, []);

  const {
    notifications,
    totalCount,
    isLoading,
    deleteNotification,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useNotifications();

  const close = useCallback(() => {
    if (isOpen) onToggle();
  }, [isOpen, onToggle]);

  const handleToggle = useCallback(() => {
    if (!isOpen) {
      void refetch();
    }
    onToggle();
  }, [isOpen, onToggle, refetch]);

  useClickOutside(notificationRef, close, isOpen);

  const showRedDot = notifications.some((n) =>
    isNotificationJustNow(n.createdAt)
  );

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
      {showRedDot && (
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
          notifications={notifications}
          totalCount={totalCount}
          isLoading={isLoading}
          onDelete={deleteNotification}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}
    </div>
  );
}

export default GnbNotification;
