"use client";

import Image from "next/image";
import { AlertModalProps } from "@/types/modal";

const sizeClass = {
  sm: "max-w-[320px] md:max-w-[400px]",
  md: "max-w-[320px] md:max-w-[400px]",
  lg: "max-w-[320px] md:max-w-[400px]",
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
  size = "sm",
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
          <div className="relative mx-auto h-[88px] w-[88px] overflow-hidden rounded-xl">
            <Image src={imageSrc} alt="" fill className="object-cover" />
          </div>
        )}

        {description && (
          <p className="text-18 text-center font-bold">{description}</p>
        )}

        <div className="flex items-center justify-center gap-3">
          {cancelText && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-[var(--color-gray-700)] px-4 py-2 text-[var(--color-gray-700)]"
            >
              {cancelText}
            </button>
          )}

          <button
            type="button"
            onClick={handleConfirm}
            className="h-[41px] w-[180px] rounded-lg bg-[var(--color-primary-500)] text-white md:h-[47px] md:w-[200px]"
          >
            {confirmText ?? "확인"}
          </button>
        </div>
      </div>
    </div>
  );
}