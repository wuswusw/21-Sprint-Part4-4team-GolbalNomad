"use client";

import { useState } from "react";
import { format } from "date-fns";
import Calender from "./reservation-calender";
import { Button } from "@/components/ui/button";

import type {
  ReservationAvailableDaysResponse,
  ReservationAvailableTime,
} from "../types/experience-detail.type";
import { useCreateReservation } from "../hooks/use-create-reservation";

function timeSlotKey(time: ReservationAvailableTime) {
  return `${time.id}-${time.startTime}-${time.endTime}`;
}

interface ReservationCardProps {
    activityId: number;
    price?: number;
    availableDays?: ReservationAvailableDaysResponse;
    onCalendarMonthChange?: (month: Date) => void;
    onLoadMore?: () => void;
    hasNextPage?: boolean;
}

function ReservationCard({
    activityId,
    price,
    availableDays,
    onCalendarMonthChange,
}: ReservationCardProps) {
    const [count, setCount] = useState(1);
    const [selectedTimeId, setSelectedTimeId] = useState<number | null>(null);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const {mutate, isPending} = useCreateReservation(activityId);

    const total = (price ?? 0) * count;
    const isReadyToReserve = selectedDate !== null && selectedTimeId !== null;

    const availableTimes =
    selectedDate && availableDays
      ? availableDays.find((day) => day.date === selectedDate)?.times ?? []
      : [];

    const handleTimeBtnClick = (scheduleId: number) => {
        setSelectedTimeId((prev) => (prev === scheduleId ? null : scheduleId));
    };

    const handleDateSelect = (date: Date | undefined) => {
        setSelectedDate(date ? format(date, "yyyy-MM-dd") : null);
        setSelectedTimeId(null);
    };

    const handleReservationBtnClick = () => {
        if (selectedTimeId == null || selectedDate == null) return;
        const slot = availableTimes.find((t) => t.id === selectedTimeId);
        if (!slot) return;
        mutate({
            scheduleId: selectedTimeId,
            headCount: count,
        });
    };

    const handleMinusBtnClick = () => {
        if (count <= 1) return;
        setCount(count - 1);
    }

    const handlePlusBtnClick = () => {
        setCount(count + 1);
    }

  return (
    <div className="p-[30px] rounded-3xl shadow-[0px_4px_24px_0px_#9CB4CA33]">
        <div className="flex justify-start items-center gap-1 mb-6">
            <h2 className="text-24 font-bold">₩ {price?.toLocaleString()}</h2>
            <p className="text-20 font-medium text-[#79747E]"> / 인</p>
        </div>
        <h3 className="text-16 font-bold mb-2">날짜</h3>
        <div>
            <Calender
                availableDays={availableDays}
                onSelectDate={handleDateSelect}
                onMonthChange={onCalendarMonthChange}
            />
        </div>
        <div className="flex justify-between items-center my-6">
            <h3 className="text-16 font-bold">참여 인원수</h3>
            <div className="flex items-center rounded-full ring ring-[#eee] overflow-hidden px-[9px]">
                <button onClick={handleMinusBtnClick} disabled={count <= 1}><img src="/assets/icons/minus.svg" alt="minus" className="p-[10px]" /></button>
                <p className="w-5 flex items-center justify-center p-[10px] text-16 font-bold text-[#4B4B4B]">{count}</p>
                <button onClick={handlePlusBtnClick}><img src="/assets/icons/plus.svg" alt="plus" className="p-[10px]" /></button>                            </div>
        </div>
        <div className="flex flex-col items-start gap-3 mb-6">
            <h3 className="text-16 font-bold mb-[2px]">예약 가능한 시간</h3>
            {!selectedDate ? (
                <p className="text-body-16 text-[#4B4B4B] w-full text-center">날짜를 선택해주세요.</p>
            ) : availableTimes.length === 0 ? (
                <p className="text-body-16 text-[#4B4B4B] w-full text-center">선택한 날짜의 예약 가능 시간이 없습니다.</p>
            ) : (
                availableTimes.map((time) => (
                    <button
                        key={timeSlotKey(time)}
                        type="button"
                        onClick={() => handleTimeBtnClick(time.id)}
                        className={`w-full px-3 py-4 rounded-[11px] ring ring-gray-300 text-15 font-medium hover:ring-primary-500 hover:text-primary-500 hover:bg-primary-100 ${
                            selectedTimeId === time.id
                                ? "ring-primary-500 text-primary-500 bg-primary-100"
                                : "text-gray-950 bg-white"
                        }`}
                    >
                        {time.startTime} ~ {time.endTime}
                    </button>
                ))
            )}
        </div>
        <div className="flex justify-between items-center pt-5 pb-[10px] border-t border-[#ddd]">
            <div className="flex items-start gap-[6px]">
                <p className="text-20 font-medium text-[#79747E]">총 합계</p>
                <p className="text-20 font-bold">₩ {total.toLocaleString()}</p>
            </div>
            <Button
              variant="default"
              size="lg"
              disabled={!isReadyToReserve || isPending}
              onClick={handleReservationBtnClick}
              className="px-10 py-4 rounded-[14px] bg-primary-500 !text-white text-16 font-bold h-[50px]"
            >
                {isPending ? "예약 중" : "예약하기"}
            </Button>
        </div>
    </div>
  );
}

export default ReservationCard;