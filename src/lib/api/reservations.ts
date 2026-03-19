// 예약내역 API
import type { BadgeStatus } from '@/types/card';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID;

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

function getApiUrl(path: string) {
  if (!BASE_URL) throw new Error('NEXT_PUBLIC_API_BASE_URL이 설정되지 않았습니다.');
  if (!TEAM_ID) throw new Error('NEXT_PUBLIC_TEAM_ID가 설정되지 않았습니다.');

  const base = BASE_URL.replace(/\/+$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `${base}/${TEAM_ID}${normalizedPath}`;
}

export async function getMyReservations(
  token: string,
  params?: { status?: BadgeStatus; cursorId?: number; size?: number },
): Promise<GetMyReservationsResponse> {
  if (!token) throw new Error('토큰이 없습니다.');

  const query = new URLSearchParams();

  if (params?.status) query.set('status', params.status);
  if (params?.cursorId !== undefined) query.set('cursorId', String(params.cursorId));

  query.set('size', String(params?.size ?? 10));

  const response = await fetch(getApiUrl(`/my-reservations?${query.toString()}`), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('예약내역 조회 실패:', response.status, errorText);
    throw new Error(`예약내역 조회 실패: ${response.status}`);
  }

  return (await response.json()) as GetMyReservationsResponse;
}
