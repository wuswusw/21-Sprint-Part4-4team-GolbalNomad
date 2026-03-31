"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import ExperienceCard from "@/components/home/experience-card";
import { usePopularActivities } from "@/features/activity/hooks/use-activities";

const PAGE_SIZE = 4;

function chunkArray<T>(array: T[], size: number): T[][] {
  const result: T[][] = [];

  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }

  return result;
}

function PopularExperiences() {
  const [currentPage, setCurrentPage] = useState(0);

  const {
    data,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePopularActivities(PAGE_SIZE);

  const activities = useMemo(
    () => data?.pages.flatMap((page) => page.activities) ?? [],
    [data]
  );

  const groupedActivities = useMemo(
    () => chunkArray(activities, PAGE_SIZE),
    [activities]
  );

  const maxPage = Math.max(0, groupedActivities.length - 1);
  const safePage = Math.min(currentPage, maxPage);

  const canGoPrev = safePage > 0;
  const canGoNext = safePage < maxPage || hasNextPage || isFetchingNextPage;

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
      const newGroupedActivities = chunkArray(newActivities, PAGE_SIZE);

      if (nextPage < newGroupedActivities.length) {
        setCurrentPage(nextPage);
      }
    }
  };

  if (isPending) {
    return (
      <section className="mx-auto w-[1120px] py-8">
        <h2 className="mb-6 text-[24px] font-bold text-black">🔥 인기 체험</h2>
        <p className="text-gray-500">불러오는 중...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="mx-auto w-[1120px] py-8">
        <h2 className="mb-6 text-[24px] font-bold text-black">🔥 인기 체험</h2>
        <p className="text-gray-500">인기 체험을 불러오지 못했습니다.</p>
      </section>
    );
  }

  return (
    <section className="mx-auto w-[1120px] py-8">
      <div className="mb-6 flex items-center gap-2">
        <h2 className="text-[24px] font-bold text-black">🔥 인기 체험</h2>
      </div>

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

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${safePage * 100}%)` }}
          >
            {groupedActivities.map((group, pageIndex) => (
              <div
                key={pageIndex}
                className="grid min-w-[1120px] grid-cols-4 gap-[24px]"
              >
                {group.map((activity) => (
                  <ExperienceCard key={activity.id} experience={activity} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {isFetchingNextPage && (
        <p className="mt-4 text-center text-sm text-gray-500">
          더 불러오는 중...
        </p>
      )}
    </section>
  );
}

export default PopularExperiences;