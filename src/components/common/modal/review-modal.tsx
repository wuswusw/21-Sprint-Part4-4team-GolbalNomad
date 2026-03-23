// review 모달
'use client';

import { useState } from 'react';
import { ReviewModalProps } from '@/types/modal';
import BaseModal from './base-modal';

interface Props extends ReviewModalProps {
  onClose: () => void;
}

export default function ReviewModal({
  reservationId,
  activityTitle,
  reservationDate,
  onClose,
}: Props) {
  const [rating, setRating] = useState(3);
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    // TODO: API 연동
    console.log('후기 제출:', { reservationId, rating, content });
  };

  return (
    <BaseModal
      onClose={onClose}
      gap="gap-7.5"
      padding="px-7.5 py-6"
      confirmText="작성하기"
      onConfirm={handleSubmit}
    >
      <div className="flex flex-col gap-3.5">
        {/* 타이틀 */}
        <div className="flex flex-col items-center gap-1.5 pt-13">
          <h2 className="text-16 font-bold text-[var(--color-gray-950)]">{activityTitle}</h2>
          <p className="text-14 text-[var(--color-gray-500)]">{reservationDate}</p>
        </div>

        {/* 별점 */}
        <div className="flex items-center justify-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            // <button
            //   key={star}
            //   onClick={() => setRating(star)}
            //   className={`text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
            //   aria-label={`별점 ${star}점`}
            // >
            //   ★
            // </button>
            <label key={star} onClick={() => setRating(star)}>
              <img
                src={`/assets/icons/star_${star <= rating ? 'on' : 'off'}.svg`}
                alt={`별점 ${star}점`}
              />
              <input type="radio" name="rating" value={star} className="hidden" />
            </label>
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
    </BaseModal>
  );
}
