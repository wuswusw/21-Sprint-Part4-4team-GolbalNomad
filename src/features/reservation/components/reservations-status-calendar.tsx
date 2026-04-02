"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { DayPicker, useDayPicker, type MonthCaptionProps } from "react-day-picker";
import { format } from "date-fns";
import ReservationsStatusDetail from "@/features/reservation/components/reservations-status-detail";
import { useModal } from "@/hooks/use-modal";
import { useMyActivityManagement } from "@/features/reservation/hooks/use-my-activity-management";

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
  const { openModal, closeModal } = useModal();
  const [currentMonth, setCurrentMonth] = useState<Date>(selectedDate ?? new Date());
  const { useMonthlySchedule } = useMyActivityManagement(activityId);
  const year = format(currentMonth, "yyyy");
  const month = format(currentMonth, "MM");
  const { data: monthlySchedule = [] } = useMonthlySchedule(year, month);
  const monthlyReservationsByDate = useMemo(() => {
    return Object.fromEntries(monthlySchedule.map((item) => [item.date, item.reservations]));
  }, [monthlySchedule]);

  const isDesktop = () =>
    typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches;

  const openDetailSheet = (date: Date) => {
    openModal("slide", {
      title: "",
      padding: "p-0",
      children: (
        <ReservationsStatusDetail
          activityId={activityId}
          selectedDate={date}
          disableOutsideClose
          onClose={() => {
            closeModal();
            onDateChange(null);
          }}
        />
      ),
    });
  };

  useEffect(() => {
    if (!selectedDate) return;
    if (isDesktop()) return;
    openDetailSheet(selectedDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, activityId]);

  useEffect(() => {
    if (!selectedDate) return;
    setCurrentMonth(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleChange = (event: MediaQueryListEvent) => {
      if (!event.matches) return;
      closeModal();
      onDateChange(null);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [closeModal, onDateChange]);

  const CustomDayButton = ({ day, ...props }: React.ComponentProps<"button"> & { day: { date: Date }; modifiers: Record<string, boolean> }) => {
    const dateKey = format(day.date, "yyyy-MM-dd");
    const rawReservations = monthlyReservationsByDate[dateKey] ?? { completed: 0, confirmed: 0, pending: 0 };

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
      const dayOfWeek = date.getDay(); 
      const isRightSide = dayOfWeek >= 4;
      

      const isBottomHalf = date.getDate() > 20; 
  
      let positionClass = "absolute z-50 ";
  
      if (isRightSide) {
        positionClass += "right-full mr-2 ";
      } else {
        positionClass += "left-full ml-2 ";
      }
  
      if (isBottomHalf) {
        positionClass += "bottom-0 ";
      } else {
        positionClass += "top-0 ";
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
          {hasReservations && (
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
    <div ref={containerRef} className="relative h-[779px] shadow-none tablet:shadow-[0_4px_24px_0_#9CB4CA33] shadow-[0_4px_12px_0_#9CB4CA33] rounded-3xl py-6 flex flex-col">
      <DayPicker
        mode="single"
        month={currentMonth}
        onMonthChange={setCurrentMonth}
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
