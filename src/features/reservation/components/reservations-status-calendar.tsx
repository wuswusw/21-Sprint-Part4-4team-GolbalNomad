"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { DayPicker, useDayPicker, type MonthCaptionProps } from "react-day-picker";
import { format } from "date-fns";

// 예시 데이터 (나중에 API로 교체)
const reservationData: Record<string, { completed: number; pending: number; confirmed: number }> = {
    "2026-03-15": { completed: 10, confirmed: 1, pending: 0 },
    "2026-03-30": { completed: 0, confirmed: 2, pending: 1 },
  };

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

function ReservationsStatusCalendar() {
  const [selected, setSelected] = useState<Date | undefined>();
  const containerRef = useRef<HTMLDivElement>(null);


  // CustomDayButton을 내부에 정의해야 containerRef와 상태에 접근 가능
  const CustomDayButton = ({ day, modifiers, onClick, ...props }: React.ComponentProps<"button"> & { day: { date: Date }; modifiers: Record<string, boolean> }) => {
    const key = format(day.date, "yyyy-MM-dd");
    const data = reservationData[key];



    return (
      <button
        className="w-full h-full relative flex flex-col items-center pt-[18px] px-2 text-16 text-gray-800 hover:text-primary-500 transition-colors cursor-pointer"
      >
        {data && (
          <Image src="/assets/icons/statusDot.svg" alt="dot" width={6} height={6} className="mb-1 absolute top-3 tablet:right-3 desktop:right-7" />
        )}
        <span className="w-full text-center">{day.date.getDate()}</span>

        {data && (
          <div className="flex flex-col gap-1 mt-[5px] text-14 font-medium">
            {data.completed > 0 && (
              <span className="bg-gray-50 text-gray-500 rounded px-1 truncate">
                완료 {data.completed}
              </span>
            )}
            {data.confirmed > 0 && (
              <span className="bg-[#FFF8DD] text-[#FFB051] rounded px-1 truncate">
                승인 {data.confirmed}
              </span>
            )}
            {data.pending > 0 && (
              <span className="bg-primary-100 text-primary-500 rounded px-1 truncate">
                예약 {data.pending}
              </span>
            )}
          </div>
        )}
      </button>
    );
  };

  return (
    <div ref={containerRef} className="relative h-[779px] shadow-[0_4px_24px_0_#9CB4CA33] rounded-3xl py-6 flex flex-col">
      <DayPicker
        mode="single"
        selected={selected}
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
