"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import ExperienceCard from "@/components/home/experience-card";
import ExperienceCardSkeleton from "@/components/home/experience-card-skeleton";
import { usePopularActivities } from "@/features/activity/hooks/use-activities";

const PAGE_SIZE = 4;
const SHADOW_SPACE_Y = 24;

type DeviceType = "mobile" | "tablet" | "desktop";

function chunkArray<T>(array: T[], size: number): T[][] {
  const result: T[][] = [];

  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }

  return result;
}

function getDeviceType(): DeviceType {
  if (typeof window === "undefined") return "desktop";

  const width = window.innerWidth;

  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

function PopularExperiences() {
  const [currentPage, setCurrentPage] = useState(0);
  const [device, setDevice] = useState<DeviceType>(getDeviceType);
  const mobileScrollRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePopularActivities(PAGE_SIZE);

  useEffect(() => {
    const handleResize = () => {
      const nextDevice = getDeviceType();

      setDevice((prevDevice) => {
        if (prevDevice === nextDevice) return prevDevice;

        setCurrentPage(0);

        if (mobileScrollRef.current) {
          mobileScrollRef.current.scrollTo({
            left: 0,
            behavior: "auto",
          });
        }

        return nextDevice;
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const visibleCount = device === "desktop" ? 4 : 2;

  const activities = useMemo(
    () => data?.pages.flatMap((page) => page.activities) ?? [],
    [data]
  );

  const groupedActivities = useMemo(
    () => chunkArray(activities, visibleCount),
    [activities, visibleCount]
  );

  const maxPage = Math.max(0, groupedActivities.length - 1);
  const safePage = Math.min(currentPage, maxPage);

  const canGoPrev = device !== "mobile" && safePage > 0;
  const canGoNext =
    device !== "mobile" &&
    (safePage < maxPage || hasNextPage || isFetchingNextPage);

  const handlePrev = () => {
    if (!canGoPrev) return;
    setCurrentPage((prev) => prev - 1);
  };

  const handleNext = async () => {
    const nextPage = safePage + 1;

    if (nextPage < groupedActivities.length) {
      setCurrentPage(nextPage);
      return;
    }

    if (hasNextPage && !isFetchingNextPage) {
      const result = await fetchNextPage();
      const newActivities =
        result.data?.pages.flatMap((page) => page.activities) ?? [];
      const newGroupedActivities = chunkArray(newActivities, visibleCount);

      if (nextPage < newGroupedActivities.length) {
        setCurrentPage(nextPage);
      }
    }
  };

  const handleMobileScroll: React.UIEventHandler<HTMLDivElement> = async (e) => {
    if (device !== "mobile") return;
    if (!hasNextPage || isFetchingNextPage) return;

    const target = e.currentTarget;
    const remaining =
      target.scrollWidth - target.scrollLeft - target.clientWidth;

    if (remaining < 120) {
      await fetchNextPage();
    }
  };

  if (isPending) {
    return (
      <section className="mx-auto w-full max-w-[327px] py-8 tablet:max-w-[684px] desktop:max-w-[1120px]">
        <div className="mb-4 flex items-center gap-2 tablet:mb-6">
          <h2 className="text-[18px] font-bold text-black tablet:text-[24px]">
            🔥 인기 체험
          </h2>
        </div>

        <div className="flex gap-3 tablet:grid tablet:grid-cols-2 tablet:gap-6 desktop:grid-cols-4">
          {Array.from({ length: device === "mobile" ? 3 : visibleCount }).map(
            (_, index) => (
              <div key={index} className="w-[131.33px] shrink-0 tablet:w-auto">
                <ExperienceCardSkeleton />
              </div>
            )
          )}
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="mx-auto w-full max-w-[327px] py-8 tablet:max-w-[684px] desktop:max-w-[1120px]">
        <h2 className="mb-4 text-[18px] font-bold text-black tablet:mb-6 tablet:text-[24px]">
          🔥 인기 체험
        </h2>
        <p className="text-gray-500">인기 체험을 불러오지 못했습니다.</p>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-[327px] pb-[40px] tablet:max-w-[684px] tablet:pb-[80px] desktop:max-w-[1120px] desktop:pb-[80px]">
      <div className="mb-4 flex items-center gap-2 tablet:mb-6">
        <h2 className="text-[18px] font-bold text-black tablet:text-[24px]">
          🔥 인기 체험
        </h2>
      </div>

      {device === "mobile" ? (
        <div
          ref={mobileScrollRef}
          onScroll={handleMobileScroll}
          className="
            flex gap-3 overflow-x-auto pb-2
            snap-x snap-mandatory
            [-ms-overflow-style:none] [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          "
        >
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="w-[131.33px] shrink-0 snap-start"
            >
              <ExperienceCard experience={activity} variant="popular" />
            </div>
          ))}
        </div>
      ) : (
        <div className="relative w-full">
          {canGoPrev && (
            <button
              type="button"
              onClick={handlePrev}
              aria-label="이전 인기 체험 보기"
              className="absolute left-[-24px] top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gray-100 bg-white shadow-[0_4px_16px_rgba(0,0,0,0.12)]"
            >
              <Image
                src="/assets/icons/icon_main_left.svg"
                alt=""
                width={24}
                height={24}
                aria-hidden="true"
              />
            </button>
          )}

          {canGoNext && (
            <button
              type="button"
              onClick={handleNext}
              aria-label="다음 인기 체험 보기"
              className="absolute right-[-24px] top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gray-100 bg-white shadow-[0_4px_16px_rgba(0,0,0,0.12)]"
            >
              <Image
                src="/assets/icons/icon_main_right.svg"
                alt=""
                width={24}
                height={24}
                aria-hidden="true"
              />
            </button>
          )}

          <div
            className="overflow-hidden"
            style={{
              paddingTop: `${SHADOW_SPACE_Y}px`,
              paddingBottom: `${SHADOW_SPACE_Y}px`,
              marginTop: `-${SHADOW_SPACE_Y}px`,
              marginBottom: `-${SHADOW_SPACE_Y}px`,
            }}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${safePage * 100}%)` }}
            >
              {groupedActivities.map((group, pageIndex) => (
                <div
                  key={pageIndex}
                  className="
                    grid w-full min-w-full gap-6
                    tablet:grid-cols-2
                    desktop:grid-cols-4
                  "
                >
                  {group.map((activity) => (
                    <ExperienceCard
                      key={activity.id}
                      experience={activity}
                      variant="popular"
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {isFetchingNextPage && (
        <p className="mt-4 text-center text-sm text-gray-500">
          더 불러오는 중...
        </p>
      )}
    </section>
  );
}

export default PopularExperiences;