'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useOpenOutsideClick from '@/hooks/use-click-outside';
import { useModal } from '@/hooks/use-modal';
import { useDeleteMyExperience } from '@/features/experience/hooks/use-delete-my-experience';

interface ExperienceInfoProps {
  className?: string;
  activityId?: number;
  title?: string;
  category?: string;
  rating?: number;
  address?: string;
  description?: string;
  reviewCount?: number;
  isOwner?: boolean;
}

function ExperienceInfo({
  className,
  activityId,
  title,
  category,
  rating,
  address,
  description,
  reviewCount,
  isOwner = false,
}: ExperienceInfoProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { openModal } = useModal();
  const { mutateAsync: deleteExperience } = useDeleteMyExperience();

  const summary = description?.split('.')[0] + '.';

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
  }, []);
  useOpenOutsideClick(ref, closeDropdown, isOpen);

  const handleKebabClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleConfirmDelete = useCallback(() => {
    if (activityId == null) return;
    void (async () => {
      try {
        await deleteExperience(activityId);
        openModal('alert', {
          description: '체험이 삭제되었습니다.',
          confirmText: '확인',
        });
        router.push('/main/my-experiences');
      } catch (err) {
        const message = err instanceof Error ? err.message : '체험 삭제에 실패했습니다.';
        if (message === 'Unauthorized') {
          router.push('/auth/login');
          return;
        }
        openModal('alert', { description: message, confirmText: '확인' });
      }
    })();
  }, [activityId, deleteExperience, router, openModal]);

  const handleDeleteClick = () => {
    closeDropdown();
    if (activityId == null) return;
    openModal('alert', {
      imageSrc: '/assets/images/img-warning.png',
      description: '체험을 삭제하시겠어요?',
      confirmText: '삭제하기',
      cancelText: '아니오',
      onConfirm: handleConfirmDelete,
    });
  };

  return (
    <div className={`desktop:mb-[38px] relative ${className ?? ''}`}>
      {isOwner && (
        <div ref={ref}>
          <button className="absolute top-0 right-0" onClick={handleKebabClick}>
            <img src="/assets/icons/kebab.svg" alt="kebab" className="h-6 w-6" />
          </button>
          {isOpen && (
            <div className="absolute top-0 right-5 z-10 flex w-[95px] flex-col overflow-hidden rounded-lg bg-white ring ring-[#dfdfdf]">
              <Link
                href={`/main/my-experiences/edit/${activityId}`}
                className="text-16 hover:bg-primary-100 py-[18px] text-center text-gray-950"
                onClick={closeDropdown}
              >
                수정하기
              </Link>
              <button
                type="button"
                className="text-16 hover:bg-primary-100 py-[18px] text-gray-950"
                onClick={handleDeleteClick}
              >
                삭제하기
              </button>
            </div>
          )}
        </div>
      )}
      <p className="tablet:text-body-14 text-13 mb-2">{category}</p>
      <h1 className="tablet:text-24 text-18 mb-[17px] font-bold">{title}</h1>
      <div className="mb-[10px] flex items-center justify-start gap-[6px]">
        <img src="/assets/icons/star.svg" alt="star" className="h-4 w-4" />
        <span className="text-body-14 text-gray-700">
          {rating}({reviewCount ?? 0})
        </span>
      </div>
      <div className="desktop:mb-[17px] flex items-center justify-start gap-[2px]">
        <img src="/assets/icons/location.svg" alt="location" className="h-4 w-4" />
        <span className="text-body-14 text-gray-700">{address}</span>
      </div>
      <p className="text-body-16 desktop:block mb-[30px] hidden text-[#4B4B4B]">{summary}</p>
    </div>
  );
}

export default ExperienceInfo;
