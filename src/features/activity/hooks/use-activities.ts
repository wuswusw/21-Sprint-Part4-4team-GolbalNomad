import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getActivities } from "../api/activity.api";
import type { GetActivitiesParams } from "../types/activity.type";

export function useActivities(params: GetActivitiesParams) {
  return useQuery({
    queryKey: ["activities", params],
    queryFn: () => getActivities(params),
  });
}

export function usePopularActivities(size = 4) {
  return useInfiniteQuery({
    queryKey: ["popular-activities", size],
    queryFn: ({ pageParam }) =>
      getActivities({
        method: "cursor",
        sort: "most_reviewed",
        size,
        cursorId: pageParam,
      }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => {
      if (!lastPage.activities.length) return undefined;
      return lastPage.cursorId ?? undefined;
    },
  });
}