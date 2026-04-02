// 내 체험 관리 API
import type { GetMyExperiencesResponse } from '@/types/my-experiences';
import type { Activity } from '@/features/activity/types/activity.type';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID;

function getApiUrl(path: string) {
  if (!BASE_URL) throw new Error('NEXT_PUBLIC_API_BASE_URL이 설정되지 않았습니다.');
  if (!TEAM_ID) throw new Error('NEXT_PUBLIC_TEAM_ID가 설정되지 않았습니다.');

  const base = BASE_URL.replace(/\/+$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `${base}/${TEAM_ID}${normalizedPath}`;
}

export async function getMyExperiences(
  token: string,
  params?: { cursorId?: number; size?: number },
): Promise<GetMyExperiencesResponse> {
  if (!token) throw new Error('토큰이 없습니다.');

  const query = new URLSearchParams();

  if (params?.cursorId !== undefined) {
    query.set('cursorId', String(params.cursorId));
  }

  query.set('size', String(params?.size ?? 3));

  const response = await fetch(getApiUrl(`/my-activities?${query.toString()}`), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('내 체험 관리 조회 실패:', response.status, errorText);
    throw new Error(`내 체험 관리 조회 실패: ${response.status}`);
  }

  return (await response.json()) as GetMyExperiencesResponse;
}

export async function deleteMyExperience(token: string, activityId: number): Promise<void> {
  if (!token) throw new Error('토큰이 없습니다.');

  const response = await fetch(getApiUrl(`/my-activities/${activityId}`), {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.message || '체험 삭제에 실패했습니다.');
  }
}

export type UpdateActivityRequest = {
  title: string;
  category: string;
  description: string;
  address: string;
  price: number;
  schedules: {
    date: string;
    startTime: string;
    endTime: string;
  }[];
  bannerImageUrl: string;
  subImageUrls: string[];
};

export async function updateActivity(
  token: string,
  activityId: number,
  data: UpdateActivityRequest,
): Promise<Activity> {
  if (!token) throw new Error('토큰이 없습니다.');

  const response = await fetch(getApiUrl(`/my-activities/${activityId}`), {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.message || '체험 수정에 실패했습니다.');
  }

  return response.json();
}
