"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import AlertModal from "@/components/common/modal/alert-modal";
import {
  consumeAuthMessage,
  subscribeAuthMessage,
} from "@/features/auth/lib/auth-message";

export default function AuthMessageListener() {
  const pathname = usePathname();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const openAuthMessageModal = () => {
      const nextMessage = consumeAuthMessage();
      if (!nextMessage) return;

      setMessage(nextMessage);
    };

    const unsubscribe = subscribeAuthMessage(openAuthMessageModal);
    const timeoutId = window.setTimeout(openAuthMessageModal, 0);

    return () => {
      unsubscribe();
      window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const nextMessage = consumeAuthMessage();
      if (!nextMessage) return;

      setMessage(nextMessage);
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [pathname]);

  if (!message) return null;

  return (
    <AlertModal
      description={message}
      confirmText="확인"
      onClose={() => setMessage("")}
      onConfirm={() => setMessage("")}
      size="sm"
    />
  );
}