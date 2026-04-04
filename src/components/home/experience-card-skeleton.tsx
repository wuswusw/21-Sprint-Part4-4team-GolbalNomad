import Skeleton from "@/components/common/Skeleton";

function ExperienceCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-[16px] bg-white shadow-[0_6px_16px_rgba(156,180,202,0.18)] tablet:rounded-[24px]">
      <div className="relative w-full overflow-hidden rounded-[16px] tablet:rounded-[24px]">
        <Skeleton className="h-[160px] w-full rounded-[16px] tablet:h-[300px] tablet:rounded-[24px] desktop:h-[290px]" />
      </div>

      <div
        className="
          relative z-[2] -mt-[32px] flex flex-col gap-2 rounded-[16px] bg-white px-5 py-4
          shadow-[0_-4px_12px_rgba(0,0,0,0.04)]
          tablet:-mt-[60px] tablet:gap-4 tablet:rounded-[24px] tablet:px-[24px] tablet:py-5
          desktop:px-[30px]
        "
      >
        <div className="flex flex-col gap-1.5 tablet:gap-2">
          <Skeleton className="h-[14px] w-[78%] tablet:h-[18px]" />
          <Skeleton className="h-[12px] w-[72px] tablet:h-[14px]" />
        </div>

        <Skeleton className="h-[15px] w-[96px] tablet:h-[18px]" />
      </div>
    </div>
  );
}

export default ExperienceCardSkeleton;