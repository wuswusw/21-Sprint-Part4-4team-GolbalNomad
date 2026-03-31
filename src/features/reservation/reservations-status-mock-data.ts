import { 
    MyActivity, 
    ReservationMonthlyScheduleResponse, 
    ReservedDailyScheduleResponse, 
    ActivityReservationDetail 
  } from "../reservation/types/reservations-status.type";
  
  // 1. 내 체험 리스트 (드롭다운용)
  export const MOCK_MY_ACTIVITIES: MyActivity[] = [
    {
      id: 1,
      userId: 123,
      title: "남해 서핑 클래스",
      description: "초보자도 환영!",
      category: "수상 레저",
      price: 50000,
      address: "경남 남해군",
      bannerImageUrl: "https://example.com/surf.jpg",
      rating: 4.5,
      reviewCount: 10,
      createdAt: "2026-03-01T00:00:00Z",
      updatedAt: "2026-03-01T00:00:00Z",
    },
    {
      id: 2,
      userId: 123,
      title: "제주도 귤 따기 체험",
      description: "직접 따서 먹는 귤!",
      category: "문화/예술",
      price: 20000,
      address: "제주 서귀포시",
      bannerImageUrl: "https://example.com/tangerine.jpg",
      rating: 4.8,
      reviewCount: 25,
      createdAt: "2026-03-05T00:00:00Z",
      updatedAt: "2026-03-05T00:00:00Z",
    }
  ];
  
  // 2. 월별 예약 현황 (캘린더 점/배지용)
  export const MOCK_MONTHLY_SCHEDULES: Record<string, ReservationMonthlyScheduleResponse[]> = {
    "1-2026-03": [
      { date: "2026-03-24", reservations: { completed: 2, confirmed: 1, pending: 1 } },
      { date: "2026-03-28", reservations: { completed: 0, confirmed: 3, pending: 0 } },
    ],
    "2-2026-03": [
      { date: "2026-03-15", reservations: { completed: 5, confirmed: 0, pending: 2 } },
    ]
  };
  
  // 3. 날짜별 스케줄 (디테일 탭/시간대용)
  export const MOCK_DAILY_SCHEDULES: Record<string, ReservedDailyScheduleResponse[]> = {
    "1-2026-03-24": [
      { scheduleId: 101, startTime: "10:00", endTime: "12:00", count: { declined: 0, confirmed: 1, pending: 1 } },
      { scheduleId: 102, startTime: "14:00", endTime: "16:00", count: { declined: 1, confirmed: 0, pending: 0 } },
    ]
  };
  
  // 4. 시간대별 예약 내역
  export const MOCK_RESERVATIONS: Record<number, ActivityReservationDetail[]> = {
    101: [
      {
        id: 501, nickname: "신형만", userId: 1, teamId: "team-1", activityId: 1, scheduleId: 101,
        status: "pending", reviewSubmitted: false, totalPrice: 100000, headCount: 2,
        date: "2026-03-24", startTime: "10:00", endTime: "12:00", createdAt: "...", updatedAt: "..."
      },
      {
        id: 502, nickname: "봉미선", userId: 2, teamId: "team-1", activityId: 1, scheduleId: 101,
        status: "confirmed", reviewSubmitted: false, totalPrice: 50000, headCount: 1,
        date: "2026-03-24", startTime: "10:00", endTime: "12:00", createdAt: "...", updatedAt: "..."
      }
    ]
  };