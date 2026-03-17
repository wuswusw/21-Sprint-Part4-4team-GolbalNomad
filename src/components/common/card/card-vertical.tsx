import { CardVerticalProps } from '@/types/card';

export default function CardVertical({
  imageUrl,
  title,
  rating,
  reviewCount,
  price,
  onClick,
}: CardVerticalProps) {
  return (
    <div
      onClick={onClick}
      className="flex w-full cursor-pointer flex-col overflow-hidden rounded-xl shadow-[0_4px_24px_rgba(156,180,202,0.2))]"
    >
      {/* 이미지 */}
      <div className="relative h-[290px] w-full">
        <img src={imageUrl} alt={title} className="h-full w-full object-cover" />
      </div>

      {/* 내용 */}
      <div className="z-2 -mt-15 flex flex-col gap-4 rounded-xl bg-white px-7.5 py-5 shadow-[0_-8px_20px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col gap-2">
          <p className="text-18 truncate font-bold">{title}</p>
          <div className="text-14 flex items-center gap-1">
            <span className="text-yellow-400">★</span>
            <span>{rating.toFixed(1)}</span>
            {reviewCount !== undefined && (
              <span className="text-[var(--color-gray-400)]">({reviewCount})</span>
            )}
          </div>
        </div>
        <p className="text-18 font-bold">
          ₩ {price.toLocaleString()}
          <span className="text-16 font-medium text-[var(--color-gray-400)]">/ 인</span>
        </p>
      </div>
    </div>
  );
}
