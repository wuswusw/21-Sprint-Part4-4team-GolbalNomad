"use client";

import { useState } from "react";
import { DayPicker, useDayPicker, type MonthCaptionProps } from "react-day-picker";
import { format } from "date-fns";
import Image from "next/image";

interface MyDayPickerProps {
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

const MyDayPicker = () => {
  const [selected, setSelected] = useState<Date | undefined>(new Date());

  return (
    <div className="flex flex-col items-center w-full">
      <div className="bg-white w-full">
        <DayPicker
          mode="single"
          selected={selected}
          onSelect={setSelected}
          showOutsideDays
          hideNavigation
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
            day: "h-[46px] w-[46px] text-center font-medium hover:bg-primary-100 hover:text-primary-500 rounded-full",
            outside: "text-gray-300",
            selected: "bg-primary-500 text-white font-bold rounded-full",
          }}
        />
      </div>
      
      {/* {selected && (
        <p className="mt-4 text-gray-600 text-sm">
          선택된 날짜: {selected.toLocaleDateString()}
        </p>
      )} */}
    </div>
  );
};

export default MyDayPicker;