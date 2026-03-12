"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import BasicPofile from "@/assets/images/default profile.png";
import editProfileIcon from "@/assets/icons/editButton.svg";
import userIcon from "@/assets/icons/user.svg";
import userBlueIcon from "@/assets/icons/userBlue.svg";
import listIcon from "@/assets/icons/list.svg";
import listBlueIcon from "@/assets/icons/listBlue.svg";
import settingIcon from "@/assets/icons/setting.svg";
import settingBlueIcon from "@/assets/icons/settingBlue.svg";
import calendarIcon from "@/assets/icons/calendar.svg";
import calendarBlueIcon from "@/assets/icons/calendarBlue.svg";

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

function Sidemenu({ profileImg: externalImg, onImageChange }: SidemenuProps) {
    const imgInputRef = useRef<HTMLInputElement>(null);
    const [profileImg, setProfileImg] = useState(externalImg ?? BasicPofile.src);
    const pathname = usePathname();

    const handleEditProfileIconClick = () => {
        imgInputRef.current?.click();
    }
    const handleProfileImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const imgFile = e.target.files?.[0];
        if (imgFile){
            const url = URL.createObjectURL(imgFile);
            setProfileImg(url);
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
                <img src={editProfileIcon.src} alt="editProfileIcon" onClick={handleEditProfileIconClick} className="absolute bottom-1 right-0 w-6 h-6 desktop:w-[30px] desktop:h-[30px] cursor-pointer" />
                <input type="file" ref={imgInputRef} onChange={handleProfileImgChange} accept="image/*" className="hidden" />
            </div>
            <ul className="w-full flex flex-col gap-[14px] justify-center text-16 text-gray-600">
                <li>
                    <Link href="/main/profile" className={linkClassName("/main/profile")}>
                        <img src={userIcon.src} alt="userIcon" className={defaultIconClass("/main/profile")} />
                        <img src={userBlueIcon.src} alt="userIcon" className={blueIconClass("/main/profile")} />
                        내 정보
                    </Link>
                </li>
                <li>
                    <Link href="/main/reservations" className={linkClassName("/main/reservations")}>
                        <img src={listIcon.src} alt="listIcon" className={defaultIconClass("/main/reservations")} />
                        <img src={listBlueIcon.src} alt="listIcon" className={blueIconClass("/main/reservations")} />
                        예약내역
                    </Link>
                </li>
                <li>
                    <Link href="/main/my-experiences" className={linkClassName("/main/my-experiences")}>
                        <img src={calendarIcon.src} alt="calendarIcon" className={defaultIconClass("/main/my-experiences")} />
                        <img src={calendarBlueIcon.src} alt="calendarIcon" className={blueIconClass("/main/my-experiences")} />
                        내 체험 관리
                    </Link>
                </li>
                <li>
                    <Link href="/main/reservations-status" className={linkClassName("/main/reservations-status")}>
                        <img src={settingIcon.src} alt="settingIcon" className={defaultIconClass("/main/reservations-status")} />
                        <img src={settingBlueIcon.src} alt="settingIcon" className={blueIconClass("/main/reservations-status")} />
                        예약 현황
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Sidemenu;