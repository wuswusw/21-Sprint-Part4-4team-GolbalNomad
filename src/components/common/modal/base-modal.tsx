// 모달 UI
'use client';

import { ReactNode } from 'react';

const sizeClass = {
  sm: 'tablet:max-w-[385px] max-w-[320px]',
  md: 'tablet:max-w-[400px] max-w-[320px]',
  lg: 'max-w-[560px]',
};

interface BaseModalProps {
  onClose?: () => void;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  padding?: string;
  gap?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
}

export default function BaseModal({
  onClose,
  children,
  size = 'md',
  gap = 'gap-5',
  padding = 'px-10 py-8',
  confirmText,
  cancelText,
  onConfirm,
}: BaseModalProps) {
  const handleConfirm = () => {
    onConfirm?.();
    onClose?.();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className={`relative flex w-full flex-col ${gap} rounded-xl bg-white ${padding} ${sizeClass[size]}`}
        onClick={(e) => e.stopPropagation()}
      >
        {onClose && (
          <div className="absolute top-6 right-[30px] flex items-center justify-center">
            <button onClick={onClose} className="h-6 w-6 text-gray-700" aria-label="닫기">
              <span className="absolute top-1/2 left-1/2 h-[2px] w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 transform bg-black before:absolute before:top-0 before:left-0 before:h-full before:w-full before:bg-black before:content-[''] after:absolute after:top-0 after:left-0 after:h-full after:w-full after:rotate-90 after:bg-black after:content-['']"></span>
            </button>
          </div>
        )}
        {children}
        {(confirmText || cancelText) && (
          <div className="flex items-center justify-center gap-3">
            {cancelText && (
              <button
                onClick={onClose}
                className="rounded-lg border border-[var(--color-gray-700)] px-4 py-2 text-[var(--color-gray-700)]"
              >
                {cancelText}
              </button>
            )}
            {confirmText && (
              <button
                onClick={handleConfirm}
                className="rounded-lg bg-[var(--color-primary-500)] px-4 py-2 text-white"
              >
                {confirmText}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
