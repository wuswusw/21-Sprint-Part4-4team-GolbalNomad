"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";

/**
 * @example
 * // 기본 사용 (미리보기만)
 * <Sidemenu />
 * 
 * // API 연결 시
 * <Sidemenu 
 *   profileImg={userData.profileImage} 
 *   onImageChange={(file) => uploadProfileImage(file)} 
 * />
 */

interface SidemenuProps {
    profileImg?: string;
    onImageChange?: (file: File) => void;
}

const menuLists = [
    {
        href: "/main/profile",
        icon: "/assets/icons/user.svg",
        blueIcon: "/assets/icons/userBlue.svg",
        label: "내 정보",
    },
    {
        href: "/main/reservations",
        icon: "/assets/icons/list.svg",
        blueIcon: "/assets/icons/listBlue.svg",
        label: "예약내역",
    },
    {
        href: "/main/my-experiences",
        icon: "/assets/icons/calendar.svg",
        blueIcon: "/assets/icons/calendarBlue.svg",
        label: "내 체험 관리",
    },
    {
        href: "/main/reservations-status",
        icon: "/assets/icons/setting.svg",
        blueIcon: "/assets/icons/settingBlue.svg",
        label: "예약 현황",
    },
]

function Sidemenu({ profileImg: externalImg, onImageChange }: SidemenuProps) {
    const imgInputRef = useRef<HTMLInputElement>(null);
    const [profileImg, setProfileImg] = useState(externalImg ?? "/assets/images/default profile.png");
    const pathname = usePathname();

    const handleEditProfileIconClick = () => {
        imgInputRef.current?.click();
    }
    const handleProfileImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const imgFile = e.target.files?.[0];
        if (imgFile){
            const url = URL.createObjectURL(imgFile);
            setProfileImg((prevUrl) => {
                if (prevUrl.startsWith("blob:")) URL.revokeObjectURL(prevUrl);
                return url;
            });
            onImageChange?.(imgFile); // API 연결 시 부모에서 업로드 처리
        }
    }
    const linkClassName = (href: string) => `group flex items-center gap-2 py-[15px] pl-5 rounded-xl ${pathname === href ? "bg-primary-100 text-gray-950" : "hover:ring hover:ring-primary-100 hover:ring-2 hover:text-gray-950"}`
    const defaultIconClass = (href: string) => pathname === href ? "hidden" : "block group-hover:hidden";
    const blueIconClass = (href: string) => pathname === href ? "block" : "hidden group-hover:block";

    
    return (
        <div className="flex flex-col items-center justify-center desktop:w-[291px] w-[178px] px-[14px] desktop:py-6 py-4 rounded-xl hidden tablet:flex shadow-[0px_4px_24px_0px_#9CB4CA33]">
            <div className="mb-6 relative">
                <img src={profileImg} alt="BasicPofile" className="rounded-full w-[70px] h-[70px] desktop:w-[120px] desktop:h-[120px]"/>
                <img src="/assets/icons/editButton.svg" alt="editProfileIcon" onClick={handleEditProfileIconClick} className="absolute bottom-1 right-0 w-6 h-6 desktop:w-[30px] desktop:h-[30px] cursor-pointer" />
                <input type="file" ref={imgInputRef} onChange={handleProfileImgChange} accept="image/*" className="hidden" />
            </div>
            <ul className="w-full flex flex-col gap-[14px] justify-center text-16 text-gray-600">
                {menuLists.map((list) => {
                    return (
                        <li key={list.href}>
                            <Link href={list.href} className={linkClassName(list.href)}>
                                <img src={list.icon} alt={list.label} className={defaultIconClass(list.href)} />
                                <img src={list.blueIcon} alt={list.label} className={blueIconClass(list.href)} />
                                {list.label}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Sidemenu;
