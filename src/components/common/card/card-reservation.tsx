import Image from 'next/image';
import { useModal } from '@/hooks/use-modal';
import type { CardReservationProps } from '@/types/card';
import { cancelReservation } from '@/lib/api/reservations';
import Badge from './badge';

export default function CardReservation({
  id,
  activityId,
  imageUrl,
  status,
  title,
  date,
  startTime,
  endTime,
  price,
  people,
  onCancelSuccess,
  onReviewSuccess,
  reviewSubmitted,
}: CardReservationProps) {
  const { openModal } = useModal();
  const showEdit = status === 'pending';
  const showCancel = status === 'pending';
  const showWriteReview = status === 'completed' && !reviewSubmitted;

  const buttons = (
    <div className="flex w-full gap-3">
      {showEdit && (
        <button
          onClick={() => {
            if (!activityId) return;
            openModal('edit', {
              reservationId: id,
              activityId,
              price: Math.round(price / people),
              onConfirm: onCancelSuccess,
            });
          }}
          className="desktop:py-[6px] text-14 flex-1 rounded-sm border border-[var(--color-gray-50)] p-[10px] font-medium text-[var(--color-gray-600)]"
        >
          예약 변경
        </button>
      )}

      {showCancel && (
        <button
          onClick={() => {
            openModal('alert', {
              imageSrc: '/assets/images/img-warning.png',
              description: '예약을 취소하시겠어요?',
              confirmText: '취소하기',
              cancelText: '아니오',
              onConfirm: async () => {
                const token = localStorage.getItem('accessToken') || '';
                await cancelReservation(token, id);
                onCancelSuccess?.();
              },
            });
          }}
          className="desktop:py-[6px] text-14 flex-1 rounded-sm bg-[var(--color-gray-50)] p-[10px] font-medium text-[var(--color-gray-600)]"
        >
          예약 취소
        </button>
      )}
      {showWriteReview && (
        <button
          onClick={() => {
            openModal('review', {
              reservationId: id.toString(),
              activityTitle: title,
              reservationDate: `${date} / ${startTime} - ${endTime} (${people}명)`,
              onReviewSuccess,
            });
          }}
          className="desktop:py-[6px] text-14 flex-1 rounded-sm bg-[var(--color-primary-500)] p-[10px] font-medium text-white"
        >
          후기 작성
        </button>
      )}
    </div>
  );

  return (
    <div className="desktop:before:hidden relative flex w-full flex-col gap-3 before:absolute before:-top-[25px] before:right-0 before:left-0 before:block before:border-t before:border-[var(--color-primary-100)] before:content-[''] first:before:hidden">
      <div className="text-16 desktop:hidden font-bold">{date}</div>

      <div className="relative flex rounded-xl shadow-[0_4px_24px_rgba(156,180,202,0.2)]">
        {/* 내용 */}
        <div className="tablet:-mr-5 z-10 -mr-8.5 flex w-full flex-col gap-2 rounded-xl bg-white p-5 shadow-[0_-8px_20px_rgba(0,0,0,0.05)]">
          <div className="flex flex-col items-start gap-2">
            <Badge status={status} />

            <div className="flex flex-col items-start gap-1">
              <p className="text-18 font-bold">{title}</p>
              <p className="text-16 flex items-center gap-5 text-[var(--color-gray-500)]">
                <span className="desktop:after:content-['•'] desktop:after:absolute desktop:after:right-[-14px] desktop:block relative hidden">
                  {date}
                </span>
                <span>
                  {startTime} - {endTime}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-18 flex items-center gap-1 font-bold">
              ₩{price.toLocaleString()}
              <span className="text-16 font-medium text-[var(--color-gray-400)]">{people}명</span>
            </p>
            <div className="tablet:flex hidden">{buttons}</div>
          </div>
        </div>

        {/* 이미지 */}
        <div className="relative min-h-[136px] w-[136px] shrink-0 overflow-hidden rounded-xl">
          <Image src={imageUrl} alt={title} fill className="object-cover" />
        </div>
      </div>

      <div className="tablet:hidden flex">{buttons}</div>
    </div>
  );
}
