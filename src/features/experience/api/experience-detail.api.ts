import {
  CreateReservationRequest,
  CreateReservationResponse,
  ExperienceDetailResponse,
  ReservationAvailableDaysResponse,
  ReviewResponse,
} from "../types/experience-detail.type";
import { getApiUrl, buildAuthHeaders, parseError } from "@/lib/api-client";

export async function getExperienceDetail(
  activityId: number
): Promise<ExperienceDetailResponse> {
  const response = await fetch(getApiUrl(`/activities/${activityId}`), {
    method: "GET",
    headers: buildAuthHeaders(),
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("존재하지 않는 체험입니다.");
    }
    await parseError(response);
  }

  return response.json();
}

export async function getReservationAvailableDays({
  activityId,
  year,
  month,
}: {
  activityId: number;
  year: string;
  month: string;
}): Promise<ReservationAvailableDaysResponse> {
  const params = new URLSearchParams({ year, month });
  const url = `${getApiUrl(`/activities/${activityId}/available-schedule`)}?${params.toString()}`;

  const response = await fetch(url, {
    method: "GET",
    headers: buildAuthHeaders(),
  });

  if (!response.ok) {
    if (response.status === 400) {
      throw new Error("year는 YYYY 형식으로 입력해주세요.");
    }
    if (response.status === 404) {
      throw new Error("존재하지 않는 체험입니다.");
    }
    await parseError(response);
  }

  return response.json();
}

export async function getReviews({
  activityId,
  page,
  size,
}: {
  activityId: number;
  page: number;
  size: number;
}): Promise<ReviewResponse> {
  const params = new URLSearchParams({
    page: String(page),
    size: String(size),
  });
  const url = `${getApiUrl(`/activities/${activityId}/reviews`)}?${params.toString()}`;

  const response = await fetch(url, {
    method: "GET",
    headers: buildAuthHeaders(),
  });

  if (!response.ok) {
    if (response.status === 400) {
      throw new Error("page는 숫자로 입력해주세요.");
    }
    if (response.status === 404) {
      throw new Error("존재하지 않는 체험입니다.");
    }
    await parseError(response);
  }

  return response.json();
}

export async function createReservation(
  activityId: number,
  body: CreateReservationRequest
): Promise<CreateReservationResponse> {
  const response = await fetch(
    getApiUrl(`/activities/${activityId}/reservations`),
    {
      method: "POST",
      headers: buildAuthHeaders(),
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    if (response.status === 400) {
      throw new Error("입력 형식이 잘못되었습니다. (scheduleId 확인)");
    }
    if (response.status === 401) {
      try {
        const err: { message?: string } = await response.clone().json();
        if (err?.message) {
          console.warn("[예약] 401 서버 응답:", err.message);
        }
      } catch {
        /* 응답 본문 없음 */
      }
      throw new Error("토큰이 만료되었습니다. 다시 로그인해 주세요.");
    }
    if (response.status === 404) {
      throw new Error("존재하지 않는 체험입니다.");
    }
    if (response.status === 409) {
      throw new Error(
        "해당 시간대는 이미 확정된 예약이 있어 예약할 수 없습니다."
      );
    }
    await parseError(response);
  }

  return response.json();
}
