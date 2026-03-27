export type ReservationStatus = "pending" | "confirmed" | "declined" | "completed";

export interface MyActivity {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface MyActivitiesListResponse {
  cursorId: number | null;
  totalCount: number;
  activities: MyActivity[];
}

export interface ReservationMonthlyScheduleResponse {
  date: string;
  reservations: {
    completed: number;
    confirmed: number;
    pending: number;
  };
}

export interface ReservedDailyScheduleResponse{
  scheduleId: number;
  startTime: string;
  endTime: string;
  count: {
    declined: number;
    confirmed: number;
    pending: number;
  };
}

export interface ActivityReservationDetail {
  id: number;
  nickname: string;
  userId: number;
  teamId: string;
  activityId: number;
  scheduleId: number;
  status: ReservationStatus;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface ActivityReservationsResponse {
  cursorId: number | null;
  totalCount: number;
  reservations: ActivityReservationDetail[];
}

export interface GetMyActivitiesParams {
  cursorId?: number | null;
  size?: number;
}

export interface GetReservationMonthlyScheduleParams {
  activityId: number;
  year: string;
  month: string;
}


export interface GetReservedDailyScheduleParams {
  activityId: number;
  date: string;
}

export interface GetActivityReservationsParams {
  activityId: number;
  scheduleId: number;
  status: ReservationStatus;
  cursorId?: number | null;
  size?: number;
}

export interface UpdateReservationStatusParams {
  activityId: number;
  reservationId: number;
  status: "confirmed" | "declined";
}