import {
    MyActivitiesListResponse,
    ReservationMonthlyScheduleResponse,
    ReservedDailyScheduleResponse,
    ActivityReservationsResponse,
    ActivityReservationDetail,
    GetMyActivitiesParams,
    GetReservationMonthlyScheduleParams,
    GetReservedDailyScheduleParams,
    GetActivityReservationsParams,
    UpdateReservationStatusParams,
  } from "../types/reservations-status.type";
  
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID;
  
  function getApiUrl(path: string) {
    if (!BASE_URL) throw new Error("NEXT_PUBLIC_API_BASE_URL이 설정되지 않았습니다.");
    if (!TEAM_ID) throw new Error("NEXT_PUBLIC_TEAM_ID가 설정되지 않았습니다.");
  
    const normalizedBaseUrl = BASE_URL.replace(/\/+$/, "");
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  
    return `${normalizedBaseUrl}/${TEAM_ID}${normalizedPath}`;
  }
  
  function buildAuthHeaders(): HeadersInit {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
  
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }
  
    return headers;
  }

  async function handleResponseError(response: Response, defaultMessage: string) {
    const errorData = await response.json().catch(() => ({}));
    const serverMessage = errorData.message;
  
    switch (response.status) {
      case 400:
        throw new Error(serverMessage || "입력 형식이 올바르지 않습니다.");
      case 401:
        throw new Error("인증되지 않은 사용자입니다. 다시 로그인해주세요.");
      case 403:
        throw new Error(serverMessage || "해당 권한이 없습니다.");
      case 404:
        throw new Error("요청하신 정보를 찾을 수 없습니다.");
      default:
        throw new Error(serverMessage || defaultMessage);
    }
  }
  
  export async function getMyActivities({
    cursorId,
    size = 20,
  }: GetMyActivitiesParams): Promise<MyActivitiesListResponse> {
    const params = new URLSearchParams();
    if (cursorId) params.append("cursorId", cursorId.toString());
    params.append("size", size.toString());
  
    const response = await fetch(getApiUrl(`/my-activities?${params.toString()}`), {
      method: "GET",
      headers: buildAuthHeaders(),
    });
  
    if (!response.ok) {
      await handleResponseError(response, "내 체험 리스트를 불러오는데 실패했습니다.");
    }
    return response.json();
  }
  
  export async function getReservationMonthlySchedule({
    activityId,
    year,
    month,
  }: GetReservationMonthlyScheduleParams): Promise<ReservationMonthlyScheduleResponse[]> {
    const params = new URLSearchParams({ year, month });
  
    const response = await fetch(
      getApiUrl(`/my-activities/${activityId}/reservation-dashboard?${params.toString()}`),
      {
        method: "GET",
        headers: buildAuthHeaders(),
      }
    );
  
    if (!response.ok) {
      await handleResponseError(response, "월별 예약 현황을 불러오는데 실패했습니다.");
    }
    return response.json();
  }
  

  export async function getReservedSchedule({
    activityId,
    date,
  }: GetReservedDailyScheduleParams): Promise<ReservedDailyScheduleResponse[]> {
    const params = new URLSearchParams({ date });
  
    const response = await fetch(
      getApiUrl(`/my-activities/${activityId}/reserved-schedule?${params.toString()}`),
      {
        method: "GET",
        headers: buildAuthHeaders(),
      }
    );
  
    if (!response.ok) {
      await handleResponseError(response, "날짜별 스케줄을 불러오는데 실패했습니다.");
    }
    return response.json();
  }
  

  export async function getActivityReservations({
    activityId,
    scheduleId,
    status,
    cursorId,
    size = 10,
  }: GetActivityReservationsParams): Promise<ActivityReservationsResponse> {
    const params = new URLSearchParams({
      scheduleId: scheduleId.toString(),
      status,
      size: size.toString(),
    });
    if (cursorId) params.append("cursorId", cursorId.toString());
  
    const response = await fetch(
      getApiUrl(`/my-activities/${activityId}/reservations?${params.toString()}`),
      {
        method: "GET",
        headers: buildAuthHeaders(),
      }
    );
  
    if (!response.ok) {
      await handleResponseError(response, "예약 내역을 불러오는데 실패했습니다.");
    }
    return response.json();
  }
  
  export async function updateReservationStatus({
    activityId,
    reservationId,
    status,
  }: UpdateReservationStatusParams): Promise<ActivityReservationDetail> {
    const response = await fetch(
      getApiUrl(`/my-activities/${activityId}/reservations/${reservationId}`),
      {
        method: "PATCH",
        headers: buildAuthHeaders(),
        body: JSON.stringify({ status }),
      }
    );
  
    if (!response.ok) {
      await handleResponseError(response, "예약 상태 업데이트에 실패했습니다.");
    }
    return response.json();
  }