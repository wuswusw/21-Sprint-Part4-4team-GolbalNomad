"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useActivities } from "@/features/activity/hooks/use-activities";

function HomeBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data, isPending, isError } = useActivities({
    method: "offset",
    sort: "most_reviewed",
    page: 1,
    size: 5,
  });

  const activities = useMemo(() => data?.activities ?? [], [data]);

  const safeIndex =
    activities.length > 0 ? currentIndex % activities.length : 0;

  useEffect(() => {
    if (activities.length <= 1) return;

    const timer = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activities.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [activities.length]);

  return (
    <section className="pt-[103px] pb-[56px]">
      <div
        className="
          relative mx-auto h-[500px] w-[1120px]
          overflow-hidden rounded-[24px]
          shadow-[0_4px_24px_0_rgba(156,180,202,0.2)]
        "
      >
        {isPending && (
          <div className="flex h-full w-full items-center justify-center bg-[#DCEEFF]">
            <p className="text-gray-600">배너를 불러오는 중...</p>
          </div>
        )}

        {isError && (
          <div className="flex h-full w-full items-center justify-center bg-[#DCEEFF]">
            <p className="text-gray-600">배너를 불러오지 못했습니다.</p>
          </div>
        )}

        {!isPending && !isError && activities.length > 0 && (
          <div
            className="flex h-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${safeIndex * 100}%)` }}
          >
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="relative h-full min-w-full flex-shrink-0"
              >
                <Image
                  src={activity.bannerImageUrl}
                  alt={activity.title}
                  fill
                  priority
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-black/20" />

                <div className="absolute inset-x-0 top-[321px] flex flex-col items-center text-white">
                  <h1 className="text-center text-[32px] font-bold leading-none">
                    {activity.title}
                  </h1>

                  <p className="mt-[19px] text-center text-[18px] font-bold leading-none">
                    1명의 참가자가 BEST 🔥
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