"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import Calender from "./reservation-calender";
import { Button } from "@/components/ui/button";

import type {
  ReservationAvailableDaysResponse,
  ReservationAvailableTime,
} from "../types/experience-detail.type";

function timeSlotKey(time: ReservationAvailableTime) {
  return `${time.id}-${time.startTime}-${time.endTime}`;
}

interface ReservationSlideContentProps {
  availableDays?: ReservationAvailableDaysResponse;
  price?: number;
  onCalendarMonthChange?: (month: Date) => void;
  onConfirm: (data: { date: string; timeId: number; count: number }) => void;
  onClose: () => void;
}

function ReservationSlideContent({
  availableDays,
  price,
  onCalendarMonthChange,
  onConfirm,
  onClose,
}: ReservationSlideContentProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [localDate, setLocalDate] = useState<string | null>(null);
  const [localTimeId, setLocalTimeId] = useState<number | null>(null);
  const [localCount, setLocalCount] = useState(1);

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 1024px)");
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) onClose();
    };
    isDesktop.addEventListener("change", handler);
    return () => isDesktop.removeEventListener("change", handler);
  }, [onClose]);

  const total = (price ?? 0) * localCount;
  const isReady = localDate !== null && localTimeId !== null;

  const availableTimes =
    localDate && availableDays
      ? availableDays.find((day) => day.date === localDate)?.times ?? []
      : [];

  const handleDateSelect = (date: Date | undefined) => {
    setLocalDate(date ? format(date, "yyyy-MM-dd") : null);
    setLocalTimeId(null);
  };

  const handleTimeBtnClick = (scheduleId: number) => {
    setLocalTimeId((prev) => (prev === scheduleId ? null : scheduleId));
  };

  const handleMinusBtnClick = () => {
    if (localCount <= 1) return;
    setLocalCount(localCount - 1);
  };

  const handlePlusBtnClick = () => {
    setLocalCount(localCount + 1);
  };

  const handleConfirm = () => {
    if (localDate && localTimeId) {
      onConfirm({ date: localDate, timeId: localTimeId, count: localCount });
      onClose();
    }
  };

  const calendarSection = (
    <div>
      <h3 className="text-16 font-bold mb-2">날짜</h3>
      <Calender
        availableDays={availableDays}
        onSelectDate={handleDateSelect}
        onMonthChange={onCalendarMonthChange}
      />
    </div>
  );

  const timeSection = (
    <div className="flex flex-col items-stretch gap-3">
      <h3 className="text-16 font-bold mb-[2px]">예약 가능한 시간</h3>
      {!localDate ? (
        <p className="text-body-16 text-[#4B4B4B] w-full text-center py-2">
          날짜를 선택해주세요.
        </p>
      ) : availableTimes.length === 0 ? (
        <p className="text-body-16 text-[#4B4B4B] w-full text-center py-2">
          선택한 날짜의 예약 가능 시간이 없습니다.
        </p>
      ) : (
        availableTimes.map((time) => (
          <button
            key={timeSlotKey(time)}
            type="button"
            onClick={() => handleTimeBtnClick(time.id)}
            className={`w-full px-3 py-4 rounded-[11px] ring ring-gray-300 text-15 font-medium hover:ring-primary-500 hover:text-primary-500 hover:bg-primary-100 ${
              localTimeId === time.id
                ? "ring-primary-500 text-primary-500 bg-primary-100"
                : "text-gray-950 bg-white"
            }`}
          >
            {time.startTime} ~ {time.endTime}
          </button>
        ))
      )}
    </div>
  );

  const countSection = (
    <div className="flex justify-between w-full items-center">
      <h3 className="text-16 font-bold">참여 인원수</h3>
      <div className="flex items-center rounded-full ring ring-[#eee] overflow-hidden px-[9px]">
        <button type="button" onClick={handleMinusBtnClick} disabled={localCount <= 1}>
          <img src="/assets/icons/minus.svg" alt="minus" className="p-[10px]" />
        </button>
        <p className="w-5 flex items-center justify-center p-[10px] text-16 font-bold text-[#4B4B4B]">
          {localCount}
        </p>
        <button type="button" onClick={handlePlusBtnClick}>
          <img src="/assets/icons/plus.svg" alt="plus" className="p-[10px]" />
        </button>
      </div>
    </div>
  );

  const totalSection = (
    <div className="flex justify-between items-center pt-4 border-t border-[#eee]">
      <p className="text-16 font-medium text-[#79747E]">총 합계</p>
      <p className="text-16 font-bold">₩ {total.toLocaleString()}</p>
    </div>
  );

  return (
    <div className="max-h-[min(85vh,640px)] overflow-y-auto py-3 px-1">
      <div className="hidden tablet:Section tablet:py-6 tablet:px-[30px]">
        <div className="flex items-start gap-6">
          <div className="shrink-0 max-w-[min(100%,320px)] min-w-[240px]">
            {calendarSection}
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-9 shadow-[0px_4px_24px_0px_#9CB4CA33] rounded-3xl p-[30px]">
            {timeSection}
            {countSection}
          </div>
        </div>
        <div className="mt-6">{totalSection}</div>
        <Button
          type="button"
          variant="default"
          disabled={!isReady}
          className="mt-4 w-full rounded-[14px] bg-primary-500 !text-white text-16 font-bold h-[48px] disabled:bg-gray-200 disabled:text-white"
          onClick={handleConfirm}
        >
          확인
        </Button>
      </div>

      <div className="tablet:hidden">
        {step === 1 ? (
          <div>
            <div className="flex flex-col gap-6">
              {calendarSection}
              {timeSection}
            </div>
            <Button
              type="button"
              variant="default"
              disabled={!isReady}
              className="mt-6 w-full rounded-[14px] bg-primary-500 !text-white text-16 font-bold h-[48px] disabled:bg-gray-200 disabled:text-white"
              onClick={() => setStep(2)}
            >
              다음
            </Button>
          </div>
        ) : (
          <div>
            <div className="flex flex-col justify-center items-start mb-6 gap-5 w-full">
              <div className="flex flex-col gap-[10px]">
                <div className="flex items-center justify-start w-full">
                  <button type="button" onClick={() => setStep(1)} className="mr-[2px]">
                    <Image src="/assets/icons/back.svg" alt="go-back" width={24} height={24} />
                  </button>
                  <h2 className="text-18 font-bold">인원</h2>
                </div>
                <p className="text-16 font-medium text-[#4B4B4B]">예약할 인원을 선택해주세요.</p>
              </div>
              {countSection}
            </div>
            {totalSection}
            <Button
              type="button"
              variant="default"
              className="mt-6 w-full rounded-[14px] bg-primary-500 !text-white text-16 font-bold h-[48px]"
              onClick={handleConfirm}
            >
              확인
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReservationSlideContent;
