// 모달 UI
'use client';

import { ReactNode } from 'react';

const sizeClass = {
  sm: 'max-w-[385px]',
  md: 'max-w-[400px]',
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
          <div className="absolute top-6 right-7.5">
            <button onClick={onClose} className="text-gray-700 hover:opacity-70" aria-label="닫기">
              ✕
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
