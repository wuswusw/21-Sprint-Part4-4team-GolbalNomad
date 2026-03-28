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
      { date: "2026-03-30", reservations: { completed: 0, confirmed: 2, pending: 1 } },
      { date: "2026-03-31", reservations: { completed: 1, confirmed: 1, pending: 2 } },
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
    ],
    "1-2026-03-28": [
      { scheduleId: 201, startTime: "09:00", endTime: "11:00", count: { declined: 0, confirmed: 3, pending: 0 } },
    ],
    "1-2026-03-30": [
      { scheduleId: 301, startTime: "15:00", endTime: "17:00", count: { declined: 0, confirmed: 2, pending: 1 } },
    ],
    "1-2026-03-31": [
      { scheduleId: 302, startTime: "11:00", endTime: "13:00", count: { declined: 0, confirmed: 1, pending: 2 } },
      { scheduleId: 303, startTime: "16:00", endTime: "18:00", count: { declined: 1, confirmed: 0, pending: 0 } },
    ],
    "2-2026-03-15": [
      { scheduleId: 304, startTime: "11:00", endTime: "13:00", count: { declined: 0, confirmed: 5, pending: 2 } },
      { scheduleId: 305, startTime: "16:00", endTime: "18:00", count: { declined: 1, confirmed: 0, pending: 0 } },
    ],
  };
  
  // 4. 시간대별 예약 내역
  export const MOCK_RESERVATIONS: Record<number, ActivityReservationDetail[]> = {
    101: [
      {
        id: 501, nickname: "신형만", userId: 1, teamId: "team-1", activityId: 1, scheduleId: 101,
        status: "declined", reviewSubmitted: false, totalPrice: 100000, headCount: 2,
        date: "2026-03-24", startTime: "10:00", endTime: "12:00", createdAt: "...", updatedAt: "..."
      },
      {
        id: 502, nickname: "봉미선", userId: 2, teamId: "team-1", activityId: 1, scheduleId: 101,
        status: "confirmed", reviewSubmitted: false, totalPrice: 50000, headCount: 1,
        date: "2026-03-24", startTime: "10:00", endTime: "12:00", createdAt: "...", updatedAt: "..."
      }
    ],
    201: [
      {
        id: 601, nickname: "짱구", userId: 3, teamId: "team-1", activityId: 1, scheduleId: 201,
        status: "confirmed", reviewSubmitted: false, totalPrice: 80000, headCount: 2,
        date: "2026-03-28", startTime: "09:00", endTime: "11:00", createdAt: "2026-03-20T10:00:00Z", updatedAt: "2026-03-20T10:00:00Z"
      },
      {
        id: 602, nickname: "철수", userId: 4, teamId: "team-1", activityId: 1, scheduleId: 201,
        status: "confirmed", reviewSubmitted: false, totalPrice: 40000, headCount: 1,
        date: "2026-03-28", startTime: "09:00", endTime: "11:00", createdAt: "2026-03-21T10:00:00Z", updatedAt: "2026-03-21T10:00:00Z"
      },
      {
        id: 603, nickname: "유리", userId: 5, teamId: "team-1", activityId: 1, scheduleId: 201,
        status: "confirmed", reviewSubmitted: false, totalPrice: 120000, headCount: 3,
        date: "2026-03-28", startTime: "09:00", endTime: "11:00", createdAt: "2026-03-22T10:00:00Z", updatedAt: "2026-03-22T10:00:00Z"
      },
    ],
    301: [
      {
        id: 701, nickname: "맹구", userId: 6, teamId: "team-1", activityId: 1, scheduleId: 301,
        status: "pending", reviewSubmitted: false, totalPrice: 60000, headCount: 1,
        date: "2026-03-30", startTime: "15:00", endTime: "17:00", createdAt: "2026-03-25T09:00:00Z", updatedAt: "2026-03-25T09:00:00Z"
      },
      {
        id: 702, nickname: "훈이", userId: 7, teamId: "team-1", activityId: 1, scheduleId: 301,
        status: "confirmed", reviewSubmitted: false, totalPrice: 100000, headCount: 2,
        date: "2026-03-30", startTime: "15:00", endTime: "17:00", createdAt: "2026-03-25T11:00:00Z", updatedAt: "2026-03-25T11:00:00Z"
      },
      {
        id: 703, nickname: "수지", userId: 8, teamId: "team-1", activityId: 1, scheduleId: 301,
        status: "confirmed", reviewSubmitted: false, totalPrice: 50000, headCount: 1,
        date: "2026-03-30", startTime: "15:00", endTime: "17:00", createdAt: "2026-03-26T14:00:00Z", updatedAt: "2026-03-26T14:00:00Z"
      },
    ],
    302: [
      {
        id: 801, nickname: "비실이", userId: 9, teamId: "team-1", activityId: 1, scheduleId: 302,
        status: "completed", reviewSubmitted: true, totalPrice: 50000, headCount: 1,
        date: "2026-03-31", startTime: "11:00", endTime: "13:00", createdAt: "2026-03-10T10:00:00Z", updatedAt: "2026-03-10T10:00:00Z"
      },
      {
        id: 802, nickname: "퉁퉁이", userId: 10, teamId: "team-1", activityId: 1, scheduleId: 302,
        status: "confirmed", reviewSubmitted: false, totalPrice: 150000, headCount: 3,
        date: "2026-03-31", startTime: "11:00", endTime: "13:00", createdAt: "2026-03-27T09:00:00Z", updatedAt: "2026-03-27T09:00:00Z"
      },
      {
        id: 803, nickname: "이슬이", userId: 11, teamId: "team-1", activityId: 1, scheduleId: 302,
        status: "pending", reviewSubmitted: false, totalPrice: 50000, headCount: 1,
        date: "2026-03-31", startTime: "11:00", endTime: "13:00", createdAt: "2026-03-28T16:00:00Z", updatedAt: "2026-03-28T16:00:00Z"
      },
      {
        id: 804, nickname: "노진구", userId: 12, teamId: "team-1", activityId: 1, scheduleId: 302,
        status: "pending", reviewSubmitted: false, totalPrice: 50000, headCount: 1,
        date: "2026-03-31", startTime: "11:00", endTime: "13:00", createdAt: "2026-03-29T10:00:00Z", updatedAt: "2026-03-29T10:00:00Z"
      },
    ],
    303: [
      {
        id: 901, nickname: "도라에몽", userId: 13, teamId: "team-1", activityId: 1, scheduleId: 303,
        status: "declined", reviewSubmitted: false, totalPrice: 70000, headCount: 1,
        date: "2026-03-31", startTime: "16:00", endTime: "18:00", createdAt: "2026-03-20T12:00:00Z", updatedAt: "2026-03-20T12:00:00Z"
      },
    ],
    304: [
      {
        id: 920, nickname: "귤수확A", userId: 20, teamId: "team-1", activityId: 2, scheduleId: 304,
        status: "completed", reviewSubmitted: true, totalPrice: 40000, headCount: 2,
        date: "2026-03-15", startTime: "11:00", endTime: "13:00", createdAt: "2026-03-01T10:00:00Z", updatedAt: "2026-03-01T10:00:00Z"
      },
      {
        id: 921, nickname: "귤수확B", userId: 21, teamId: "team-1", activityId: 2, scheduleId: 304,
        status: "completed", reviewSubmitted: true, totalPrice: 20000, headCount: 1,
        date: "2026-03-15", startTime: "11:00", endTime: "13:00", createdAt: "2026-03-02T10:00:00Z", updatedAt: "2026-03-02T10:00:00Z"
      },
      {
        id: 922, nickname: "귤수확C", userId: 22, teamId: "team-1", activityId: 2, scheduleId: 304,
        status: "completed", reviewSubmitted: true, totalPrice: 60000, headCount: 3,
        date: "2026-03-15", startTime: "11:00", endTime: "13:00", createdAt: "2026-03-03T10:00:00Z", updatedAt: "2026-03-03T10:00:00Z"
      },
      {
        id: 923, nickname: "귤수확D", userId: 23, teamId: "team-1", activityId: 2, scheduleId: 304,
        status: "completed", reviewSubmitted: true, totalPrice: 20000, headCount: 1,
        date: "2026-03-15", startTime: "11:00", endTime: "13:00", createdAt: "2026-03-04T10:00:00Z", updatedAt: "2026-03-04T10:00:00Z"
      },
      {
        id: 924, nickname: "귤수확E", userId: 24, teamId: "team-1", activityId: 2, scheduleId: 304,
        status: "completed", reviewSubmitted: true, totalPrice: 20000, headCount: 1,
        date: "2026-03-15", startTime: "11:00", endTime: "13:00", createdAt: "2026-03-05T10:00:00Z", updatedAt: "2026-03-05T10:00:00Z"
      },
      {
        id: 925, nickname: "신청자F", userId: 25, teamId: "team-1", activityId: 2, scheduleId: 304,
        status: "pending", reviewSubmitted: false, totalPrice: 40000, headCount: 2,
        date: "2026-03-15", startTime: "11:00", endTime: "13:00", createdAt: "2026-03-12T10:00:00Z", updatedAt: "2026-03-12T10:00:00Z"
      },
      {
        id: 926, nickname: "신청자G", userId: 26, teamId: "team-1", activityId: 2, scheduleId: 304,
        status: "pending", reviewSubmitted: false, totalPrice: 20000, headCount: 1,
        date: "2026-03-15", startTime: "11:00", endTime: "13:00", createdAt: "2026-03-13T10:00:00Z", updatedAt: "2026-03-13T10:00:00Z"
      },
    ],
    305: [
      {
        id: 927, nickname: "거절된예약", userId: 27, teamId: "team-1", activityId: 2, scheduleId: 305,
        status: "declined", reviewSubmitted: false, totalPrice: 20000, headCount: 1,
        date: "2026-03-15", startTime: "16:00", endTime: "18:00", createdAt: "2026-03-08T10:00:00Z", updatedAt: "2026-03-08T10:00:00Z"
      },
    ],
  };