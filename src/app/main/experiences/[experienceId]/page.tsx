"use client";
import {useState} from "react";
import {useParams} from "next/navigation";

import type { ReviewResponse } from "@/features/experience/types/experience-detail.type";

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
    const [displayCount, setDisplayCount] = useState(3);

    const { data: detailData, isLoading: isExperienceDetailLoading } = useExperienceDetail(experienceId);
    const { data: schedules, isLoading: isAvailableDaysLoading } = useReservationAvailableDays(experienceId, currentYear, currentMonth);
    const { data: reviewData, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading: isReviewsLoading } = useExperienceReviews(experienceId);

    const reviewPages = reviewData?.pages ? reviewData.pages : [{
        reviews: MOCK_REVIEWS.reviews.slice(0, displayCount),
        averageRating: MOCK_REVIEWS.averageRating,
        totalCount: MOCK_REVIEWS.totalCount,
        }];  //등록된 체험 있을 시 목업데이터 식제 예정

    const reviewsForSection: ReviewResponse = {
        reviews: reviewPages.flatMap((page) => page.reviews),
        averageRating: reviewPages[0].averageRating,
        totalCount: reviewPages[0].totalCount,
    };

    // 1. 현재 로드된 리뷰 개수 (목업 포함)
    const currentLoadedCount = reviewsForSection.reviews.length;
    const totalCount = reviewData?.pages[0]?.totalCount || MOCK_REVIEWS.totalCount;
    const canLoadMore = hasNextPage || (currentLoadedCount < totalCount);

    // 확인용 로그 (콘솔에서 확인해 보세요)
    console.log("현재 로드된 개수:", currentLoadedCount);
    console.log("전체 개수:", totalCount);
    console.log("버튼 노출 여부(canLoadMore):", canLoadMore);

    const totalReviewCount = reviewsForSection.totalCount;
    const averageRating = reviewsForSection.averageRating;
    
    

    //등록된 체험 있을 시 목업데이터 식제 예정
    const experienceDetail = detailData ?? MOCK_DETAIL;
    const availableDays = schedules ?? MOCK_AVAILABLE_DAYS;

    const isInitialLoad = isExperienceDetailLoading || isAvailableDaysLoading || isReviewsLoading;
    
    
    const handleCalendarMonthChange = (date: Date) => {
        const year = date.getFullYear().toString();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        setCurrentYear(year);
        setCurrentMonth(month);
    };

    const handleLoadMore = () => {
        if(reviewData) {
            fetchNextPage();
        } else {
            setDisplayCount((prev) => Math.min(prev + 3, MOCK_REVIEWS.reviews.length));
        }
    }
    
    if (!isValidId) return <div>experienceId를 다시 확인해 주세요.</div>;
    if (isInitialLoad) return <div>Loading...</div>;

  return (
    <div>
            <div className="w-full mx-auto desktop:mt-22 tablet:mt-[34px] mt-[30px] desktop:mb-45 mb-[75px] mb-[30px] flex justify-center pb-[168px] desktop:pb-0">
                <div className="w-full desktop:max-w-[1200px] px-10 grid grid-cols-1 desktop:grid-cols-[1fr_410px] gap-10">
                    <section className="w-full flex flex-col gap-6 tablet:gap-[30px] desktop:gap-10 text-gray-950">
                        <ImageGallery
                            bannerImageUrl={experienceDetail?.bannerImageUrl}
                            subImages={experienceDetail?.subImages}
                        />
                        <ExperienceInfo
                            className="desktop:hidden"
                            activityId={experienceDetail?.id ?? experienceId}
                            title={experienceDetail?.title}
                            category={experienceDetail?.category}
                            rating={experienceDetail?.rating}
                            address={experienceDetail?.address}
                            description={experienceDetail?.description}
                            reviewCount={totalReviewCount}
                        />

                        <hr className="w-full border-[#E0E0E5] desktop:hidden" />
                        <ExperienceDesc description={experienceDetail?.description} />
                        <hr className="w-full border-[#E0E0E5]" />
                        <Map address={experienceDetail?.address} />
                        <hr className="w-full border-[#E0E0E5]" />
                        <ReviewSection
                            reviews={reviewsForSection}
                            reviewCount={totalReviewCount}
                            rating={averageRating}
                            onLoadMore={handleLoadMore}
                            hasNextPage={canLoadMore}
                            isFetchingNextPage={isFetchingNextPage}
                        />
                    </section>
                    <section className="hidden desktop:block text-gray-950">
                        <ExperienceInfo
                            activityId={experienceDetail?.id ?? experienceId}
                            title={experienceDetail?.title}
                            category={experienceDetail?.category}
                            rating={experienceDetail?.rating}
                            address={experienceDetail?.address}
                            description={experienceDetail?.description}
                            reviewCount={totalReviewCount}
                        />
                        <ReservationCard
                            activityId={experienceId}
                            price={experienceDetail?.price}
                            availableDays={availableDays ?? []}
                            onCalendarMonthChange={handleCalendarMonthChange}
                        />
                    </section>
                </div>
            </div>
    </div>
  );
}

export default ExperienceDetailPage;