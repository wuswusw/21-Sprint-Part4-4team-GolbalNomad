// 예약내역 API
import type { BadgeStatus } from '@/types/card';
import type { GetMyReservationsResponse } from '@/types/reservations';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID;

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

  query.set('size', String(params?.size ?? 3));

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

export async function cancelReservation(token: string, reservationId: number | string) {
  if (!token) throw new Error('토큰이 없습니다.');

  const response = await fetch(getApiUrl(`/my-reservations/${reservationId}`), {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status: 'canceled' }),
    cache: 'no-store',
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('예약 취소 실패:', response.status, errorText);
    throw new Error(`예약 취소 실패: ${response.status}`);
  }
}

export async function postReview(
  token: string,
  reservationId: string | number,
  data: { rating: number; content: string },
): Promise<void> {
  if (!token) throw new Error('토큰이 없습니다.');

  const response = await fetch(getApiUrl(`/my-reservations/${reservationId}/reviews`), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    cache: 'no-store',
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('후기 작성 실패:', response.status, errorText);
    throw new Error(`후기 작성 실패: ${response.status}`);
  }
}
