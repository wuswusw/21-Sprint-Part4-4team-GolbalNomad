// 빈 상태 컴포넌트
'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Button from '@/components/common/Button';

interface EmptyStateProps {
  title: string;
  buttonText?: string;
  buttonHref?: string;
  buttonClick?: () => void;
}

export default function EmptyState({
  title,
  buttonText,
  buttonHref,
  buttonClick,
}: EmptyStateProps) {
  const router = useRouter();
  const showButton = buttonText && (buttonHref || buttonClick);

  const handleClick = () => {
    if (buttonClick) {
      buttonClick();
      return;
    }

    if (buttonHref) {
      router.push(buttonHref);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-[30px] py-[80px] text-center">
      <Image src="/assets/images/img-no-empty.svg" alt="empty" width={100} height={100} />

      <h2 className="text-18 font-medium text-gray-600">{title}</h2>

      {showButton && (
        <Button size="lg" onClick={handleClick}>
          {buttonText}
        </Button>
      )}
    </div>
  );
}
