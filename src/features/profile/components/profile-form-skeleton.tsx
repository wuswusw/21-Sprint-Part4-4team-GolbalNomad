import Skeleton from "@/components/common/Skeleton";

interface ProfileFormSkeletonProps {
  isMobile?: boolean;
}

export default function ProfileFormSkeleton({
  isMobile = false,
}: ProfileFormSkeletonProps) {
  const containerClassName = isMobile
    ? "w-[327px]"
    : "w-[640px] tablet:w-[420px] desktop:w-[640px]";

  const inputClassName = isMobile
    ? "h-[54px] w-[327px] rounded-[16px]"
    : "h-[56px] w-[640px] tablet:w-[420px] desktop:w-[640px] rounded-[16px]";

  return (
    <div className={containerClassName}>
      <div className={isMobile ? "pt-[35px]" : ""}>
        <Skeleton className="h-[22px] w-[72px] rounded-md" />
        <Skeleton className="mt-[8px] h-[14px] w-[220px] rounded-md" />
      </div>

      <div className={isMobile ? "mt-[20px]" : "mt-6"}>
        <div
          className={isMobile ? "flex flex-col gap-[18px]" : "flex flex-col gap-6"}
        >
          <div>
            <Skeleton className="mb-[10px] h-[16px] w-[64px] rounded-md" />
            <Skeleton
              className={`${inputClassName} border border-[#E0E0E5] bg-white shadow-[0_6px_6px_rgba(0,0,0,0.02)]`}
            />
          </div>

          <div>
            <Skeleton className="mb-[10px] h-[16px] w-[64px] rounded-md" />
            <Skeleton
              className={`${inputClassName} border border-[#E0E0E5] bg-[#F7F8FA] shadow-[0_6px_6px_rgba(0,0,0,0.02)]`}
            />
          </div>

          <div>
            <Skeleton className="mb-[10px] h-[16px] w-[64px] rounded-md" />
            <Skeleton
              className={`${inputClassName} border border-[#E0E0E5] bg-white shadow-[0_6px_6px_rgba(0,0,0,0.02)]`}
            />
          </div>

          <div>
            <Skeleton className="mb-[10px] h-[16px] w-[90px] rounded-md" />
            <Skeleton
              className={`${inputClassName} border border-[#E0E0E5] bg-white shadow-[0_6px_6px_rgba(0,0,0,0.02)]`}
            />
          </div>
        </div>

        {isMobile ? (
          <div className="mt-6 flex gap-3">
            <Skeleton className="h-[47px] w-[157.5px] rounded-[12px]" />
            <Skeleton className="h-[47px] w-[157.5px] rounded-[12px]" />
          </div>
        ) : (
          <div className="mt-6 flex justify-center">
            <Skeleton className="h-[41px] w-[120px] rounded-[16px]" />
          </div>
        )}
      </div>
    </div>
  );
}