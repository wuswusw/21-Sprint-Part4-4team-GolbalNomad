// review 모달
'use client';

import { useState } from 'react';
import { ReviewModalProps } from '@/types/modal';
import { postReview } from '@/lib/api/reservations';
import BaseModal from './base-modal';
import Image from 'next/image';

interface Props extends ReviewModalProps {
  onClose: () => void;
}

export default function ReviewModal({
  reservationId,
  activityTitle,
  reservationDate,
  onClose,
}: Props) {
  const [rating, setRating] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
      onClose();
    } catch {
      setError('후기 작성에 실패했습니다. 다시 시도해 주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BaseModal onClose={onClose} gap="gap-7.5" padding="px-7.5 py-6">
      <div className="flex flex-col gap-3.5">
        {/* 타이틀 */}
        <div className="flex flex-col items-center gap-1.5 pt-13">
          <h2 className="text-16 font-bold text-[var(--color-gray-950)]">{activityTitle}</h2>
          <p className="text-14 text-[var(--color-gray-500)]">{reservationDate}</p>
        </div>

        {/* 별점 */}
        <div className="flex items-center justify-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button key={star} onClick={() => setRating(star.toString())}>
              <Image
                src={`/assets/icons/star_${star <= Number(rating) ? 'on' : 'off'}.svg`}
                width={35}
                height={34}
                alt={`별점 ${star}점`}
              />
              <input type="radio" name="rating" value={star} className="hidden" />
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col">
        <p className="text-18 font-bold">소중한 경험을 들려주세요</p>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="체험에서 느낀 경험을 자유롭게 남겨주세요"
          className="mt-4 mb-2 h-32 w-full resize-none rounded-lg border border-[var(--color-gray-300)] p-3 text-sm focus:border-[var(--color-primary-500)] focus:outline-none"
          maxLength={100}
        />
        <p className="text-14 text-right text-[var(--color-gray-600)]">{content.length} / 100</p>
      </div>

      {error && <p className="text-14 text-center text-red-500">{error}</p>}

      <div className="flex items-center justify-center">
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="rounded-lg bg-[var(--color-primary-500)] px-4 py-2 text-white disabled:opacity-50"
        >
          {isLoading ? '작성 중...' : '작성하기'}
        </button>
      </div>
    </BaseModal>
  );
}
