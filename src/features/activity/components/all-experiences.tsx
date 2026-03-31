"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import ExperienceCard from "@/components/home/experience-card";
import HomePagination from "@/components/home/home-pagination";
import { useActivities } from "@/features/activity/hooks/use-activities";
import type {
  ActivityCategory,
  ActivitySort,
} from "@/features/activity/types/activity.type";

const categories: { label: ActivityCategory; icon: string }[] = [
  { label: "문화 · 예술", icon: "/assets/icons/icon_art.svg" },
  { label: "식음료", icon: "/assets/icons/icon_food.svg" },
  { label: "투어", icon: "/assets/icons/icon_tour.svg" },
  { label: "관광", icon: "/assets/icons/icon_bus.svg" },
  { label: "웰빙", icon: "/assets/icons/icon_wellbeing.svg" },
];

interface AllExperiencesProps {
  category?: ActivityCategory;
  sort: ActivitySort;
  keyword?: string;
  page: number;
  onPageChange: (page: number) => void;
  onCategoryChange: (category?: ActivityCategory) => void;
  onSortChange: (sort: ActivitySort) => void;
  onResetAll: () => void;
}

function AllExperiences({
  category,
  sort,
  keyword,
  page,
  onPageChange,
  onCategoryChange,
  onSortChange,
  onResetAll,
}: AllExperiencesProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const size = 8;

  const { data, isPending, isError } = useActivities({
    method: "offset",
    page,
    size,
    category,
    keyword,
    sort,
  });

  useEffect(() => {
    if (!sectionRef.current) return;
    sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [page]);

  const totalCount = data?.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / size);

  const handlePageChange = (nextPage: number) => {
    onPageChange(nextPage);
  };

  return (
    <section
      ref={sectionRef}
      className="mx-auto mt-[80px] w-[1120px] pb-[218px]"
    >
      <h2 className="text-[24px] font-bold text-black">🛝 모든 체험</h2>

      <div className="mt-[20px] flex items-start justify-between gap-6">
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onResetAll}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-14 ${
              !category && !keyword && sort === "latest"
                ? "border-black bg-black text-white"
                : "border-gray-200 bg-white text-black"
            }`}
          >
            전체
          </button>

          {categories.map((item) => {
            const isActive = category === item.label;

            return (
              <button
                key={item.label}
                type="button"
                onClick={() => onCategoryChange(item.label)}
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-14 ${
                  isActive
                    ? "border-black bg-black text-white"
                    : "border-gray-200 bg-white text-black"
                }`}
              >
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={24}
                  height={24}
                  className={`h-6 w-6 ${isActive ? "brightness-0 invert" : ""}`}
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="relative shrink-0">
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value as ActivitySort)}
            className="appearance-none bg-transparent pr-4 text-14 text-black outline-none"
          >
            <option value="latest">최신순</option>
            <option value="price_asc">가격 낮은 순</option>
            <option value="price_desc">가격 높은 순</option>
          </select>
          <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-12">
            ▼
          </span>
        </div>
      </div>

      {keyword && (
        <p className="mt-4 text-sm text-gray-500">
          &apos;{keyword}&apos; 검색 결과입니다.
        </p>
      )}

      {isPending && <p className="mt-[30px] text-gray-500">불러오는 중...</p>}
      {isError && (
        <p className="mt-[30px] text-gray-500">
          체험 목록을 불러오지 못했습니다.
        </p>
      )}

      {!isPending && !isError && data && (
        <>
          <div className="mt-[30px] grid grid-cols-4 gap-[24px]">
            {data.activities.map((activity) => (
              <ExperienceCard key={activity.id} experience={activity} />
            ))}
          </div>

          <div className="mt-[30px]">
            <HomePagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </section>
  );
}

export default AllExperiences;