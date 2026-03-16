"use client";

import Link from "next/link";
import { useState, useRef, useCallback } from "react";
import useClickOutside from "@/hooks/use-click-outside";

interface GNBProps {
    nickname?: string;
    profileImage?: string;
}

function GNB({ nickname, profileImage }: GNBProps) {
    const [isLogin, setIsLogin] = useState(false); // api 연결 후 상태 관리 변경해야함
    const [isNotificationOpen, setIsNotificationOpen] = useState(false); 
    const [isProfileOpen, setIsProfileOpen] = useState(false);  
    const notificationRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null)
    
    const closeNotification = useCallback(() => setIsNotificationOpen(false), []);
    const closeProfile = useCallback(() => setIsProfileOpen(false), []);

    useClickOutside(notificationRef, closeNotification, isNotificationOpen);
    useClickOutside(profileRef, closeProfile, isProfileOpen);
    
    const handleBellClick = () => {
        setIsNotificationOpen(prev => !prev)
    }
    const handleProfileClick = () => {
        setIsProfileOpen(prev => !prev)
    }
    const handleLogoutClick = () => {
        setIsLogin(false);
        // 로그아웃 로직 추가 필요
    }



    return (
        <div>
            <button onClick={() => setIsLogin(prev => !prev)} className="fixed bottom-4 right-4 z-50 bg-primary-500 text-white px-3 py-1 rounded text-12">
                임시 로그인 토글 (전역 로그인 상태 관리 적용 후 삭제해야함) 
            </button> 
            <div className="flex justify-between items-center w-full h-12 tablet:h-[80px] desktop:px-50 tablet:px-[30px] px-6 tablet:py-6 py-2">
                <Link href="/" >
                <img src="/assets/images/textLogo.png" alt="logo" className="hidden tablet:block" />
                <img src="/assets/images/symbolLogo.png" alt="logo" className="block tablet:hidden" />
                </Link>
                {!isLogin && (
                    <div className="flex items-center gap-2 text-14 text-gray-950">
                        <Link href="/auth/login" className="hover:bg-primary-500 hover:text-white rounded-xl px-4 py-3">로그인</Link>
                        <Link href="/auth/signup" className="hover:bg-primary-500 hover:text-white rounded-xl px-4 py-3">회원가입</Link>
                    </div>
                )}
                {isLogin && (
                    <div className="flex items-center">
                        <div className="relative" ref={notificationRef}>
                            <img src={isNotificationOpen ? "/assets/icons/bellBlue.svg" : "/assets/icons/bell.svg"} alt="bell" onClick={handleBellClick} className="w-[24px] h-[24px] cursor-pointer" />
                            <img src="/assets/icons/statusDot.svg" alt="stateDot" className="absolute top-0 right-0" />
                            {isNotificationOpen && (
                                <div className="absolute w-60 h-60 top-9 right-0 bg-white rounded-lg shadow-[0px_2px_8px_0px_#78748640] z-50">
                                    <h1>알림</h1>
                                </div>
                            )}
                        </div>
                        <span className="mx-5 text-gray-100">|</span>
                        <img src={profileImage ?? "/assets/images/default profile.png"} alt="profile" className="w-[30px] h-[30px] rounded-full" />
                        <div className="relative" ref={profileRef}>
                            <span className="text-14 text-gray-950 ml-[10px] cursor-pointer" onClick={handleProfileClick}>{nickname ?? "이름 없음"}</span>
                            {isProfileOpen && (
                                        <div className="flex flex-col items-center justify-center w-32 px-[14px] py-4 rounded-xl shadow-[0px_2px_8px_0px_#78748640] absolute top-9 right-0">
                                        <ul className="w-full flex flex-col gap-[14px] justify-center text-16 text-gray-600">
                                            <li>
                                                <button className=" w-full flex items-center justify-center text-14 py-[15px] hover:ring-primary-100 hover:ring-2 hover:text-gray-950 rounded-xl " onClick={handleLogoutClick}>로그아웃</button>
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
