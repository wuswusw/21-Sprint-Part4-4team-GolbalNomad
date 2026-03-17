"use client";

interface Reservation {
    id: number;
    nickname: string;
    numberOfPeople: number;
    reservationTime: string;
    status: string;
}

type Tab = "신청" | "승인" | "거절";

const MOCK_RESERVATIONS: Reservation[] = [
    {
        id: 1,
        nickname: "홍길동",
        numberOfPeople: 12,
        reservationTime: "2026-03-17 10:00",
        status: "승인",
    },
    {
        id: 2,
        nickname: "김철수",
        numberOfPeople: 5,
        reservationTime: "2026-03-17 10:00",
        status: "거절",
    },
]

function ReservationsStatusItems({ activeTab }: { activeTab: Tab }) {
    return (
        <div className="w-full flex flex-col gap-[30px]">
            <div className="w-full flex flex-col gap-3">
                <p className="text-18 font-bold">예약 시간</p>
                <div className="w-full h-[54px] ring ring-[#E0E0E5] rounded-xl flex items-center justify-center">2026-03-17 10:00</div>
            </div>
            <div className="w-full flex flex-col gap-3">
                <p className="text-18 font-bold">예약 내역</p>
            {MOCK_RESERVATIONS.map((reservation: Reservation) => (
                        <div key={reservation.id} className="w-full ring ring-[#E0E0E5] rounded-xl flex items-center justify-between px-4 py-[14px]">
                            <div className="flex flex-col justify-center items-start gap-[10px]">
                                <div className="flex items-center justify-start gap-1">
                                    <div className="text-16 font-bold text-gray-500">닉네임</div>
                                    <div className="text-16 font-medium">{reservation.nickname}</div>
                                </div>
                                <div className="flex items-center gap-[22px]">
                                    <div className="text-16 font-bold text-gray-500">인원</div>
                                    <div className="text-16 font-medium">{reservation.numberOfPeople}명</div>
                                </div>
                            </div>
                            {activeTab === "신청" && (
                                <div className="flex flex-col items-center gap-2">
                                    <button className="bg-white text-gray-600 ring ring-gray-50 px-[10px] py-[6px] rounded-lg text-14">승인하기</button>
                                    <button className="bg-gray-50 text-gray-600 px-[10px] py-[6px] rounded-lg text-14">거절하기</button>
                                </div>
                            )}
                            {activeTab === "승인" && (
                                <div className="bg-[#DDF9F9] rounded-full px-2 py-1 text-13 font-bold text-[#1790A0]">예약 승인</div>
                            )}                            
                            {activeTab === "거절" && (
                                <div className="bg-[#FCECEA] rounded-full px-2 py-1 text-13 font-bold text-[#F96767]">예약 거절</div>
                            )}
                        </div>
                ))}
            </div>
        </div>
    )
}

export default ReservationsStatusItems;
