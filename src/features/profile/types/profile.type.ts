export interface MyProfile {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateMyProfileRequest {
  nickname?: string;
  profileImageUrl?: string;
  newPassword?: string;
}