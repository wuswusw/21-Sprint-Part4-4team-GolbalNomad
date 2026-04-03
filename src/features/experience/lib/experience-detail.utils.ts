import type { ReviewResponse } from "@/features/experience/types/experience-detail.type";

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

export function getRatingSatisfactionLabel(
  rating: number | undefined,
  reviewCount: number,
): string {
  if (reviewCount === 0) return "리뷰 없음";

  const r = Number(rating ?? 0);
  if (r < 2) return "매우 불만족";
  if (r < 3) return "불만족";
  if (r < 4) return "보통";
  if (r < 5) return "만족";
  return "매우 만족";
}
