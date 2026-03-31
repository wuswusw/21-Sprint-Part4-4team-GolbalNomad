"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { MOCK_DAILY_SCHEDULES, MOCK_RESERVATIONS } from "@/features/reservation/reservations-status-mock-data";
import Dropdown from "@/components/common/Dropdown";

type Tab = "신청" | "승인" | "거절";

interface itemProps {
    activityId: number;
    selectedDate: Date;
    activeTab: Tab;
}


function ReservationsStatusItems({ activityId, selectedDate, activeTab }: itemProps) {
    const dateKey = format(selectedDate, "yyyy-MM-dd");
    const scheduleKey = `${activityId}-${dateKey}`;

    const dailySchedules = MOCK_DAILY_SCHEDULES[scheduleKey] || [];
    const  [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(null);
    
    useEffect(() => {
        if (dailySchedules.length > 0) {
            setSelectedScheduleId(dailySchedules[0].scheduleId);
        } else {
            setSelectedScheduleId(null);
        }
    }, [dateKey, activityId]);

    const allReservations = selectedScheduleId ? MOCK_RESERVATIONS[selectedScheduleId] : [];
    const statusMap: Record<Tab, string> = {
        "신청": "pending",
        "승인": "confirmed",
        "거절": "declined",
    }

    const filteredReservations = allReservations.filter((reservation) => reservation.status === statusMap[activeTab]);
    
    return (
        <div className="w-full flex desktop:flex-col tablet:flex-row flex-col gap-[30px]">
            <div className="w-full flex flex-col gap-3">
                <p className="text-18 font-bold">예약 시간</p>
                {dailySchedules.length > 0 ? (
                    dailySchedules.map((schedule) => (
                        <div
                        key={schedule.scheduleId}
                        onClick={() => setSelectedScheduleId(schedule.scheduleId)}
                        className="w-full h-[54px] ring ring-[#E0E0E5] rounded-xl flex items-center justify-center"
                        >
                            {schedule.startTime} - {schedule.endTime}
                            
                        </div>
                    )) 
                    ) : (
                    <p className="text-center text-gray-400 text-14">예약 시간이 없습니다.</p>
                )}
            </div>
            <div className="w-full flex flex-col gap-3">
                <p className="text-18 font-bold">예약 내역</p>
                {filteredReservations.length > 0 ? (
                    filteredReservations.map((reservation) => (
                        <div key={reservation.id} className="w-full border border-gray-50 rounded-xl flex items-center justify-between px-4 py-[14px]">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-16 font-bold text-gray-500">닉네임</span>
                                    <span className="text-16 font-medium text-gray-900">{reservation.nickname}</span>
                                </div>
                                <div className="flex items-center gap-5">
                                    <span className="text-16 font-bold text-gray-500">인원</span>
                                    <span className="text-16 font-medium text-gray-900">{reservation.headCount}명</span>
                                </div>
                            </div>

                            {/* 버튼 영역 */}
                            <div className="flex flex-col gap-2">
                                {activeTab === "신청" && (
                                    <>
                                        <button className="text-gray-600 ring ring-gray-50 px-[10px] py-[6px] rounded-lg rounded-lg text-14 font-bold hover:bg-primary-600 transition-colors">
                                            승인하기
                                        </button>
                                        <button className="bg-gray-50 text-gray-600 px-4 py-2 rounded-lg rounded-lg text-14 font-bold hover:bg-primary-50 transition-colors">
                                            거절하기
                                        </button>
                                    </>
                                )}
                                {activeTab === "승인" && (
                                    <span className="px-2 py-1 rounded-full bg-[#DDF9F9] text-[#1790A0] text-13 font-bold">
                                        예약 승인
                                    </span>
                                )}
                                {activeTab === "거절" && (
                                    <span className="px-2 py-1 rounded-full bg-[#FCECEA] text-[##F96767] text-13 font-bold">
                                        예약 거절
                                    </span>
                                )}
                            </div>
                        </div>
                    ))) 
                    : (
                        <div className="py-10 text-center text-gray-400 text-14">
                            {activeTab} 내역이 없습니다.
                        </div>
                    )}
            </div>
        </div>
    )
}

export default ReservationsStatusItems;
