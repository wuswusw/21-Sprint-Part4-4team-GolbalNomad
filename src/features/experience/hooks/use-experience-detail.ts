import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { getExperienceDetail, getReservationAvailableDays, getReviews } from "../api/experience-detail.api";
import {
  ExperienceDetailResponse,
  ReservationAvailableDaysResponse,
  ReviewResponse,
} from "@/features/experience/types/experience-detail.type";
import { MOCK_DETAIL, MOCK_AVAILABLE_DAYS } from "../experience-detail-mock-data";
import { experienceQueryKeys } from "../lib/experience-detail-query-keys";
import { EXPERIENCE_DETAIL_REVIEW_PAGE_SIZE } from "../lib/experience-detail.utils";

export function useExperienceDetail(activityId: number) {
  return useQuery<ExperienceDetailResponse>({
    queryKey: experienceQueryKeys.detail(activityId),
    queryFn: () => getExperienceDetail(activityId),
    enabled: !!activityId && !isNaN(activityId),
    placeholderData: () => MOCK_DETAIL, // TODO: 실제 API 연동 시 mock 제거
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
    placeholderData: () => MOCK_AVAILABLE_DAYS, // TODO: 실제 API 연동 시 mock 제거
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
