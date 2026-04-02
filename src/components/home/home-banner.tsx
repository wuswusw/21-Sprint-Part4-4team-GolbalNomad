"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import Skeleton from "@/components/common/Skeleton";
import { useActivities } from "@/features/activity/hooks/use-activities";

const SWIPE_THRESHOLD = 35;
const AUTO_SLIDE_DELAY = 5000;

function HomeBanner() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [dragOffsetX, setDragOffsetX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);

  const startXRef = useRef(0);
  const isPointerDownRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data, isPending, isError } = useActivities({
    method: "offset",
    sort: "most_reviewed",
    page: 1,
    size: 8,
  });

  const activities = useMemo(() => data?.activities ?? [], [data]);
  const currentMonth = new Date().getMonth() + 1;
  const hasLoop = activities.length > 1;

  const bannerItems = useMemo(() => {
    if (activities.length === 0) return [];
    if (activities.length === 1) return activities;

    return [activities[activities.length - 1], ...activities, activities[0]];
  }, [activities]);

  const safeDisplayIndex = useMemo(() => {
    if (bannerItems.length === 0) return 0;
    if (!hasLoop) return 0;

    const minIndex = 0;
    const maxIndex = bannerItems.length - 1;

    if (currentIndex < minIndex) return 0;
    if (currentIndex > maxIndex) return maxIndex;

    return currentIndex;
  }, [bannerItems.length, currentIndex, hasLoop]);

  useEffect(() => {
    if (!hasLoop || isDragging || !isTransitionEnabled) return;

    const timer = window.setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = bannerItems.length - 1;
        if (maxIndex <= 0) return prev;

        return prev >= maxIndex ? maxIndex : prev + 1;
      });
    }, AUTO_SLIDE_DELAY);

    return () => window.clearInterval(timer);
  }, [bannerItems.length, hasLoop, isDragging, isTransitionEnabled]);

  const resetDragState = () => {
    setDragOffsetX(0);
    setIsDragging(false);
    isPointerDownRef.current = false;
  };

  const handleSwipeEnd = () => {
    if (!hasLoop) {
      resetDragState();
      return;
    }

    if (dragOffsetX <= -SWIPE_THRESHOLD) {
      setCurrentIndex((prev) => {
        const maxIndex = bannerItems.length - 1;
        return Math.min(prev + 1, maxIndex);
      });
    } else if (dragOffsetX >= SWIPE_THRESHOLD) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }

    resetDragState();
  };

  const handlePointerDown = (clientX: number) => {
    if (!hasLoop) return;

    startXRef.current = clientX;
    isPointerDownRef.current = true;
    setIsDragging(true);
  };

  const handlePointerMove = (clientX: number) => {
    if (!isPointerDownRef.current) return;

    const rawOffset = clientX - startXRef.current;
    const containerWidth = containerRef.current?.clientWidth ?? 0;
    const maxDrag = containerWidth * 0.18;

    const clampedOffset = Math.max(-maxDrag, Math.min(rawOffset, maxDrag));
    setDragOffsetX(clampedOffset);
  };

  const handlePointerUp = () => {
    if (!isPointerDownRef.current) return;
    handleSwipeEnd();
  };

  const handleTransitionEnd: React.TransitionEventHandler<HTMLDivElement> = (
    e
  ) => {
    if (e.target !== e.currentTarget) return;
    if (!hasLoop) return;

    if (safeDisplayIndex === bannerItems.length - 1) {
      setIsTransitionEnabled(false);
      setCurrentIndex(1);
      return;
    }

    if (safeDisplayIndex === 0) {
      setIsTransitionEnabled(false);
      setCurrentIndex(activities.length);
    }
  };

  useEffect(() => {
    if (isTransitionEnabled) return;

    const raf = requestAnimationFrame(() => {
      setIsTransitionEnabled(true);
    });

    return () => cancelAnimationFrame(raf);
  }, [isTransitionEnabled]);

  return (
    <section className="pt-[74px] pb-[17px] tablet:pt-[103px] tablet:pb-[30px] desktop:pt-[103px] desktop:pb-[50px]">
      <div
        ref={containerRef}
        className="
          relative mx-auto
          h-[181px] w-full max-w-[327px]
          overflow-hidden rounded-[16px] touch-pan-y select-none
          shadow-[0_4px_24px_0_rgba(156,180,202,0.2)]
          tablet:h-[375px] tablet:max-w-[684px] tablet:rounded-[24px]
          desktop:h-[500px] desktop:max-w-[1120px]
        "
        onMouseDown={(e) => handlePointerDown(e.clientX)}
        onMouseMove={(e) => handlePointerMove(e.clientX)}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={(e) => handlePointerDown(e.touches[0].clientX)}
        onTouchMove={(e) => handlePointerMove(e.touches[0].clientX)}
        onTouchEnd={handlePointerUp}
      >
        {isPending && (
          <Skeleton className="h-full w-full rounded-[16px] tablet:rounded-[24px]" />
        )}

        {isError && (
          <div className="flex h-full w-full items-center justify-center bg-[#DCEEFF]">
            <p className="text-14 font-medium text-gray-600 tablet:text-16 desktop:text-18">
              배너를 불러오지 못했습니다.
            </p>
          </div>
        )}

        {!isPending && !isError && bannerItems.length === 0 && (
          <div className="flex h-full w-full items-center justify-center bg-[#DCEEFF]">
            <p className="text-14 font-medium text-gray-600 tablet:text-16 desktop:text-18">
              표시할 배너가 없습니다.
            </p>
          </div>
        )}

        {!isPending && !isError && bannerItems.length > 0 && (
          <div
            onTransitionEnd={handleTransitionEnd}
            className={`flex h-full ${
              isDragging || !isTransitionEnabled
                ? ""
                : "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            }`}
            style={{
              transform: `translateX(calc(-${safeDisplayIndex * 100}% + ${dragOffsetX}px))`,
            }}
          >
            {bannerItems.map((activity, index) => (
              <div
                key={`${activity.id}-${index}`}
                className="pointer-events-none relative h-full min-w-full flex-shrink-0 select-none"
              >
                <Image
                  src={activity.bannerImageUrl}
                  alt={activity.title}
                  fill
                  priority={index === safeDisplayIndex}
                  className="object-cover"
                  draggable={false}
                />

                <div className="absolute inset-0 bg-black/20" />

                <div
                  className="
                    absolute inset-x-0 bottom-[22px]
                    flex flex-col items-center px-4 text-white
                    tablet:bottom-[48px] tablet:px-6
                    desktop:bottom-[74px]
                  "
                >
                  <h1
                    className="
                      text-center font-bold leading-[1.4]
                      text-18
                      tablet:text-24
                      desktop:text-32 desktop:leading-none
                    "
                  >
                    {activity.title}
                  </h1>

                  <p
                    className="
                      mt-[8px] text-center leading-[1.4]
                      text-14 font-medium
                      tablet:mt-[14px] tablet:text-16 tablet:font-bold
                      desktop:mt-[19px] desktop:text-18 desktop:font-bold desktop:leading-none
                    "
                  >
                    {currentMonth}월의 인기 체험 BEST 🔥
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default HomeBanner;