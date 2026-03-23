import { useRouter } from 'next/navigation';
import type { CardExperiencesProps } from '@/types/card';
import { useModal } from '@/hooks/use-modal';

export default function CardExperiences({
  id,
  imageUrl,
  title,
  rating,
  reviewCount,
  price,
  onDelete,
}: CardExperiencesProps) {
  const router = useRouter();
  const { openModal } = useModal();

  const buttons = (
    <div className="flex gap-2">
      <button
        onClick={() => router.push(`/main/my-experiences/${id}/edit`)}
        className="text-14 rounded-sm border border-[var(--color-gray-50)] px-[10px] py-[6px] text-[var(--color-gray-600)]"
      >
        수정하기
      </button>
      <button
        onClick={() => {
          openModal('alert', {
            imageSrc: 'https://cdn-icons-png.flaticon.com/512/5610/5610967.png',
            description: '체험을 삭제하시겠어요?',
            confirmText: '삭제하기',
            cancelText: '아니오',
            onConfirm: () => {
              onDelete?.();
            },
          });
        }}
        className="text-14 rounded-sm bg-[var(--color-gray-50)] px-[10px] py-[6px] text-[var(--color-gray-600)]"
      >
        삭제하기
      </button>
    </div>
  );

  return (
    <div className="flex w-full justify-between gap-3 rounded-xl px-7.5 py-9 shadow-[0_4px_24px_rgba(156,180,202,0.2)]">
      {/* 내용 */}
      <div className="flex flex-1 flex-col justify-between gap-5">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <p className="text-18 font-bold">{title}</p>
            <div className="text-16 flex items-center gap-1 font-medium text-[var(--color-gray-500)]">
              <span className="text-yellow-400">★</span>
              <span>{rating.toFixed(1)}</span>
              {reviewCount !== undefined && <span className="">({reviewCount})</span>}
            </div>
          </div>

          <p className="text-18 flex items-center gap-1 font-bold">
            ₩ {price.toLocaleString()}
            <span className="text-16 font-medium text-[var(--color-gray-400)]">/ 인</span>
          </p>
        </div>
        <div className="flex gap-2">{buttons}</div>
      </div>

      {/* 이미지 */}
      <div className="flex h-[142px] w-[142px] shrink-0 items-center justify-center overflow-hidden rounded-xl">
        <img src={imageUrl} alt={title} className="h-full w-full object-cover" />
      </div>
    </div>
  );
}
