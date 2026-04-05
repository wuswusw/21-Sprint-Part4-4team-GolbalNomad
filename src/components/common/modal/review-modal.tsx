// review 모달
'use client';

import { useState } from 'react';
import { ReviewModalProps } from '@/types/modal';
import { postReview } from '@/lib/api/reservations';
import BaseModal from './base-modal';
import Image from 'next/image';
import Button from '@/components/common/Button';

interface Props extends ReviewModalProps {
  onClose: () => void;
}

export default function ReviewModal({
  reservationId,
  activityTitle,
  reservationDate,
  onReviewSuccess,
  onClose,
}: Props) {
  const [rating, setRating] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const resetForm = () => {
    setRating('');
    setContent('');
    setError('');
  };

  const handleSubmit = async () => {
    if (!rating) {
      setError('별점을 선택해 주세요.');
      return;
    }
    const trimmedContent = content.trim();
    if (trimmedContent.length < 5) {
      setError('후기 내용은 5자 이상 입력해 주세요.');
      return;
    }

    const token = localStorage.getItem('accessToken') ?? '';
    setIsLoading(true);
    try {
      await postReview(token, reservationId, {
        rating: Number(rating),
        content: trimmedContent,
      });
      resetForm();
      onReviewSuccess?.();
      onClose();
    } catch {
      setError('후기 작성에 실패했습니다. 다시 시도해 주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStarClick = (star: number) => {
    setRating(star.toString());
    setActiveIndex(star);
    setTimeout(() => {
      setActiveIndex(null);
    }, 500);
  };

  const ratingText: Record<number, string> = {
    1: '아쉬워요',
    2: '조금 아쉬워요',
    3: '괜찮았어요',
    4: '만족스러웠어요',
    5: '정말 좋았어요',
  };

  return (
    <BaseModal
      onClose={onClose}
      gap="gap-5 tablet:gap-[30px]"
      padding="px-[24px] pt-[20px] pb-[23px]"
    >
      <div className="tablet:gap-[18px] flex flex-col gap-[17px]">
        {/* 타이틀 */}
        <div className="flex flex-col items-center gap-1.5 pt-8">
          <h2 className="text-14 tablet:text-16 font-bold text-[var(--color-gray-950)]">
            {activityTitle}
          </h2>
          <p className="text-13 tablet:text-14 text-[var(--color-gray-500)]">{reservationDate}</p>
        </div>

        {/* 별점 */}
        <div className="tablet:gap-[18px] flex items-center justify-center gap-[11px]">
          {[1, 2, 3, 4, 5].map((star) => (
            <button key={star} onClick={() => handleStarClick(star)}>
              <Image
                src={`/assets/icons/star_${star <= Number(rating) ? 'on' : 'off'}.svg`}
                width={35}
                height={35}
                className={`tablet:w-[35px] tablet:h-[35px] h-[30px] w-[30px] transition-transform duration-150 ease-in-out active:scale-95 ${activeIndex !== null && star <= activeIndex ? 'scale-130' : 'scale-100'} `}
                alt={`별점 ${star}점`}
                style={{
                  transitionDelay:
                    activeIndex !== null && star <= activeIndex ? `${(star - 1) * 80}ms` : '0ms',
                }}
              />
              <input type="radio" name="rating" value={star} className="hidden" />
            </button>
          ))}
        </div>
        {rating && (
          <p className="text-14 text-center text-[var(--color-gray-600)]">
            {ratingText[Number(rating)]}
          </p>
        )}
      </div>

      <div className="flex flex-col">
        <p className="text-16 tablete:text-18 font-bold">소중한 경험을 들려주세요</p>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="체험에서 느낀 경험을 자유롭게 남겨주세요"
          className="placeholder:text-14 tablet:placeholder:text-16 tablet:mt-4 mt-3 mb-2 h-32 w-full resize-none rounded-lg border border-[var(--color-gray-100)] p-3 text-sm font-medium shadow-[0_4px_24px_rgba(156,180,202,0.2)] placeholder:text-[var(--color-gray-400)] focus:border-[var(--color-primary-500)] focus:outline-none"
          maxLength={100}
        />
        <p className="text-13 tablet:text-14 text-right text-[var(--color-gray-600)]">
          {content.length} / 100
        </p>
      </div>

      {error && <p className="text-14 text-center text-red-500">{error}</p>}

      <div className="flex items-center justify-center">
        <Button
          onClick={handleSubmit}
          disabled={isLoading || !rating || content.trim().length < 5}
          size="full"
          // className="rounded-lg bg-[var(--color-primary-500)] px-4 py-2 text-white disabled:opacity-50"
        >
          {isLoading ? '작성 중...' : '작성하기'}
        </Button>
      </div>
    </BaseModal>
  );
}
