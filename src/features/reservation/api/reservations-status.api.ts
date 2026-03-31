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
import { getApiUrl, buildAuthHeaders, parseError } from "@/lib/api-client";
  
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
      await parseError(response);
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
      await parseError(response);
    }
    return response.json();
  }
  

  export async function getReservationDailySchedule({
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
      await parseError(response);
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
      await parseError(response);
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
      await parseError(response);
    }
    return response.json();
  }