export type ActivityCategory =
  | "문화 · 예술"
  | "식음료"
  | "투어"
  | "관광"
  | "웰빙"
  | "스포츠";

export type ActivitySort =
  | "most_reviewed"
  | "price_asc"
  | "price_desc"
  | "latest";

export interface Activity {
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

export interface GetActivitiesResponse {
  cursorId: number | null;
  totalCount: number;
  activities: Activity[];
}

export interface GetActivitiesParams {
  method: "offset" | "cursor";
  cursorId?: number;
  category?: ActivityCategory;
  keyword?: string;
  sort?: ActivitySort;
  page?: number;
  size?: number;
}