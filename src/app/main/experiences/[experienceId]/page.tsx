"use client";
import { useState } from "react";
import { useParams } from "next/navigation";

import ImageGallery from "@/features/experience/components/image-gallery";
import ExperienceDesc from "@/features/experience/components/experience-desc";
import Map from "@/features/experience/components/kakao-map";
import ReviewSection from "@/features/experience/components/review-section";
import ExperienceInfo from "@/features/experience/components/experience-info";
import ReservationCard from "@/features/experience/components/reservation-card";
import {
  useExperienceDetail,
  useExperienceReviews,
  useReservationAvailableDays,
} from "@/features/experience/hooks/use-experience-detail";
import { MOCK_DETAIL, MOCK_AVAILABLE_DAYS, MOCK_REVIEWS } from "@/features/experience/experience-detail-mock-data";


function ExperienceDetailPage() {
    const params = useParams<{ experienceId: string }>();
    const experienceId = Number(params?.experienceId);
    const isValidId = params?.experienceId && !isNaN(experienceId);
    
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear().toString());
    const [currentMonth, setCurrentMonth] = useState((new Date().getMonth() + 1).toString().padStart(2, '0'));

    const { data: detailData, isLoading: isExperienceDetailLoading } = useExperienceDetail(experienceId);
    const { data: schedules, isLoading: isAvailableDaysLoading } = useReservationAvailableDays(experienceId, currentYear, currentMonth);
    const { data: reviews, isLoading: isReviewsLoading } = useExperienceReviews(experienceId);

    //등록된 체험 있을 시 수정 예정
    const experienceDetail = detailData ?? MOCK_DETAIL;
    const availableDays = schedules ?? MOCK_AVAILABLE_DAYS;
    const reviewData = reviews ?? MOCK_REVIEWS;

    const isInitialLoad = isExperienceDetailLoading || isAvailableDaysLoading || isReviewsLoading;
    
    
    const handleCalendarMonthChange = (date: Date) => {
        const year = date.getFullYear().toString();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        setCurrentYear(year);
        setCurrentMonth(month);
    };
    
    if (!isValidId) return <div>experienceId를 다시 확인해 주세요.</div>;
    if (isInitialLoad) return <div>Loading...</div>;

  return (
    <div>
            <div className="w-full mx-auto desktop:mt-22 tablet:mt-[34px] mt-[30px] desktop:mb-45 mb-[75px] mb-[30px] flex justify-center">
                <div className="w-full desktop:max-w-[1200px] px-10 grid grid-cols-1 desktop:grid-cols-[1fr_410px] gap-10">
                    <section className="w-full flex flex-col gap-6 tablet:gap-[30px] desktop:gap-10 text-gray-950">
                        <ImageGallery
                            bannerImageUrl={experienceDetail?.bannerImageUrl}
                            subImages={experienceDetail?.subImages}
                        />
                        <ExperienceInfo className="desktop:hidden" title={experienceDetail?.title} category={experienceDetail?.category} rating={experienceDetail?.rating} address={experienceDetail?.address} description={experienceDetail?.description} />
                        <hr className="w-full border-[#E0E0E5] desktop:hidden" />
                        <ExperienceDesc description={experienceDetail?.description} />
                        <hr className="w-full border-[#E0E0E5]" />
                        <Map address={experienceDetail?.address} />
                        <hr className="w-full border-[#E0E0E5]" />
                        <ReviewSection
                            reviews={reviewData ?? undefined}
                            reviewCount={experienceDetail?.reviewCount ?? 0}
                            rating={experienceDetail?.rating ?? 0}
                        />
                    </section>
                    <section className="hidden desktop:block text-gray-950">
                        <ExperienceInfo title={experienceDetail?.title} category={experienceDetail?.category} rating={experienceDetail?.rating} address={experienceDetail?.address} description={experienceDetail?.description} reviewCount={experienceDetail?.reviewCount} />
                        <ReservationCard
                            activityId={experienceId}
                            price={experienceDetail?.price}
                            availableDays={availableDays ?? []}
                            onCalendarMonthChange={handleCalendarMonthChange}
                        />
                    </section>
                </div>
            </div>
            <div className="w-full desktop:hidden sticky bottom-0 z-49 px-6 py-[18px] bg-white border-t border-[#e6e6e6]">
                <div className="flex items-center justify-between mb-3">
                <div className="flex justify-center items-center gap-1">
                    <h2 className="text-18 font-bold">{experienceDetail?.price?.toLocaleString()}</h2>
                    <p className="text-16 font-medium text-[#79747E]"> / 인</p>
                </div>
                <button className="text-16 font-bold text-primary-500 underline underline-offset-4">날짜 선택하기</button>
                </div>
                <button className="w-full px-5 py-4 rounded-[14px] bg-gray-200 text-white text-16 font-bold">예약하기</button>
            </div>
    </div>
  );
}

export default ExperienceDetailPage;