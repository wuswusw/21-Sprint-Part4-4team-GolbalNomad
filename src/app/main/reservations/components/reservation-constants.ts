import type { BadgeStatus } from '@/types/card';

export const STATUS_FILTERS: { label: string; value: BadgeStatus }[] = [
  { label: '예약 신청', value: 'pending' },
  { label: '예약 승인', value: 'confirmed' },
  { label: '예약 취소', value: 'canceled' },
  { label: '예약 거절', value: 'declined' },
  { label: '체험 완료', value: 'completed' },
];

export const RESERVATION_ERROR_MESSAGE = '예약내역을 불러오지 못했습니다.';

export const INITIAL_SKELETON_COUNT = 3;
export const APPEND_SKELETON_COUNT = 5;
