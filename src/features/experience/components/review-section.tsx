"use client";
import { ReviewResponse } from "../types/experience-detail.type";
import ReviewCard from "./review-card";

interface ReviewSectionProps {
  reviewCount?: number;
  rating?: number;
  reviews?: ReviewResponse;
}
function ReviewSection({ reviewCount, rating, reviews }: ReviewSectionProps) {
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
        </div>
    </div>
  );
}

export default ReviewSection;