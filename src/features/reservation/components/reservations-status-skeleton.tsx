import Skeleton from "@/components/common/Skeleton";

export default function ReservationsStatusSkeleton() {
  return (
    <div className="desktop:w-160 tablet:w-[476px] w-full">
      <div className="flex flex-col desktop:gap-[30px] tablet:gap-6 gap-[18px]">
        <div className="flex flex-col gap-[10px] tablet:px-0 px-6">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-64" />
        </div>

        <div className="tablet:px-0 px-6 mb-[30px]">
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>

        <Skeleton className="h-[779px] rounded-3xl py-6 shadow-[0_4px_24px_0_#9CB4CA33]" />
      </div>
    </div>
  );
}
