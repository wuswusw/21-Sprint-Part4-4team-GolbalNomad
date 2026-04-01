import {
  useQuery,
  useInfiniteQuery,
  keepPreviousData,
} from "@tanstack/react-query";
import { getExperienceDetail, getReservationAvailableDays, getReviews } from "../api/experience-detail.api";
import {
  ExperienceDetailResponse,
  ReservationAvailableDaysResponse,
  ReviewResponse,
} from "@/features/experience/types/experience-detail.type";
import { experienceQueryKeys } from "../lib/experience-detail-query-keys";
import { EXPERIENCE_DETAIL_REVIEW_PAGE_SIZE } from "../lib/experience-detail.utils";

export function useExperienceDetail(activityId: number) {
  return useQuery<ExperienceDetailResponse>({
    queryKey: experienceQueryKeys.detail(activityId),
    queryFn: () => getExperienceDetail(activityId),
    enabled: !!activityId && !isNaN(activityId),
  });
}

export function useReservationAvailableDays({
  activityId,
  year,
  month,
}: {
  activityId: number;
  year: string;
  month: string;
}) {
  return useQuery<ReservationAvailableDaysResponse>({
    queryKey: experienceQueryKeys.availableSchedule.month(activityId, year, month),
    queryFn: () => getReservationAvailableDays({ activityId, year, month }),
    enabled: !!activityId && !isNaN(activityId) && !!year && !!month,
    placeholderData: keepPreviousData,
  });
}

export function useExperienceReviews(activityId: number) {
  return useInfiniteQuery<ReviewResponse>({
    queryKey: experienceQueryKeys.reviews(activityId),
    queryFn: ({ pageParam = 1 }) =>
      getReviews({
        activityId,
        page: pageParam as number,
        size: EXPERIENCE_DETAIL_REVIEW_PAGE_SIZE,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) => {
      const loadedCount = allPage.length * EXPERIENCE_DETAIL_REVIEW_PAGE_SIZE;
      return loadedCount < lastPage.totalCount ? loadedCount + 1 : undefined;
    },
    enabled: !!activityId && !isNaN(activityId),
  });
}
