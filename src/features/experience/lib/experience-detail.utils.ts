import type { ReviewResponse } from "@/features/experience/types/experience-detail.type";

/** 체험 상세 리뷰 무한 스크롤/API 페이지당 개수 */
export const EXPERIENCE_DETAIL_REVIEW_PAGE_SIZE = 5;

export function toCalendarYearMonthStrings(date: Date): {
  year: string;
  month: string;
} {
  return {
    year: date.getFullYear().toString(),
    month: (date.getMonth() + 1).toString().padStart(2, "0"),
  };
}

export function mergeReviewPages(pages: ReviewResponse[]): ReviewResponse {
  if (pages.length === 0) {
    return { reviews: [], averageRating: 0, totalCount: 0 };
  }
  return {
    reviews: pages.flatMap((page) => page.reviews),
    averageRating: pages[0].averageRating,
    totalCount: pages[0].totalCount,
  };
}
