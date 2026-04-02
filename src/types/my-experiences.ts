// 내 체험 관리
export type MyActivityItem = {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
};

export type GetMyExperiencesResponse = {
  cursorId: number | null;
  totalCount: number;
  activities: MyActivityItem[];
};
