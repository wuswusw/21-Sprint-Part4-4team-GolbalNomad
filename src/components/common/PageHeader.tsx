// 페이지 상단
'use client';

import { usePathname, useRouter } from 'next/navigation';

interface PageHeaderConfig {
  title: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
}

const pageHeaderConfig: Record<string, PageHeaderConfig> = {
  '/main/profile': {
    title: '내 정보',
    description: '닉네임과 비밀번호를 수정하실 수 있습니다.',
  },

  '/main/reservations': {
    title: '예약내역',
    description: '예약내역 변경 및 취소할 수 있습니다.',
  },

  '/main/my-experiences': {
    title: '내 체험 관리',
    description: '체험을 등록하거나 수정 및 삭제가 가능합니다.',
    buttonText: '체험 등록하기',
    buttonHref: '/main/my-experiences/create',
  },

  '/main/my-experiences/create': {
    title: '내 체험 등록',
  },

  '/main/my-experiences/edit': {
    title: '내 체험 수정',
  },

  '/main/reservations-status': {
    title: '예약 현황',
    description: '내 체험에 예약된 내역들을 한 눈에 확인할 수 있습니다.',
  },
};

export default function PageHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const config = pageHeaderConfig[pathname];

  return (
    <div className="flex w-full justify-between gap-4 px-[24px]">
      <div className="flex flex-1 flex-col items-start gap-[10px]">
        <h3 className="text-18 font-bold">{config?.title}</h3>
        {config?.description && (
          <p className="text-14 font-medium text-gray-500">{config?.description}</p>
        )}
      </div>

      {config?.buttonText && config.buttonHref && (
        <button
          className="text-16 flex-shrink-0 rounded-xl bg-[var(--color-primary-500)] px-4 py-2.5 font-bold text-white"
          onClick={() => router.push(config.buttonHref!)}
        >
          {config.buttonText}
        </button>
      )}
    </div>
  );
}
