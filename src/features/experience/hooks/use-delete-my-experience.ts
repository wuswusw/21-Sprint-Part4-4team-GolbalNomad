"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMyExperience } from "@/lib/api/my-experiences";
import { experienceQueryKeys } from "../lib/experience-detail-query-keys";

export function useDeleteMyExperience() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (activityId: number) => {
      const token = localStorage.getItem("accessToken") || "";
      await deleteMyExperience(token, activityId);
    },
    onSuccess: (_, activityId) => {
      queryClient.removeQueries({
        queryKey: experienceQueryKeys.detail(activityId),
      });
      queryClient.invalidateQueries({ queryKey: ["myActivities"] });
    },
  });
}
