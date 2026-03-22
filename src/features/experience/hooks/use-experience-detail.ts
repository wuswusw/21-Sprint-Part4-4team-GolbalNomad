import { useQuery } from "@tanstack/react-query";
import { getExperienceDetail, getReservationAvailableDays, getReviews } from "../api/experience-detail.api";
import {ExperienceDetailResponse,ReservationAvailableDaysResponse ,ReviewResponse} from "@/features/experience/types/experience-detail.type";
import { MOCK_DETAIL, MOCK_AVAILABLE_DAYS, MOCK_REVIEWS } from "../experience-detail-mock-data";


export function useExperienceDetail(activityId: number) {
    return useQuery<ExperienceDetailResponse>({
        queryKey: ["activities", activityId],
        queryFn: () => getExperienceDetail(activityId),
        enabled: !!activityId && !isNaN(activityId),
        placeholderData: () => MOCK_DETAIL //등록된 체험 있을 시 삭제 예정
    });
}

export function useReservationAvailableDays(activityId: number, year: string, month: string) {
    return useQuery<ReservationAvailableDaysResponse>({
        queryKey: ["activities", activityId, "available-schedule", year, month],
        queryFn: () => getReservationAvailableDays(activityId, year, month),
        enabled: !!activityId && !isNaN(activityId) && !!year && !!month,
        placeholderData: () => MOCK_AVAILABLE_DAYS //등록된 체험 있을 시 삭제 예정
    })
}

export function useExperienceReviews(activityId: number) {
    return useQuery<ReviewResponse>({
        queryKey: ["activities", activityId, "reviews"],
        queryFn: () => getReviews(activityId, 1, 10),
        enabled: !!activityId && !isNaN(activityId),
        placeholderData: () => MOCK_REVIEWS //등록된 체험 있을 시 삭제 예정
    })
}