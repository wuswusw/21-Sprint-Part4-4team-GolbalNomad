"use client";

import Link from "next/link";
import { useState } from "react";
import logo from "@/assets/images/textLogo.png";
import symbolLogo from "@/assets/images/symbolLogo.png";
import profile from "@/assets/images/default profile.png";
import bell from "@/assets/icons/bell.svg";
import bellBlue from "@/assets/icons/bellBlue.svg";
import statusDot from "@/assets/icons/statusDot.svg";

interface GNBProps {
    nickname?: string;
    profileImage?: string;
}

function GNB({ nickname, profileImage }: GNBProps) {
    const [isLogin, setIsLogin] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false); 
    const [isProfileOpen, setIsProfileOpen] = useState(false);   
    const handleBellClick = () => {
        setIsNotificationOpen(!isNotificationOpen)
    }
    const handleProfileClick = () => {
        setIsProfileOpen(!isProfileOpen)
    }
    return (
        <div>
            {/* TODO: API 연결 후 삭제 */}
            <button onClick={() => setIsLogin(!isLogin)} className="fixed bottom-4 right-4 z-50 bg-primary-500 text-white px-3 py-1 rounded text-12">
                로그인 토글 (임시)
            </button>
            <div className="flex justify-between items-center w-full h-[80px] desktop:px-50 tablet:px-[30px] px-6 tablet:py-6 py-2">
                <Link href="/" >
                <img src={logo.src} alt="logo" className="hidden tablet:block" />
                <img src={symbolLogo.src} alt="logo" className="block tablet:hidden" />
                </Link>
                {!isLogin && (
                    <div className="flex items-center gap-2 text-14 text-gray-950">
                        <Link href="/auth/login">
                            <button className="hover:bg-primary-500 hover:text-white rounded-xl px-4 py-3">로그인</button>
                        </Link>
                        <Link href="/auth/signup">
                            <button className="hover:bg-primary-500 hover:text-white rounded-xl px-4 py-3">회원가입</button>
                        </Link>
                    </div>
                )}
                {isLogin && (
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <img src={isNotificationOpen? bellBlue.src : bell.src} alt="bell" onClick={handleBellClick} className="w-[24px] h-[24px] cursor-pointer" />
                            <img src={statusDot.src} alt="stateDot" className="absolute top-0 right-0" />
                            {isNotificationOpen && (
                                <div className="absolute w-60 h-60 top-9 right-0 bg-white rounded-lg shadow-[0px_2px_8px_0px_#78748640]">
                                    <h1>알림</h1>
                                </div>
                            )}
                        </div>
                        <span className="mx-5 text-gray-100">|</span>
                        <img src={profileImage ?? profile.src} alt="profile" className="w-[30px] h-[30px] rounded-full" />
                        <div className="relative">
                            <span className="text-14 text-gray-950 ml-[10px] cursor-pointer" onClick={handleProfileClick}>{nickname ?? "이름 없음"}</span>
                            {isProfileOpen && (
                                        <div className="flex flex-col items-center justify-center w-32 px-[14px] py-4 rounded-xl shadow-[0px_2px_8px_0px_#78748640] absolute top-9 right-0">
                                        <ul className="w-full flex flex-col gap-[14px] justify-center text-16 text-gray-600">
                                            <li>
                                                <Link href="/main/profile" className="flex items-center justify-center text-14 py-[15px] hover:ring-primary-100 hover:ring-2 hover:text-gray-950 rounded-xl ">로그아웃</Link>
                                            </li>
                                            <li>
                                                <Link href="/main/profile" className="flex items-center justify-center text-14 py-[15px] hover:ring-primary-100 hover:ring-2 hover:text-gray-950 rounded-xl">마이페이지</Link>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

export default GNB;