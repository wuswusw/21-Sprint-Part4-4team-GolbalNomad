// 예약 내역
'use client';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import CardReservation from '@/components/common/card/card-reservation';
import type { BadgeStatus } from '@/types/card';
import PageHeader from '@/components/common/PageHeader';
import { getMyReservations } from '@/lib/api/reservations';
import type { ReservationItem } from '@/types/reservations';

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
      <div className="flex w-full flex-col items-start gap-3.5 py-2.5">
        {/* 타이틀 */}
        <PageHeader />

        {/* 상태 */}
        <div className="flex gap-2">
          {STATUS_FILTERS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setSelectedStatus((prev) => (prev === value ? null : value))}
              className={`text-16 rounded-full border px-4 py-2.5 font-medium transition-colors ${
                selectedStatus === value
                  ? 'border-[var(--color-primary-500)] bg-[var(--color-primary-500)] text-white'
                  : 'border-[#D8D8D8] bg-white text-[var(--color-gray-950)]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* 예약 리스트 */}
      <div className="flex w-full flex-col gap-6">
        {loading && items.length === 0 ? (
          <div>불러오는 중...</div>
        ) : error && items.length === 0 ? (
          <div>{error}</div>
        ) : items.length === 0 ? (
          <div>내역이 없습니다.</div>
        ) : (
          <>
            {items.map((item) => (
              <CardReservation
                key={item.id}
                id={item.id}
                imageUrl={item.activity?.bannerImageUrl || '/images/default-thumb.png'}
                status={item.status}
                title={item.activity?.title ?? '체험명 없음'}
                scheduledDate={`${item.date} ${item.startTime}~${item.endTime}`}
                price={item.totalPrice}
                people={item.headCount}
                onCancelSuccess={() => fetchReservations({ append: false })}
              />
            ))}
          </>
        )}

        {error && items.length > 0 && <div>{error}</div>}

        {hasMore && (
          <button
            onClick={() => fetchReservations({ append: true, nextCursorId: cursorId })}
            disabled={loading}
            className="rounded-lg border border-[var(--color-primary-500)] px-4 py-2.5 text-[var(--color-primary-500)] transition-colors hover:bg-[var(--color-primary-500)] hover:text-white disabled:opacity-50"
          >
            더 보기
          </button>
        )}
      </div>
    </>
  );
}
