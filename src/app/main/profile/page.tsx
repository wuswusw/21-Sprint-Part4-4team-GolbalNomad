"use client";

import ProfileForm from "@/features/profile/components/profile-form";
import { useMyProfile } from "@/features/profile/hooks/use-my-profile";

export default function ProfilePage() {
  const { data, isLoading, isError } = useMyProfile();

  if (isLoading) {
    return <div className="pt-[40px]">불러오는 중...</div>;
  }

  if (isError || !data) {
    return <div className="pt-[40px]">내 정보를 불러오지 못했습니다.</div>;
  }

  return (
    <div className="ml-[20px] mb-[265px]">
      <ProfileForm initialData={data} />
    </div>
  );
}