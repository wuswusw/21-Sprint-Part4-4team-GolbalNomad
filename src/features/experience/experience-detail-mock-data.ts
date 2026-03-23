import { ExperienceDetailResponse, ReservationAvailableDaysResponse, ReviewResponse } from "./types/experience-detail.type";

export const MOCK_DETAIL: ExperienceDetailResponse = {
    id: 123,
    userId: 1,
    title: "도쿄 타워 전망대 입장권 & 메인 데크 체험",
    description: " 도쿄의 아름다운 스카이라인을 한눈에 담아보세요. 150m 높이의 메인 데크에서 바라보는 360도 파노라마 뷰는 잊지 못할 추억을 선사합니다. 밤이 되면 화려하게 빛나는 도쿄의 야경을 감상하며 낭만적인 시간을 보내실 수 있습니다. 도쿄 타워 내부의 다양한 굿즈 샵과 카페도 놓치지 마세요!",
    category: "관광 · 랜드마크",
    address: "서울특별시 강남구 테헤란로 123",
    price: 50000,
    rating: 4.8,
    reviewCount: 124,
    bannerImageUrl: "/assets/images/img1.jpg",
    subImages: [
        { id: 1, imageUrl: "/assets/images/img2.jpg" },
        { id: 2, imageUrl: "/assets/images/img3.jpg" }
    ],
    schedules: [
        { id: 101, date: "2026-03-23", startTime: "10:00", endTime: "12:00" },
        { id: 101, date: "2026-03-23", startTime: "12:00", endTime: "14:00" },
    ],
    createdAt: "2026-03-20T00:00:00Z",
    updatedAt: "2026-03-20T00:00:00Z"
};

export const MOCK_AVAILABLE_DAYS: ReservationAvailableDaysResponse = [
    {
        date: "2026-03-30",
        times: [
          { id: 201, startTime: "10:00", endTime: "12:00" },
          { id: 202, startTime: "14:00", endTime: "16:00" },
          { id: 203, startTime: "16:00", endTime: "18:00" },
        ]
      },
      {
        date: "2026-03-26",
        times: [
          { id: 204, startTime: "18:00", endTime: "20:00" },
          { id: 205, startTime: "21:00", endTime: "23:00" },
        ]
      },
      {
        date: "2026-04-02",
        times: [
          { id: 206, startTime: "18:00", endTime: "20:00" },
        ]
      }
    ];

export const MOCK_REVIEWS: ReviewResponse = {
    averageRating: 4.8,
    totalCount: 12,
    reviews: [
        {id: 1,
        user: {
            profileImageUrl: "/assets/images/default profile.png",
            nickname: "글로벌 노마드",
            id: 12,
        },
        activityId: 1,
        rating: 5,
        content: "너무 재밌었습니다!",
        createdAt: "2026-03-20T00:00:00Z",
        updatedAt: "2026-03-20T00:00:00Z"},
        {id: 2,
        user: {
            profileImageUrl: "/assets/images/default profile.png",
            nickname: "오렌지",
            id: 8,
        },
        activityId: 1,
        rating: 2,
        content: "퀄리티에 비해 가격이 너무 비싸요",
        createdAt: "2026-03-21T00:00:00Z",
        updatedAt: "2026-03-21T00:00:00Z"},
        {id: 3,
        user: {
            profileImageUrl: "/assets/images/default profile.png",
            nickname: "test3",
            id: 123,
        },
        activityId: 1,
        rating: 2,
        content: "댓글 테스트 ",
        createdAt: "2026-03-21T00:00:00Z",
        updatedAt: "2026-03-21T00:00:00Z"},
        {id: 4,
        user: {
            profileImageUrl: "/assets/images/default profile.png",
            nickname: "test4",
            id: 134,
        },
        activityId: 1,
        rating: 2,
        content: "댓글 테스트",
        createdAt: "2026-03-21T00:00:00Z",
        updatedAt: "2026-03-21T00:00:00Z"},
        {id: 5,
        user: {
            profileImageUrl: "/assets/images/default profile.png",
            nickname: "test5",
            id: 856,
        },
        activityId: 1,
        rating: 2,
        content: "댓글 테스트",
        createdAt: "2026-03-21T00:00:00Z",
        updatedAt: "2026-03-21T00:00:00Z"},
        {id: 234,
        user: {
            profileImageUrl: "/assets/images/default profile.png",
            nickname: "test6",
            id: 8,
        },
        activityId: 1,
        rating: 2,
        content: "댓글 테스트",
        createdAt: "2026-03-21T00:00:00Z",
        updatedAt: "2026-03-21T00:00:00Z"},
        {id: 7,
        user: {
            profileImageUrl: "/assets/images/default profile.png",
            nickname: "test7",
            id: 833,
        },
        activityId: 1,
        rating: 2,
        content: "댓글 테스트",
        createdAt: "2026-03-21T00:00:00Z",
        updatedAt: "2026-03-21T00:00:00Z"},
        {id: 8,
        user: {
            profileImageUrl: "/assets/images/default profile.png",
            nickname: "test8",
            id: 812,
        },
        activityId: 1,
        rating: 2,
        content: "댓글 테스트",
        createdAt: "2026-03-21T00:00:00Z",
        updatedAt: "2026-03-21T00:00:00Z"},
        {id: 9,
        user: {
            profileImageUrl: "/assets/images/default profile.png",
            nickname: "test9",
            id: 8823,
        },
        activityId: 1,
        rating: 2,
        content: "댓글 테스트",
        createdAt: "2026-03-21T00:00:00Z",
        updatedAt: "2026-03-21T00:00:00Z"},
        {id: 10,
        user: {
            profileImageUrl: "/assets/images/default profile.png",
            nickname: "test10",
            id: 568,
        },
        activityId: 1,
        rating: 2,
        content: "댓글 테스트",
        createdAt: "2026-03-21T00:00:00Z",
        updatedAt: "2026-03-21T00:00:00Z"},
        {id: 11,
        user: {
            profileImageUrl: "/assets/images/default profile.png",
            nickname: "test11",
            id: 18,
        },
        activityId: 1,
        rating: 2,
        content: "댓글 테스트",
        createdAt: "2026-03-21T00:00:00Z",
        updatedAt: "2026-03-21T00:00:00Z"},
        {id: 12,
        user: {
            profileImageUrl: "/assets/images/default profile.png",
            nickname:"test12",
            id: 890,
        },
        activityId: 1,
        rating: 2,
        content: "댓글 테스트",
        createdAt: "2026-03-21T00:00:00Z",
        updatedAt: "2026-03-21T00:00:00Z"},
    ]
}
