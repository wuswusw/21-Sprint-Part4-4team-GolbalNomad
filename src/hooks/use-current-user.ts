"use client";

import { useSyncExternalStore } from "react";
import { useQuery } from "@tanstack/react-query";
import type { User } from "@/features/auth/types/auth.type";
import { getApiUrl, buildAuthHeaders } from "@/lib/api-client";

async function getCurrentUser(): Promise<User> {
  const response = await fetch(getApiUrl("/users/me"), {
    method: "GET",
    headers: buildAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("유저 정보를 가져오는데 실패했습니다.");
  }

  return response.json();
}

function readAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("accessToken");
}

function subscribeAuth(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("auth-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("auth-change", callback);
  };
}

function getServerAccessToken(): null {
  return null;
}

export function useCurrentUser() {
  const accessToken = useSyncExternalStore(
    subscribeAuth,
    readAccessToken,
    getServerAccessToken
  );

  const hasToken = !!accessToken;

  return useQuery<User>({
    queryKey: ["users", "me", accessToken ?? ""],
    queryFn: getCurrentUser,
    enabled: hasToken,
    staleTime: 1000 * 60 * 30,
  });
}
