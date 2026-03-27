import { useRouter } from 'next/navigation';
import type { CardExperiencesProps } from '@/types/card';
import { useModal } from '@/hooks/use-modal';
import Image from 'next/image';

export default function CardExperiences({
  id,
  imageUrl,
  title,
  rating,
  reviewCount = 0,
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
            imageSrc: '/assets/images/img-warning.png',
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
    <div className="desktop:p-9 flex w-full justify-between gap-3 rounded-xl p-6 shadow-[0_4px_24px_rgba(156,180,202,0.2)]">
      {/* 내용 */}
      <div className="desktop:gap-5 desktop:gap-5 flex flex-1 flex-col gap-3">
        <div className="desktop:gap-3 flex flex-col gap-[10px]">
          <div className="desktop:gap-2 flex flex-col gap-[6px]">
            <p className="desktop:text-18 text-16 font-bold text-[var(--color-gray-950)]">
              {title}
            </p>

            <div className="desktop:text-16 text-13 flex items-center gap-1 font-medium text-[var(--color-gray-500)]">
              <span className="text-yellow-400">
                <Image src="/assets/icons/star_on.svg" alt="star" width={11} height={11} />
              </span>
              <span>{rating.toFixed(1)}</span>
              {reviewCount !== undefined && <span className="">({reviewCount})</span>}
            </div>
          </div>

          <p className="desktop:text-18 text-16 flex items-center gap-1 font-bold">
            ₩ {price.toLocaleString()}
            <span className="desktop:text-16 text-14 font-medium text-[var(--color-gray-400)]">
              / 인
            </span>
          </p>
        </div>

        <div className="flex gap-2">{buttons}</div>
      </div>

      {/* 이미지 */}
      <div className="desktop:w-[142px] desktop:h-[142px] flex h-[82px] w-[82px] shrink-0 items-center justify-center overflow-hidden rounded-xl">
        <img src={imageUrl} alt={title} className="h-full w-full object-cover" />
      </div>
    </div>
  );
}
