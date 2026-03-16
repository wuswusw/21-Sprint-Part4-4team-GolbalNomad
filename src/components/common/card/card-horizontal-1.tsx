import { useRouter } from 'next/navigation';
import { useModal } from '@/hooks/use-modal';
import { CardHorizontal1Props } from '@/types/card';
import Badge from './badge';

export default function CardHorizontal1({
  id,
  imageUrl,
  status,
  title,
  scheduledDate,
  headCount,
  price,
  people,
}: CardHorizontal1Props) {
  const router = useRouter();
  const { openModal } = useModal();
  const showEdit = status === 'confirmed';
  const showCancel = status === 'confirmed';
  const showWriteReview = status === 'completed';

  const buttons = (
    <div className="flex gap-2">
      {showEdit && (
        <button
          onClick={() => router.push(`/main/reservations/${id}/edit`)}
          className="text-14 rounded-sm border border-[var(--color-gray-50)] px-[10px] py-[6px] text-[var(--color-gray-600)]"
        >
          예약 변경
        </button>
      )}

      {showCancel && (
        <button
          onClick={() => router.push(`/main/reservations/${id}/cancel`)}
          className="text-14 rounded-sm bg-[var(--color-gray-50)] px-[10px] py-[6px] text-[var(--color-gray-600)]"
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
              reservationDate: scheduledDate,
            });
          }}
          className="text-14 rounded-sm bg-[var(--color-primary-500)] px-[10px] py-[6px] text-white"
        >
          후기 작성
        </button>
      )}
    </div>
  );

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="relative flex rounded-xl shadow-[0_4px_24px_rgba(156,180,202,0.2))]">
        {/* 내용 */}
        <div className="z-2 -mr-6 flex w-full flex-col gap-1.5 rounded-xl bg-white px-10 py-7.5 shadow-[0_-8px_20px_rgba(0,0,0,0.05)]">
          <div className="flex flex-col items-start gap-3">
            <Badge status={status} />

            <div className="flex flex-col items-start gap-2">
              <p className="text-18 font-bold">{title}</p>
              <p className="text-16 text-[var(--color-gray-500)]">{scheduledDate}</p>
              {headCount && (
                <p className="text-14 text-[var(--color-gray-500)]">인원: {headCount}명</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-18 flex items-center gap-1 font-bold">
              ₩{price.toLocaleString()}
              <span className="text-16 font-medium text-[var(--color-gray-400)]">{people}명</span>
            </p>
            <div className="">{buttons}</div>
          </div>
        </div>

        {/* 이미지 */}
        <div className="h-[180px] w-[180px] shrink-0 overflow-hidden rounded-xl">
          <img src={imageUrl} alt={title} className="h-full w-full object-cover" />
        </div>
      </div>
      <div className="tablet:hidden flex">{buttons}</div>
    </div>
  );
}
