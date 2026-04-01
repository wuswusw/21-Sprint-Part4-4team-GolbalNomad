"use client"

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import AlertModal from "@/components/common/modal/alert-modal";
import { SIDE_MENU_ITEMS } from "@/constants/side-menu";
import { useMyProfile } from "@/features/profile/hooks/use-my-profile";
import { useUpdateProfileImage } from "@/features/profile/hooks/use-update-profile-image";

const DEFAULT_PROFILE_IMG = "/assets/images/default profile.png";


interface SidemenuProps {
    profileImg?: string;
    onImageChange?: (file: File) => void;
}

function Sidemenu({ profileImg: externalImg, onImageChange }: SidemenuProps) {
    const imgInputRef = useRef<HTMLInputElement>(null);
    const pathname = usePathname();
    const { data: profile } = useMyProfile();
    const { mutateAsync: uploadProfileImage, isPending } = useUpdateProfileImage();

    const profileImageUrl =
        profile?.profileImageUrl && profile.profileImageUrl.length > 0
            ? profile.profileImageUrl
            : null;
    const resolvedServerUrl =
        externalImg || profileImageUrl || DEFAULT_PROFILE_IMG;

    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    const closeSuccessModal = () => setIsSuccessModalOpen(false);

    const handleEditProfileIconClick = () => {
        if (isPending) return;
        imgInputRef.current?.click();
    };
    const handleProfileImgChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const imgFile = e.target.files?.[0];
        const input = e.target;
        if (!imgFile) return;

        try {
            await uploadProfileImage(imgFile);
            onImageChange?.(imgFile);
            setIsSuccessModalOpen(true);
        } catch (err) {
            const message =
                err instanceof Error ? err.message : "프로필 이미지를 변경할 수 없습니다.";
            alert(message);
        } finally {
            input.value = "";
        }
    };
    const linkClassName = (href: string) => `group flex items-center gap-2 desktop:py-[15px] py-[14px] pl-5 rounded-xl ${pathname === href ? "bg-primary-100 text-gray-950" : "hover:ring hover:ring-primary-100 hover:ring-2 hover:text-gray-950"}`
    const defaultIconClass = (href: string) => pathname === href ? "hidden" : "block group-hover:hidden";
    const blueIconClass = (href: string) => pathname === href ? "block" : "hidden group-hover:block";

    
    return (
        <div>
            <div className="flex flex-col items-center justify-center desktop:w-[291px] w-[178px] desktop:h-[450px] h-[342px] px-[14px] desktop:py-6 py-4 rounded-xl hidden tablet:flex shadow-[0px_4px_24px_0px_#9CB4CA33]">
                <div className="desktop:mb-6 mb-3 relative">
                    <Image
                        key={resolvedServerUrl}
                        src={resolvedServerUrl}
                        alt="BasicProfile"
                        width={70}
                        height={70}
                        unoptimized
                        className="rounded-full w-[70px] h-[70px] desktop:w-[120px] desktop:h-[120px]"
                    />
                    <Image src="/assets/icons/editButton.svg" alt="editProfileIcon" width={24} height={24} onClick={handleEditProfileIconClick} className={`absolute bottom-1 right-0 w-6 h-6 desktop:w-[30px] desktop:h-[30px] ${isPending ? "cursor-wait opacity-60 pointer-events-none" : "cursor-pointer"}`} />
                    <input type="file" ref={imgInputRef} onChange={handleProfileImgChange} accept="image/*" className="hidden" />
                </div>
                <ul className="w-full flex flex-col desktop:gap-[14px] gap-2 justify-center text-16 text-gray-600">
                    {SIDE_MENU_ITEMS.map((list) => {
                        return (
                            <li key={list.href}>
                                <Link href={list.href} className={linkClassName(list.href)}>
                                    <Image src={list.icon} alt={list.label} width={24} height={24} className={defaultIconClass(list.href)} />
                                    <Image src={list.blueIcon} alt={list.label} width={24} height={24} className={blueIconClass(list.href)} />
                                    {list.label}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
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
        </div>
    )
}

export default Sidemenu;
