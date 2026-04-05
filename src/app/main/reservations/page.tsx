// 예약 내역
'use client';
import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import CardReservation from '@/components/common/card/card-reservation';
import type { BadgeStatus } from '@/types/card';
import PageHeader from '@/components/common/PageHeader';
import { getMyReservations } from '@/lib/api/reservations';
import type { ReservationItem } from '@/types/reservations';
import useInfiniteScroll from '@/hooks/use-infinite-scroll';
import ReservationCardSkeleton from '@/components/reservations/reservation-card-skeleton';
import EmptyState from '@/components/common/empty/empty-state';
import { Button } from '@/components/ui/button';

const STATUS_FILTERS: { label: string; value: BadgeStatus }[] = [
  { label: '예약 신청', value: 'pending' },
  { label: '예약 승인', value: 'confirmed' },
  { label: '예약 취소', value: 'canceled' },
  { label: '예약 거절', value: 'declined' },
  { label: '체험 완료', value: 'completed' },
];

export default function ReservationPage() {
  const router = useRouter();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      router.replace('/auth/login');
    } else {
      setIsAuthChecked(true);
    }
  }, [router]);

  const [selectedStatus, setSelectedStatus] = useState<BadgeStatus | null>(null);
  const [items, setItems] = useState<ReservationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cursorId, setCursorId] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(false);

  const sentinelRef = useRef<HTMLDivElement>(null);

  const fetchReservations = useCallback(
    async ({
      append = false,
      nextCursorId,
    }: { append?: boolean; nextCursorId?: number | null } = {}) => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('accessToken') || '';
        const result = await getMyReservations(token, {
          status: selectedStatus ?? undefined,
          cursorId: append ? (nextCursorId ?? undefined) : undefined,
        });

        const list = result.reservations;
        setItems((prev) => (append ? [...prev, ...list] : list));
        setCursorId(result.cursorId ?? null);
        setHasMore(result.cursorId != null);
      } catch (err) {
        console.error(err);
        setError('예약내역을 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    },
    [selectedStatus],
  );

  useInfiniteScroll({
    targetRef: sentinelRef,
    enabled: hasMore && !loading,
    onIntersect: () =>
      fetchReservations({
        append: true,
        nextCursorId: cursorId,
      }),
  });

  useEffect(() => {
    if (!isAuthChecked) return;
    setCursorId(null);
    setItems([]);
    setHasMore(false);
    fetchReservations({ append: false });
  }, [selectedStatus, fetchReservations, isAuthChecked]);

  if (!isAuthChecked) return null;

  return (
    <>
      {/* 상단 */}
      <div className="flex w-full flex-col items-start gap-6 py-2.5">
        {/* 타이틀 */}
        <PageHeader />

        {/* 상태 */}
        <div className="tablet:px-0 w-full overflow-x-hidden px-[24px]">
          <div className="overflow-x-auto overscroll-x-contain pr-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex w-max gap-2">
              {STATUS_FILTERS.map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => setSelectedStatus((prev) => (prev === value ? null : value))}
                  className={`text-16 shrink-0 rounded-full border px-4 py-[10px] transition-colors ${
                    selectedStatus === value
                      ? 'border-[#333333] bg-[#333333] font-bold text-white'
                      : 'border-[#D8D8D8] bg-white font-medium text-[var(--color-gray-950)]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 예약 리스트 */}
      <div className="desktop:gap-[24px] tablet:px-0 flex w-full flex-col gap-[50px] px-[24px]">
        {loading && items.length === 0 ? (
          <>
            {Array.from({ length: 3 }).map((_, index) => (
              <ReservationCardSkeleton key={index} />
            ))}
          </>
        ) : error && items.length === 0 ? (
          <div>{error}</div>
        ) : items.length === 0 ? (
          <EmptyState title="아직 예약한 체험이 없어요." buttonText="둘러보기" buttonHref="/" />
        ) : (
          <>
            {items.map((item) => (
              <CardReservation
                key={item.id}
                id={item.id}
                activityId={item.activity?.id}
                imageUrl={item.activity?.bannerImageUrl || '/images/default-thumb.png'}
                status={item.status}
                title={item.activity?.title ?? '체험명 없음'}
                scheduledDate={`${item.date} ${item.startTime} - ${item.endTime}`}
                date={item.date}
                startTime={item.startTime}
                endTime={item.endTime}
                price={item.totalPrice}
                people={item.headCount}
                onCancelSuccess={() => fetchReservations({ append: false })}
                onReviewSuccess={() => fetchReservations({ append: false })}
                reviewSubmitted={item.reviewSubmitted}
              />
            ))}
          </>
        )}

        {error && items.length > 0 && <div>{error}</div>}

        {hasMore && <div ref={sentinelRef} />}
        {loading && items.length > 0 && (
          <>
            {Array.from({ length: 5 }).map((_, index) => (
              <ReservationCardSkeleton key={index} />
            ))}
          </>
        )}
      </div>
    </>
  );
}
