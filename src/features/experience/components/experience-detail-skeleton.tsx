import { Skeleton } from "@/components/ui/skeleton";

function ExperienceDetailSkeleton() {
  return (
    <div className="w-full">
      <div className="w-full mx-auto desktop:mt-22 tablet:mt-[34px] mt-[30px] desktop:mb-45 mb-[75px] mb-[30px] flex justify-center pb-[168px] desktop:pb-0 overflow-x-hidden">
        <div className="w-full desktop:max-w-[1200px] px-10 grid grid-cols-1 desktop:grid-cols-[1fr_410px] gap-10">
          <section className="w-full min-w-0 flex flex-col gap-6 tablet:gap-[30px] desktop:gap-10">
            {/* ImageGallery */}
            <Skeleton className="w-full aspect-video rounded-3xl" />

            {/* ExperienceInfo (mobile/tablet) */}
            <div className="desktop:hidden flex flex-col gap-3">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-7 w-3/4" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-48" />
            </div>

            <hr className="w-full border-[#E0E0E5] desktop:hidden" />

            {/* ExperienceDesc */}
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-5/6" />
            </div>

            <hr className="w-full border-[#E0E0E5]" />

            {/* Map */}
            <Skeleton className="w-full h-[300px] tablet:h-[400px] rounded-2xl" />

            <hr className="w-full border-[#E0E0E5]" />

            {/* ReviewSection */}
            <div className="flex flex-col gap-4">
              <Skeleton className="h-7 w-40" />
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="w-full rounded-xl p-5 shadow-[0px_4px_24px_0px_#9CB4CA33] flex flex-col gap-3"
                >
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          </section>

          <section className="hidden desktop:block">
            <div className="flex flex-col gap-3 mb-[38px]">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-7 w-3/4" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-full" />
            </div>
            <div className="p-[30px] rounded-3xl shadow-[0px_4px_24px_0px_#9CB4CA33] flex flex-col gap-6">
              <Skeleton className="h-8 w-40" />
              <Skeleton className="h-[280px] w-full rounded-2xl" />
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-12 w-full rounded-[14px]" />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default ExperienceDetailSkeleton;
