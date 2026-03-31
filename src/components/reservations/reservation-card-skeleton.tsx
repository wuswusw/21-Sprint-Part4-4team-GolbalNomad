// 예약카드 스켈레톤
import Skeleton from '../common/skeleton/Skeleton';

export default function ReservationCardSkeleton() {
  return (
    <div className="relative flex rounded-xl p-5 shadow-[0_4px_24px_rgba(156,180,202,0.2)]">
      <div className="flex flex-1 flex-col justify-between space-y-2">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
      </div>

      <Skeleton className="h-24 w-24 rounded-lg" />
    </div>
  );
}
