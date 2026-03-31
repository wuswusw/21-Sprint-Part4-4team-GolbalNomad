"use client";
import Button from "@/components/common/Button";
import ReviewCard from "./review-card";
import { ReviewResponse } from "../types/experience-detail.type";

interface ReviewSectionProps {
  reviewCount?: number;
  rating?: number;
  reviews?: ReviewResponse;
  onLoadMore?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
}

function ReviewSection({
  reviewCount,
  rating,
  reviews,
  onLoadMore,
  hasNextPage,
  isFetchingNextPage,
}: ReviewSectionProps) {

  return (
    <div>
        <div className="flex gap-2 justify-start items-center mb-2">
            <h2 className="text-body-18">체험 후기</h2>
            <p className="text-body-16 text-[#79747E]"> {reviewCount}개</p>
        </div>
        <div className="w-full mx-auto flex flex-col items-center mb-[30px]">
            <span className="text-32 font-bold">{rating}</span>
            <span className="text-body-16">매우 만족</span>
            <div className="flex justify-center gap-[2px] items-center">
                <img src="/assets/icons/star.svg" alt="star" className="w-4 h-4" />
                <span className="text-body-14 text-[#79747E]">{reviewCount}개 후기</span>
            </div>
        </div>
        <div className="flex flex-col gap-5">
            <ReviewCard reviews={reviews} />
            {hasNextPage && (
          <div className="mt-4 w-full">
            <Button
            variant="outline"
            onClick={onLoadMore}
            className="w-full border-primary-500 text-primary-500"
            disabled={isFetchingNextPage}>
              {isFetchingNextPage ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                  <span>로딩 중...</span>
                </div>
              ) : (
                "리뷰 더보기"
              )}
            </Button>
          </div>
        )}
        </div>
    </div>
  );
}

export default ReviewSection;