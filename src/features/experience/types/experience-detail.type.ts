export interface ExperienceDetail {
    id: number;
    userId: number;
    title: string;
    description: string;
    category: string;
    price: number;
    address: string;
    bannerImageUrl: string;
    subImages: {id: number; imageUrl: string}[];
    schedules: {id: number; date: string; startTime: string; endTime: string}[];
    reviewCount: number;
    rating: number;
    createdAt:string;
    updatedAt: string;
}

export interface ReservationAvailableTime {
    id: number;
    startTime: string;
    endTime: string;
}

export interface ReservationAvailableDay {
    date: string;
    times: ReservationAvailableTime[];
}

export interface ReviewDetail {
    id: number;
    user: {
        profileImageUrl: string;
        nickname: string;
        id: number;
    };
    activityId: number;
    rating: number;
    content: string;
    createdAt: string;
    updatedAt: string;
}

export interface Reviews {
    averageRating: number;
    totalCount: number;
    reviews: ReviewDetail[];
}

export interface CreateReservationRequest {
    scheduleId: number;
    headCount: number;
  }
  
  export interface CreateReservationResponse {
    id: number;
    teamId: string;
    userId: number;
    activityId: number;
    scheduleId: number;
    status: "pending" | "confirmed" | "declined" | "canceled";
    reviewSubmitted: boolean;
    totalPrice: number;
    headCount: number;
    date: string;
    startTime: string;
    endTime: string;
    createdAt: string;
    updatedAt: string;
  }


export type ExperienceDetailResponse = ExperienceDetail;
export type ReservationAvailableDaysResponse = ReservationAvailableDay[];
export type ReviewResponse = Reviews;