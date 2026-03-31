"use client";

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

export function useCurrentUser() {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("accessToken")
      : null;

  return useQuery<User>({
    queryKey: ["users", "me"],
    queryFn: getCurrentUser,
    enabled: !!token,
    staleTime: 1000 * 60 * 30,
  });
}
