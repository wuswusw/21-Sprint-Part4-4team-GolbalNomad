"use client";

import { useQuery } from "@tanstack/react-query";
import { getMyProfile } from "../api/profile.api";

export function useMyProfile() {
  return useQuery({
    queryKey: ["my-profile"],
    queryFn: getMyProfile,
  });
}