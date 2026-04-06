'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import ProfileForm from '@/features/profile/components/profile-form';
import ProfileFormSkeleton from '@/features/profile/components/profile-form-skeleton';
import AlertModal from '@/components/common/modal/alert-modal';
import { SIDE_MENU_ITEMS } from '@/constants/side-menu';
import { useMyProfile } from '@/features/profile/hooks/use-my-profile';
import { useUpdateProfileImage } from '@/features/profile/hooks/use-update-profile-image';
import { validateProfileImageFile } from '@/features/profile/utils/validate-profile-image-file';

const DEFAULT_PROFILE_IMG = '/assets/images/default profile.png';

interface MobileProfileMenuProps {
  onOpenProfileForm: () => void;
}

function MobileProfileMenu({ onOpenProfileForm }: MobileProfileMenuProps) {
  const imgInputRef = useRef<HTMLInputElement>(null);
  const { data: profile } = useMyProfile();
  const { mutateAsync: uploadProfileImage, isPending } = useUpdateProfileImage();

  const profileImageUrl =
    profile?.profileImageUrl && profile.profileImageUrl.length > 0
      ? profile.profileImageUrl
      : DEFAULT_PROFILE_IMG;

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [errorModalMessage, setErrorModalMessage] = useState<string | null>(null);

  const closeSuccessModal = () => setIsSuccessModalOpen(false);
  const closeErrorModal = () => setErrorModalMessage(null);

  const handleEditProfileIconClick = () => {
    if (isPending) return;
    imgInputRef.current?.click();
  };

  const handleProfileImgChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const imgFile = e.target.files?.[0];
    const input = e.target;

    if (!imgFile) return;

    const validationError = validateProfileImageFile(imgFile);
    if (validationError) {
      setErrorModalMessage(validationError);
      input.value = '';
      return;
    }

    try {
      await uploadProfileImage(imgFile);
      setIsSuccessModalOpen(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : '프로필 이미지를 변경할 수 없습니다.';
      setErrorModalMessage(message);
    } finally {
      input.value = '';
    }
  };

  return (
    <>
      <div className="pt-[30px]">
        <div className="h-[450px] w-[327px] rounded-[16px] px-[14px] py-6 shadow-[0px_4px_24px_0px_#9CB4CA33]">
          <div className="flex flex-col items-center">
            <div className="relative mt-0">
              <Image
                src={profileImageUrl}
                alt="profile"
                width={120}
                height={120}
                unoptimized
                className="h-[120px] w-[120px] rounded-full"
              />
              <Image
                src="/assets/icons/editButton.svg"
                alt="editProfileIcon"
                width={30}
                height={30}
                onClick={handleEditProfileIconClick}
                className={`absolute right-[4px] bottom-[4px] h-[30px] w-[30px] ${
                  isPending ? 'pointer-events-none cursor-wait opacity-60' : 'cursor-pointer'
                }`}
              />
              <input
                type="file"
                ref={imgInputRef}
                onChange={handleProfileImgChange}
                accept="image/jpeg,image/png,image/webp,image/gif,.jpg,.jpeg,.png,.webp,.gif"
                className="hidden"
              />
            </div>

            <ul className="mt-6 flex w-full flex-col gap-2">
              {SIDE_MENU_ITEMS.map((item) => {
                const isProfileItem = item.href === '/main/profile';

                if (isProfileItem) {
                  return (
                    <li key={item.href}>
                      <button
                        type="button"
                        onClick={onOpenProfileForm}
                        className="hover:ring-primary-100 flex h-[54px] w-[299px] items-center gap-2 rounded-xl pl-5 text-left text-[16px] font-medium text-gray-600 hover:text-gray-950 hover:ring-2"
                      >
                        <Image
                          src={item.icon}
                          alt={item.label}
                          width={24}
                          height={24}
                          className="h-6 w-6"
                        />
                        {item.label}
                      </button>
                    </li>
                  );
                }

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="hover:ring-primary-100 flex h-[54px] w-[299px] items-center gap-2 rounded-xl pl-5 text-[16px] font-medium text-gray-600 hover:text-gray-950 hover:ring-2"
                    >
                      <Image
                        src={item.icon}
                        alt={item.label}
                        width={24}
                        height={24}
                        className="h-6 w-6"
                      />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {isSuccessModalOpen && (
        <AlertModal
          description="프로필 이미지가 변경되었습니다."
          confirmText="확인"
          onClose={closeSuccessModal}
          onConfirm={closeSuccessModal}
          size="sm"
        />
      )}

      {errorModalMessage && (
        <AlertModal
          description={errorModalMessage}
          confirmText="확인"
          onClose={closeErrorModal}
          onConfirm={closeErrorModal}
          size="sm"
        />
      )}
    </>
  );
}

export default function ProfilePage() {
  const { data, isLoading, isError } = useMyProfile();
  const [showMobileForm, setShowMobileForm] = useState(false);

  if (isLoading) {
    return (
      <>
        <div className="tablet:hidden px-6 pb-[163px]">
          <ProfileFormSkeleton isMobile />
        </div>

        <div className="tablet:block mb-[265px] ml-[20px] hidden">
          <ProfileFormSkeleton />
        </div>
      </>
    );
  }

  if (isError || !data) {
    return <div className="pt-[40px]">내 정보를 불러오지 못했습니다.</div>;
  }

  return (
    <>
      <div className="tablet:hidden px-6 pb-[163px]">
        {showMobileForm ? (
          <ProfileForm
            initialData={data}
            isMobile
            onMobileCancel={() => setShowMobileForm(false)}
          />
        ) : (
          <MobileProfileMenu onOpenProfileForm={() => setShowMobileForm(true)} />
        )}
      </div>

      <div className="tablet:block mb-[265px] hidden">
        <ProfileForm initialData={data} />
      </div>
    </>
  );
}
