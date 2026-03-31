"use client";
import { useState } from "react";
import { useParams } from "next/navigation";

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
import {
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

  const {
    data: detailData,
    isLoading: isExperienceDetailLoading,
    isError: isDetailError,
    error: detailError,
  } = useExperienceDetail(experienceId);
  const { data: schedules } = useReservationAvailableDays({
      activityId: experienceId,
      year: currentYear,
      month: currentMonth,
    });
  const {
    data: reviewData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isReviewsLoading,
  } = useExperienceReviews(experienceId);

  const reviewPages = reviewData?.pages ?? [];
  const reviewsForSection = mergeReviewPages(reviewPages);

  const totalReviewCount = reviewsForSection.totalCount;
  const averageRating = reviewsForSection.averageRating;

  const experienceDetail = detailData;
  const availableDays = schedules ?? [];

  const isOwner =
    !!currentUser && experienceDetail != null && experienceDetail.userId === currentUser.id;

  const isInitialLoad =
    isExperienceDetailLoading || isReviewsLoading;

  const handleCalendarMonthChange = (date: Date) => {
    const { year, month } = toCalendarYearMonthStrings(date);
    setCurrentYear(year);
    setCurrentMonth(month);
  };

  const handleLoadMore = () => {
    fetchNextPage();
  };

  if (!isValidId) {
    return <div className="w-full px-10">experienceId를 다시 확인해 주세요.</div>;
  }
  if (isInitialLoad) {
    return (
      <div className="w-full min-w-0">
        <ExperienceDetailSkeleton />
      </div>
    );
  }
  if (isDetailError) {
    return (
      <div className="flex min-h-[40vh] w-full items-center justify-center px-10 text-center text-body-16 text-gray-600">
        {detailError instanceof Error
          ? detailError.message
          : "체험 정보를 불러오지 못했습니다."}
      </div>
    );
  }
  if (!experienceDetail) {
    return (
      <div className="flex min-h-[40vh] w-full items-center justify-center px-10 text-center text-body-16 text-gray-600">
        체험 정보를 불러오지 못했습니다.
      </div>
    );
  }

  return (
    <div className="w-full min-w-0">
      <div className="mx-auto w-full min-w-0 desktop:mt-22 tablet:mt-[34px] mt-[30px] desktop:mb-45 mb-[75px] mb-[30px] flex justify-center pb-[168px] desktop:pb-0">
        <div
          className={`w-full min-w-0 px-10 tablet:px-0 grid grid-cols-1 gap-10 ${!isOwner ? "desktop:grid-cols-[minmax(0,1fr)_410px]" : ""}`}
        >
          <section className="w-full min-w-0 flex flex-col gap-6 tablet:gap-[30px] desktop:gap-10 text-gray-950">
            <ImageGallery
              bannerImageUrl={experienceDetail.bannerImageUrl}
              subImages={experienceDetail.subImages}
            />
            <ExperienceInfo
              className={isOwner ? "" : "desktop:hidden"}
              activityId={experienceDetail.id ?? experienceId}
              title={experienceDetail.title}
              category={experienceDetail.category}
              rating={experienceDetail.rating}
              address={experienceDetail.address}
              description={experienceDetail.description}
              reviewCount={totalReviewCount}
              isOwner={isOwner}
            />

            <hr className="w-full border-[#E0E0E5] desktop:hidden" />
            <ExperienceDesc description={experienceDetail.description} />
            <hr className="w-full border-[#E0E0E5]" />
            <Map address={experienceDetail.address} />
            {!isOwner && (
              <div className="min-w-0 desktop:hidden">
                <ReservationCard
                  activityId={experienceId}
                  price={experienceDetail.price}
                  availableDays={availableDays}
                  onCalendarMonthChange={handleCalendarMonthChange}
                />
              </div>
            )}
            <hr className="w-full border-[#E0E0E5]" />
            <ReviewSection
              reviews={reviewsForSection}
              reviewCount={totalReviewCount}
              rating={averageRating}
              onLoadMore={handleLoadMore}
              hasNextPage={!!hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          </section>
          {!isOwner && (
            <section className="hidden w-full min-w-0 desktop:block text-gray-950">
              <ExperienceInfo
                activityId={experienceDetail.id ?? experienceId}
                title={experienceDetail.title}
                category={experienceDetail.category}
                rating={experienceDetail.rating}
                address={experienceDetail.address}
                description={experienceDetail.description}
                reviewCount={totalReviewCount}
                isOwner={isOwner}
              />
              <ReservationCard
                activityId={experienceId}
                price={experienceDetail.price}
                availableDays={availableDays}
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
