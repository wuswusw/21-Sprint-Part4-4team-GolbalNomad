"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";
import ExperienceCard from "@/components/home/experience-card";
import ExperienceCardSkeleton from "@/components/home/experience-card-skeleton";
import HomePagination from "@/components/home/home-pagination";
import Dropdown, { type DropdownItem } from "@/components/common/Dropdown";
import { useActivities } from "@/features/activity/hooks/use-activities";
import type {
  ActivityCategory,
  ActivitySort,
} from "@/features/activity/types/activity.type";

const categories: {
  label: ActivityCategory;
  icon: string;
  emoji: string;
}[] = [
  { label: "문화 · 예술", icon: "/assets/icons/icon_art.svg", emoji: "🎨" },
  { label: "식음료", icon: "/assets/icons/icon_food.svg", emoji: "🍽️" },
  { label: "투어", icon: "/assets/icons/icon_tour.svg", emoji: "🧳" },
  { label: "관광", icon: "/assets/icons/icon_bus.svg", emoji: "🚌" },
  { label: "웰빙", icon: "/assets/icons/icon_wellbeing.svg", emoji: "🌿" },
];

const sortDropdownItems: DropdownItem[] = [
  { id: "latest", label: "최신순" },
  { id: "price_asc", label: "가격 낮은 순" },
  { id: "price_desc", label: "가격 높은 순" },
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

    sectionRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [page, keyword, category, sort]);

  const totalCount = data?.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / size);

  const selectedCategory = useMemo(
    () => categories.find((item) => item.label === category),
    [category]
  );

  const selectedSortItem = useMemo(
    () => sortDropdownItems.find((item) => item.id === sort) ?? null,
    [sort]
  );

  const title = useMemo(() => {
    if (keyword) {
      return `'${keyword}'으로 검색한 결과입니다.`;
    }

    if (selectedCategory) {
      return `${selectedCategory.emoji} ${selectedCategory.label}`;
    }

    return "🛝 모든 체험";
  }, [keyword, selectedCategory]);

  const handlePageChange = (nextPage: number) => {
    onPageChange(nextPage);
  };

  const handleSortSelect = (item: DropdownItem) => {
    onSortChange(item.id as ActivitySort);
  };

  return (
    <section
      ref={sectionRef}
      className="mx-auto w-full max-w-[327px] pb-[136.5px] tablet:max-w-[684px] tablet:pb-[204px] desktop:max-w-[1120px] desktop:pb-[218px]"
    >
      <div className="flex items-start justify-between gap-3 tablet:gap-4 desktop:block">
        <div className="flex min-w-0 flex-col gap-1 tablet:gap-2">
          <h2 className="text-[18px] font-bold text-black tablet:text-[24px]">
            {title}
          </h2>

          {(keyword || category) && (
            <p className="text-[12px] font-medium text-gray-500 tablet:text-[14px]">
              총 {totalCount}개의 결과
            </p>
          )}
        </div>

        <div className="shrink-0 desktop:hidden">
          <Dropdown
            items={sortDropdownItems}
            selectedItem={selectedSortItem}
            onSelect={handleSortSelect}
            type="filter"
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 tablet:mt-5 tablet:gap-6">
        <div className="min-w-0 flex-1 overflow-hidden">
          <div
            className="
              flex gap-2 overflow-x-auto whitespace-nowrap pb-1
              tablet:gap-3
              desktop:flex-wrap desktop:overflow-visible desktop:whitespace-normal desktop:pb-0
              [-ms-overflow-style:none] [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
            "
          >
            <button
              type="button"
              onClick={onResetAll}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-[14px] font-medium ${
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
                  onClick={() =>
                    onCategoryChange(isActive ? undefined : item.label)
                  }
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-[14px] font-medium ${
                    isActive
                      ? "border-black bg-black text-white"
                      : "border-gray-200 bg-white text-black"
                  }`}
                >
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={16}
                    height={16}
                    className={`h-4 w-4 ${isActive ? "brightness-0 invert" : ""}`}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="hidden shrink-0 desktop:block">
          <Dropdown
            items={sortDropdownItems}
            selectedItem={selectedSortItem}
            onSelect={handleSortSelect}
            type="filter"
          />
        </div>
      </div>

      {isPending && (
        <div className="mt-6 grid grid-cols-2 gap-4 tablet:mt-[30px] tablet:gap-6 desktop:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <ExperienceCardSkeleton key={index} />
          ))}
        </div>
      )}

      {isError && (
        <p className="mt-6 text-sm text-gray-500 tablet:mt-[30px]">
          체험 목록을 불러오지 못했습니다.
        </p>
      )}

      {!isPending && !isError && data && (
        <>
          {data.activities.length > 0 ? (
            <>
              <div className="mt-6 grid grid-cols-2 gap-4 tablet:mt-[30px] tablet:gap-6 desktop:grid-cols-4">
                {data.activities.map((activity) => (
                  <ExperienceCard
                    key={activity.id}
                    experience={activity}
                    variant="popular"
                  />
                ))}
              </div>

              <div className="mt-6 tablet:mt-[30px]">
                <HomePagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </>
          ) : (
            <p className="mt-6 text-sm text-gray-500 tablet:mt-[30px]">
              검색 결과가 없습니다.
            </p>
          )}
        </>
      )}
    </section>
  );
}

export default AllExperiences;