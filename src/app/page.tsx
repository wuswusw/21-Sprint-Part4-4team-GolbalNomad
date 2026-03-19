"use client";

import { useSyncExternalStore } from "react";
import Gnb from "@/components/common/gnb/gnb";

type AuthSnapshot = {
  isLogin: boolean;
  nickname: string;
  profileImage: string;
};

const SERVER_SNAPSHOT: AuthSnapshot = {
  isLogin: false,
  nickname: "",
  profileImage: "",
};

let cachedClientSnapshot: AuthSnapshot = SERVER_SNAPSHOT;

function readAuthFromStorage(): AuthSnapshot {
  return {
    isLogin: !!localStorage.getItem("accessToken"),
    nickname: localStorage.getItem("nickname") ?? "",
    profileImage: localStorage.getItem("profileImage") ?? "",
  };
}

function getClientSnapshot(): AuthSnapshot {
  const nextSnapshot = readAuthFromStorage();

  if (
    cachedClientSnapshot.isLogin === nextSnapshot.isLogin &&
    cachedClientSnapshot.nickname === nextSnapshot.nickname &&
    cachedClientSnapshot.profileImage === nextSnapshot.profileImage
  ) {
    return cachedClientSnapshot;
  }

  cachedClientSnapshot = nextSnapshot;
  return cachedClientSnapshot;
}

function getServerSnapshot(): AuthSnapshot {
  return SERVER_SNAPSHOT;
}

function subscribe(callback: () => void) {
  const handler = () => {
    callback();
  };

  window.addEventListener("storage", handler);
  window.addEventListener("auth-change", handler);

  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener("auth-change", handler);
  };
}

export default function HomePage() {
  const auth = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  );

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("nickname");
    localStorage.removeItem("profileImage");
    window.dispatchEvent(new Event("auth-change"));
  };

  return (
    <div>
      <Gnb
        isLogin={auth.isLogin}
        nickname={auth.nickname}
        profileImage={auth.profileImage || undefined}
        onLogout={handleLogout}
      />
      <main>메인페이지 내용</main>
    </div>
  );
}