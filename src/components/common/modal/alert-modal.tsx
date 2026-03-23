// alert 모달
'use client';

import { AlertModalProps } from '@/types/modal';

const sizeClass = {
  sm: 'max-w-[390px]',
  md: 'max-w-[400px]',
  lg: 'max-w-[560px]',
};

interface Props extends AlertModalProps {
  onClose: () => void;
  onCancel?: () => void;
}

export default function AlertModal({
  imageSrc,
  description,
  confirmText,
  cancelText,
  onConfirm,
  onClose,
  size = 'sm',
}: Props) {
  const handleConfirm = async () => {
    await onConfirm?.();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className={`flex w-full flex-col gap-5 rounded-xl bg-white px-10 py-8 ${sizeClass[size]}`}
        onClick={(e) => e.stopPropagation()}
      >
        {imageSrc && (
          <img
            src={imageSrc}
            alt=""
            className="mx-auto w-full max-w-[88px] rounded-xl object-cover"
          />
        )}
        {description && <p className="text-18 text-center font-bold">{description}</p>}
        <div className="flex items-center justify-center gap-3">
          {cancelText && (
            <button
              onClick={onClose}
              className="rounded-lg border border-[var(--color-gray-700)] px-4 py-2 text-[var(--color-gray-700)]"
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={handleConfirm}
            className="rounded-lg bg-[var(--color-primary-500)] px-4 py-2 text-white"
          >
            {confirmText ?? '확인'}
          </button>
        </div>
      </div>
    </div>
  );
}
