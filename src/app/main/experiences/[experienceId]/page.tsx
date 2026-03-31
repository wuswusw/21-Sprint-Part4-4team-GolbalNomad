"use client";
import {useState} from "react";
import {useParams} from "next/navigation";

import ImageGallery from "@/features/experience/components/image-gallery";
import ExperienceDesc from "@/features/experience/components/experience-desc";
import Map from "@/features/experience/components/kakao-map";
import ReviewSection from "@/features/experience/components/review-section";
import ExperienceInfo from "@/features/experience/components/experience-info";
import ReservationCard from "@/features/experience/components/reservation-card";
import ExperienceDetailSkeleton from "@/features/experience/components/experience-detail-skeleton";
import { useCurrentUser } from "@/hooks/use-current-user";
import {
  useExperienceDetail,
  useExperienceReviews,
  useReservationAvailableDays,
} from "@/features/experience/hooks/use-experience-detail";
import { MOCK_DETAIL, MOCK_AVAILABLE_DAYS, MOCK_REVIEWS } from "@/features/experience/experience-detail-mock-data";
import {
    EXPERIENCE_DETAIL_REVIEW_PAGE_SIZE,
    mergeReviewPages,
    toCalendarYearMonthStrings,
} from "@/features/experience/lib/experience-detail.utils";

function ExperienceDetailPage() {
    const params = useParams<{ experienceId: string }>();
    const experienceId = Number(params?.experienceId);
    const isValidId = params?.experienceId && !isNaN(experienceId);
    
    const { data: currentUser } = useCurrentUser();
    const initialCalendar = toCalendarYearMonthStrings(new Date());
    const [currentYear, setCurrentYear] = useState(initialCalendar.year);
    const [currentMonth, setCurrentMonth] = useState(initialCalendar.month);
    const [displayCount, setDisplayCount] = useState(EXPERIENCE_DETAIL_REVIEW_PAGE_SIZE);

    const { data: detailData, isLoading: isExperienceDetailLoading } = useExperienceDetail(experienceId);
    const { data: schedules, isLoading: isAvailableDaysLoading } = useReservationAvailableDays({
        activityId: experienceId,
        year: currentYear,
        month: currentMonth,
    });
    const { data: reviewData, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading: isReviewsLoading } = useExperienceReviews(experienceId);

    // TODO: 실제 API 연동 시 mock fallback 제거
    const reviewPages = reviewData?.pages ? reviewData.pages : [{
        reviews: MOCK_REVIEWS.reviews.slice(0, displayCount),
        averageRating: MOCK_REVIEWS.averageRating,
        totalCount: MOCK_REVIEWS.totalCount,
        }];

    const reviewsForSection = mergeReviewPages(reviewPages);

    // TODO: 실제 API 연동 시 MOCK_REVIEWS fallback 제거
    const currentLoadedCount = reviewsForSection.reviews.length;
    const totalCount = reviewData?.pages[0]?.totalCount || MOCK_REVIEWS.totalCount;
    const canLoadMore = hasNextPage || (currentLoadedCount < totalCount);

    const totalReviewCount = reviewsForSection.totalCount;
    const averageRating = reviewsForSection.averageRating;
    

    // TODO: 실제 API 연동 시 MOCK_DETAIL, MOCK_AVAILABLE_DAYS fallback 제거
    const experienceDetail = detailData ?? MOCK_DETAIL;
    const availableDays = schedules ?? MOCK_AVAILABLE_DAYS;
    const isOwner = !!currentUser && experienceDetail?.userId === currentUser.id;

    const isInitialLoad = isExperienceDetailLoading || isAvailableDaysLoading || isReviewsLoading;
    
    
    const handleCalendarMonthChange = (date: Date) => {
        const { year, month } = toCalendarYearMonthStrings(date);
        setCurrentYear(year);
        setCurrentMonth(month);
    };

    // TODO: 실제 API 연동 시 else 분기(mock displayCount) 제거
    const handleLoadMore = () => {
        if(reviewData) {
            fetchNextPage();
        } else {
            setDisplayCount((prev) =>
                Math.min(prev + EXPERIENCE_DETAIL_REVIEW_PAGE_SIZE, MOCK_REVIEWS.reviews.length)
            );
        }
    }
    
    if (!isValidId) return <div>experienceId를 다시 확인해 주세요.</div>;
    if (isInitialLoad) return <ExperienceDetailSkeleton />;

  return (
    <div>
            <div className="w-full mx-auto desktop:mt-22 tablet:mt-[34px] mt-[30px] desktop:mb-45 mb-[75px] mb-[30px] flex justify-center pb-[168px] desktop:pb-0">
                <div className={`w-full desktop:max-w-[1200px] px-10 grid grid-cols-1 ${!isOwner ? "desktop:grid-cols-[1fr_410px]" : ""} gap-10`}>
                    <section className="w-full flex flex-col gap-6 tablet:gap-[30px] desktop:gap-10 text-gray-950">
                        <ImageGallery
                            bannerImageUrl={experienceDetail?.bannerImageUrl}
                            subImages={experienceDetail?.subImages}
                        />
                        <ExperienceInfo
                            className={isOwner ? "" : "desktop:hidden"}
                            activityId={experienceDetail?.id ?? experienceId}
                            title={experienceDetail?.title}
                            category={experienceDetail?.category}
                            rating={experienceDetail?.rating}
                            address={experienceDetail?.address}
                            description={experienceDetail?.description}
                            reviewCount={totalReviewCount}
                            isOwner={isOwner}
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
                    {!isOwner && (
                        <section className="hidden desktop:block text-gray-950">
                            <ExperienceInfo
                                activityId={experienceDetail?.id ?? experienceId}
                                title={experienceDetail?.title}
                                category={experienceDetail?.category}
                                rating={experienceDetail?.rating}
                                address={experienceDetail?.address}
                                description={experienceDetail?.description}
                                reviewCount={totalReviewCount}
                                isOwner={isOwner}
                            />
                            <ReservationCard
                                activityId={experienceId}
                                price={experienceDetail?.price}
                                availableDays={availableDays ?? []}
                                onCalendarMonthChange={handleCalendarMonthChange}
                            />
                        </section>
                    )}
                </div>
            </div>
    </div>
  );
}

export default ExperienceDetailPage;