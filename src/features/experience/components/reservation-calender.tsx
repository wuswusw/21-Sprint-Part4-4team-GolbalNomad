"use client";

import { useEffect, useMemo, useState } from "react";
import { DayPicker, useDayPicker, type MonthCaptionProps } from "react-day-picker";
import { format } from "date-fns";
import Image from "next/image";

interface Schedule {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
}

interface MyDayPickerProps {
  schedules?: Schedule[];
  onSelectDate?: (date: Date | undefined) => void;
}

const CustomCaption = ({ calendarMonth }: MonthCaptionProps) => {
  const { goToMonth, nextMonth, previousMonth } = useDayPicker();

  return (
    <div className="w-full flex items-center justify-between mb-2">
      <p className="text-body-16 font-bold">{format(calendarMonth.date, "MMMM yyyy")}</p>
      <div className="flex justify-center gap-3">
        <button onClick={() => previousMonth && goToMonth(previousMonth)}>
          <Image src="/assets/icons/arrowLeft.svg" alt="arrowLeft" width={24} height={24} />
        </button>
        <button onClick={() => nextMonth && goToMonth(nextMonth)}>
          <Image src="/assets/icons/arrowRight.svg" alt="arrowRight" width={24} height={24} />
        </button>
      </div>
    </div>
  );
};

const MyDayPicker = ({ schedules, onSelectDate }: MyDayPickerProps) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const hasSchedules = schedules !== undefined;

  const availableDateSet = useMemo(() => {
    return new Set((schedules ?? []).map((schedule) => schedule.date));
  }, [schedules]);

  const isSameMonth = (date: Date) => {
    return (
      date.getFullYear() === currentMonth.getFullYear() &&
      date.getMonth() === currentMonth.getMonth()
    );
  };

  const isScheduled = (date: Date) => {
    return availableDateSet.has(format(date, "yyyy-MM-dd"));
  };

  const isSelectable = (date: Date) => {
    if (!hasSchedules) return true;
    return isSameMonth(date) && isScheduled(date);
  };

  const [selected, setSelected] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if (selected && !isSelectable(selected)) {
      setSelected(undefined);
    }
    onSelectDate?.(selected);
  }, [selected, availableDateSet, hasSchedules, currentMonth]);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="bg-white w-full">
        <DayPicker
          mode="single"
          selected={selected}
          onSelect={setSelected}
          showOutsideDays
          hideNavigation
          month={currentMonth}
          onMonthChange={setCurrentMonth}
          disabled={(date) => !isSelectable(date)}
          modifiers={
            hasSchedules
              ? {
                  available: (date) => isSelectable(date),
                  scheduledOutside: (date) =>
                    !isSameMonth(date) && isScheduled(date),
                }
              : undefined
          }
          modifiersClassNames={
            hasSchedules
              ? {
                  available:
                    "bg-primary-100 text-primary-500 !text-primary-500 !bg-primary-100 rounded-full font-medium cursor-pointer hover:bg-primary-500 hover:text-white",
                  scheduledOutside:
                    "bg-gray-100 text-gray-300 !text-gray-300 !bg-gray-50 rounded-full font-medium cursor-not-allowed",
                }
              : undefined
          }
          formatters={{
            formatWeekdayName: (day) => format(day, "EEEEE"),
          }}
          components={{
            MonthCaption: CustomCaption,
          }}
          classNames={{
            root: "w-full",
            months: "w-full",
            month: "w-full",
            month_grid: "mx-auto",
            month_caption: "flex justify-between items-center py-2 mb-4",
            weekday: "text-[#333] font-semibold text-[16px] w-[46px] h-[46px]",
            day: "h-[46px] w-[46px] text-center font-medium rounded-full",
            outside: "text-gray-300 cursor-not-allowed",
            selected:
              "!bg-primary-500 !text-white font-bold rounded-full",
          }}
        />
      </div>
    </div>
  );
};

export default MyDayPicker;