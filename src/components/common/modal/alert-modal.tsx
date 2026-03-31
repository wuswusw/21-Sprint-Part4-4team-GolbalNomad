'use client';

import { AlertModalProps } from '@/types/modal';
import Image from 'next/image';
import Button from '@/components/common/Button';

const sizeClass = {
  sm: 'max-w-[320px] md:max-w-[400px]',
  md: 'max-w-[320px] md:max-w-[400px]',
  lg: 'max-w-[320px] md:max-w-[400px]',
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={onClose}
    >
      <div
        className={`flex w-full flex-col gap-5 rounded-xl bg-white px-10 py-8 ${sizeClass[size]}`}
        onClick={(e) => e.stopPropagation()}
      >
        {imageSrc && (
          <Image
            src={imageSrc}
            alt="alert"
            width={88}
            height={88}
            className="mx-auto w-full max-w-[88px] rounded-xl object-cover"
          />
        )}

        {description && <p className="text-18 text-center font-bold">{description}</p>}

        <div className="flex items-center justify-center gap-3">
          {cancelText && (
            <Button
              variant="outline"
              type="button"
              onClick={onClose}
              // className="rounded-lg border border-[var(--color-gray-700)] px-4 py-2 text-[var(--color-gray-700)]"
            >
              {cancelText}
            </Button>
          )}
          <Button
            onClick={handleConfirm}
            // className="rounded-lg bg-[var(--color-primary-500)] px-4 py-2 text-white"
          >
            {confirmText ?? '확인'}
          </Button>
        </div>
      </div>
    </div>
  );
}
