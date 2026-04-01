"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMyProfile, updateProfileImage } from "../api/profile.api";
import type { MyProfile } from "../types/profile.type";

export function useUpdateProfileImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      const { profileImageUrl } = await updateProfileImage(file);
      return updateMyProfile({ profileImageUrl });
    },
    onSuccess: (updated) => {
      queryClient.setQueryData<MyProfile>(["my-profile"], updated);
      if (typeof window !== "undefined") {
        localStorage.setItem("profileImage", updated.profileImageUrl ?? "");
        window.dispatchEvent(new Event("auth-change"));
      }
    },
  });
}
