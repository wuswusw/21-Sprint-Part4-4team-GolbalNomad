// 예약 상태 뱃지

import type { BadgeStatus } from '@/types/card';

type StatusConfig = {
  label: string;
  className: string;
};

const statusConfig: Record<BadgeStatus, StatusConfig> = {
  canceled: {
    label: '예약 취소',
    className: 'bg-[var(--color-gray-100)] text-[var(--color-gray-600)]',
  },
  confirmed: {
    label: '예약 승인',
    className: 'bg-[#E9FBE4] text-[#2BA90D]',
  },
  declined: {
    label: '예약 거절',
    className: 'bg-[#FCECEA] text-[#F96767]',
  },
  pending: {
    label: '예약 신청',
    className: 'bg-[#DDF9F9] text-[#1790A0]',
  },
  completed: {
    label: '체험 완료',
    className: 'bg-[#DAF0FF] text-[#0D6CD1]',
  },
};

export default function Badge({ status }: { status: BadgeStatus }) {
  const { label, className } = statusConfig[status];
  return (
    <span className={`text-13 inline-block rounded-full px-2 py-1 font-bold ${className}`}>
      {label}
    </span>
  );
}
