// 예약내역 타입
import { BadgeStatus } from './card';

export type ReservationItem = {
  id: number;
  status: BadgeStatus;
  date: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  headCount: number;
  activity?: {
    title?: string;
    bannerImageUrl?: string;
  };
};

export type GetMyReservationsResponse = {
  cursorId: number | null;
  reservations: ReservationItem[];
};
