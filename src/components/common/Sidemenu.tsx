"use client"

import Link from "next/link";
import { useRef, useState } from "react";
import BasicPofile from "@/assets/images/default profile.png";
import editProfileIcon from "@/assets/icons/editButton.svg";
import userIcon from "@/assets/icons/user.svg";
import listIcon from "@/assets/icons/list.svg";
import settingIcon from "@/assets/icons/setting.svg";
import calendarIcon from "@/assets/icons/calendar.svg";

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
    return (
        <div className="flex flex-col items-center justify-center desktop:w-[291px] w-[178px] px-[14px] desktop:py-6 py-4 rounded-xl hidden tablet:flex shadow-[0px_4px_24px_0px_#9CB4CA33]">
            <div className="mb-6 relative">
                <img src={profileImg} alt="BasicPofile" className="rounded-full w-[70px] h-[70px] desktop:w-[120px] desktop:h-[120px]"/>
                <img src={editProfileIcon.src} alt="editProfileIcon" onClick={handleEditProfileIconClick} className="absolute bottom-1 right-0 w-6 h-6 desktop:w-[30px] desktop:h-[30px] cursor-pointer" />
                <input type="file" ref={imgInputRef} onChange={handleProfileImgChange} accept="image/*" className="hidden" />
            </div>
            <ul className="w-full flex flex-col gap-[14px] justify-center text-16 text-gray-600">
                <li>
                    <Link href="/main/profile" className="flex items-center gap-2 py-[15px] pl-5 hover:text-primary-500"><img src={userIcon.src} alt="userIcon" />내 정보</Link>
                </li>
                <li>
                    <Link href="/main/reservations" className="flex items-center gap-2 py-[15px] pl-5 hover:text-primary-500"><img src={listIcon.src} alt="listIcon" />예약내역</Link>
                </li>
                <li>
                    <Link href="/main/my-experiences" className="flex items-center gap-2 py-[15px] pl-5 hover:text-primary-500"><img src={calendarIcon.src} alt="calendarIcon" />내 체험 관리</Link>
                </li>
                <li>
                    <Link href="/main/reservations-status" className="flex items-center gap-2 py-[15px] pl-5 hover:text-primary-500"><img src={settingIcon.src} alt="settingIcon" />예약 현황</Link>
                </li>
            </ul>
        </div>
    )
}

export default Sidemenu;