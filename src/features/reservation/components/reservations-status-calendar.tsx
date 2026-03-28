"use client";

import { useRef } from "react";
import Image from "next/image";
import { DayPicker, useDayPicker, type MonthCaptionProps } from "react-day-picker";
import { format } from "date-fns";
import ReservationsStatusDetail from "@/features/reservation/components/reservations-status-detail";

import { MOCK_MONTHLY_SCHEDULES } from "@/features/reservation/reservations-status-mock-data"; //추후 삭제 예정

interface Props {
  activityId: number;
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
}

function CustomMonthCaption({ calendarMonth }: MonthCaptionProps) {

  
  const { goToMonth, previousMonth, nextMonth } = useDayPicker();

  return (
    <div>
        <div className="flex items-center justify-center tablet:gap-[30px] gap-[10px] h-11 mb-[30px]">
          <button
            onClick={() => previousMonth && goToMonth(previousMonth)}
            disabled={!previousMonth}
            className="w-9 h-9 flex items-center justify-center text-gray-700 hover:bg-gray-50 rounded-full transition-colors disabled:opacity-30"
          >
            <Image src="/assets/icons/arrow_left.svg" alt="arrow-left" width={24} height={24} />
          </button>
          <span className="tablet:text-20 text-16 font-bold text-gray-950">
            {format(calendarMonth.date, "yyyy년 M월")}
          </span>
          <button
            onClick={() => nextMonth && goToMonth(nextMonth)}
            disabled={!nextMonth}
            className="w-9 h-9 flex items-center justify-center text-gray-700 hover:bg-gray-50 rounded-full transition-colors disabled:opacity-30"
          >
            <Image src="/assets/icons/arrow_right.svg" alt="arrow-left" width={24} height={24} />
          </button>
        </div>
    </div>
  );
}

function ReservationsStatusCalendar( { activityId, selectedDate, onDateChange }: Props ) {
  const containerRef = useRef<HTMLDivElement>(null);

  const CustomDayButton = ({ day, modifiers, onClick, ...props }: React.ComponentProps<"button"> & { day: { date: Date }; modifiers: Record<string, boolean> }) => {
    const dateKey = format(day.date, "yyyy-MM-dd");
    const monthKey = format(day.date, "yyyy-MM");
    const mockKey = `${activityId}-${monthKey}`;
    
    const monthlySchedule = MOCK_MONTHLY_SCHEDULES[mockKey] || [];
    const dailySchedule = monthlySchedule?.find((schedule) => schedule.date === dateKey);
    const rawReservations = dailySchedule?.reservations ?? { completed: 0, confirmed: 0, pending: 0 };

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const isPast = day.date < today;

    const reservations = isPast
      ? {
          completed:
            rawReservations.completed +
            rawReservations.confirmed +
            rawReservations.pending,
          confirmed: 0,
          pending: 0,
        }
      : rawReservations;

    const hasReservations =
      reservations.completed > 0 ||
      reservations.confirmed > 0 ||
      reservations.pending > 0;
    const isSelected = selectedDate ? format(selectedDate, "yyyy-MM-dd") === dateKey : false;

    const getDetailPosition = () => {
      const date = day.date;
      const dayOfWeek = date.getDay(); // 0: 일, 1: 월, ..., 6: 토
      const isRightSide = dayOfWeek >= 4; // 목, 금, 토요일이면 왼쪽으로 띄우기
      

      const isBottomHalf = date.getDate() > 20; 
  
      let positionClass = "absolute z-50 ";
  
      // 가로 위치 결정
      if (isRightSide) {
        positionClass += "right-full mr-2 "; // 오른쪽에 있으면 왼쪽으로
      } else {
        positionClass += "left-full ml-2 ";  // 왼쪽에 있으면 오른쪽으로
      }
  
      // 세로 위치 결정 (하단 날짜 클릭 시 위로 띄우기)
      if (isBottomHalf) {
        positionClass += "bottom-0 "; // 아래쪽 날짜면 위로 솟구치게
      } else {
        positionClass += "top-0 ";    // 위쪽 날짜면 아래로 떨어지게
      }
  
      return positionClass;
    };

    return (
      <div className={`w-full h-full relative transition-colors cursor-pointer ${isSelected ? "text-primary-500 font-bold" : "hover:bg-primary-100 text-gray-800"}`}>
        <button
        {...props}
        onClick={() => {
          onDateChange(day.date);
        }}
        className={`w-full h-full relative flex flex-col items-center pt-[18px] px-2 text-16 transition-colors cursor-pointer
          `}
        >
          {hasReservations && !isPast && (
            <Image src="/assets/icons/statusDot.svg" alt="dot" width={6} height={6} className="mb-1 absolute top-3 tablet:right-3 desktop:right-7" />
          )}
          <span className="w-full text-center">{day.date.getDate()}</span>
          {hasReservations && (
            <div className="flex flex-col gap-1 mt-[5px] text-14 font-medium">
              {reservations.completed > 0 && (
                <span className="bg-gray-50 text-gray-500 rounded px-1 truncate">
                  완료 {reservations.completed}
                </span>
              )}
              {reservations.confirmed > 0 && (
                <span className="bg-[#FFF8DD] text-[#FFB051] rounded px-1 truncate">
                  승인 {reservations.confirmed}
                </span>
              )}
              {reservations.pending > 0 && (
                <span className="bg-primary-100 text-primary-500 rounded px-1 truncate">
                  예약 {reservations.pending}
                </span>
              )}
            </div>
          )}
        </button>
        {isSelected && (
          <div className={`${getDetailPosition()} desktop:block hidden`}>
            <ReservationsStatusDetail 
              activityId={activityId}
              selectedDate={selectedDate}
              onClose={() => onDateChange(null)}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div ref={containerRef} className="relative h-[779px] shadow-[0_4px_24px_0_#9CB4CA33] rounded-3xl py-6 flex flex-col">
      <DayPicker
        mode="single"
        selected={selectedDate ?? undefined}
        onSelect={(date) => date && onDateChange(date)}
        showOutsideDays
        formatters={{
          formatWeekdayName: (date) => format(date, "EEEEE"),
        }}
        components={{
          MonthCaption: CustomMonthCaption,
          Nav: () => <></>,
          DayButton: CustomDayButton,
        }}
        classNames={{
          root: "w-full flex-1 flex flex-col",
          months: "w-full flex-1 flex flex-col",
          month: "w-full flex-1 flex flex-col",
          month_grid: "w-full flex-1 flex flex-col",
          weekdays: "flex pb-3",
          weekday: "flex-1 text-center text-16 font-bold text-gray-900 py-3",
          weeks: "flex-1 flex flex-col",
          week: "flex flex-1 border-t border-gray-50",
          day: "flex-1",
          day_button:
            "w-full h-full flex items-start justify-center pt-[18px] text-16 text-gray-800 hover:bg-primary-100 transition-colors cursor-pointer",
          selected: "font-bold",
          today: "",
          outside: "opacity-40 pointer-events-none",
          disabled: "!text-gray-200 !cursor-not-allowed",
        }}
      />
    </div>
  );
}

export default ReservationsStatusCalendar;
