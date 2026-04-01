"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfileImage } from "../api/profile.api";
import type { MyProfile } from "../types/profile.type";

export function useUpdateProfileImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => updateProfileImage(file),
    onSuccess: (data) => {
      queryClient.setQueryData<MyProfile>(["my-profile"], (prev) =>
        prev ? { ...prev, profileImageUrl: data.profileImageUrl } : prev
      );
      if (typeof window !== "undefined") {
        localStorage.setItem("profileImage", data.profileImageUrl);
        window.dispatchEvent(new Event("auth-change"));
      }
    },
  });
}
