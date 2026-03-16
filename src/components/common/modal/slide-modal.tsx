// 슬라이드 모달
'use client';

import { useState } from 'react';
import { SlideModalProps } from '@/types/modal';

interface Props extends SlideModalProps {
  onClose: () => void;
  padding?: string;
}

export default function SlideModal({
  title,
  children,
  onClose,
  padding = 'px-6 pb-8 pt-3',
}: Props) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
  };

  const handleAnimationEnd = () => {
    if (isClosing) onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50" onClick={handleClose} />
      <div
        onAnimationEnd={handleAnimationEnd}
        className={`fixed right-0 bottom-0 left-0 z-50 flex flex-col rounded-t-2xl bg-white ${padding} ${isClosing ? 'animate-slide-down' : 'animate-slide-up'}`}
      >
        {title && <h2 className="mb-4 text-lg font-bold text-[var(--color-gray-950)]">{title}</h2>}
        {children}
      </div>
    </>
  );
}
