import { CardHorizontal2Props } from '@/types/card';

export default function CardHorizontal2({
  imageUrl,
  title,
  rating,
  reviewCount,
  price,
  onEdit,
  onDelete,
}: CardHorizontal2Props) {
  const buttons = (
    <div className="flex gap-2">
      {onEdit && (
        <button
          onClick={onEdit}
          className="text-14 rounded-sm border border-[var(--color-gray-50)] px-[10px] py-[6px] text-[var(--color-gray-600)]"
        >
          수정하기
        </button>
      )}
      {onDelete && (
        <button
          onClick={onDelete}
          className="text-14 rounded-sm bg-[var(--color-gray-50)] px-[10px] py-[6px] text-[var(--color-gray-600)]"
        >
          삭제하기
        </button>
      )}
    </div>
  );

  return (
    <div className="flex w-full justify-between gap-3 rounded-xl px-7.5 py-9 shadow-[0_4px_24px_rgba(156,180,202,0.2))]">
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
