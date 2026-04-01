"use client";

import { useState, useEffect, useMemo } from "react";
import { format } from "date-fns";
import Dropdown, { type DropdownItem } from "@/components/common/Dropdown";
import { useMyActivityManagement } from "@/features/reservation/hooks/use-my-activity-management";
import type { ReservationStatus } from "@/features/reservation/types/reservations-status.type";

type Tab = "신청" | "승인" | "거절";

function parseCreatedAtMs(createdAt: string): number {
  const t = new Date(createdAt).getTime();
  return Number.isNaN(t) ? 0 : t;
}

interface itemProps {
  activityId: number;
  selectedDate: Date;
  activeTab: Tab;
  onTabCountsChange?: (counts: Record<Tab, number>) => void;
  onTabNavigate?: (tab: "승인" | "거절") => void;
}

function ReservationsStatusItems({
  activityId,
  selectedDate,
  activeTab,
  onTabCountsChange,
  onTabNavigate,
}: itemProps) {
  const dateKey = format(selectedDate, "yyyy-MM-dd");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isPast = selectedDate < today;
  const { useDailySchedule, useActivityReservations, updateStatus, isUpdating } =
    useMyActivityManagement(activityId);
  const { data: dailySchedules = [], isLoading: isDailySchedulesLoading } =
    useDailySchedule(dateKey);
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(null);

  useEffect(() => {
    if (dailySchedules.length > 0) {
      setSelectedScheduleId(dailySchedules[0].scheduleId);
    } else {
      setSelectedScheduleId(null);
    }
  }, [dailySchedules]);

  const scheduleDropdownItems: DropdownItem[] = dailySchedules.map((s) => ({
    id: s.scheduleId,
    label: `${s.startTime} ~ ${s.endTime}`,
  }));

  const selectedSchedule = dailySchedules.find((s) => s.scheduleId === selectedScheduleId);
  const selectedScheduleItem: DropdownItem | null = selectedSchedule
    ? {
        id: selectedSchedule.scheduleId,
        label: `${selectedSchedule.startTime} ~ ${selectedSchedule.endTime}`,
      }
    : null;

  const statusMap: Record<Tab, ReservationStatus> = {
    신청: "pending",
    승인: isPast ? "completed" : "confirmed",
    거절: "declined",
  };
  const activeStatus = statusMap[activeTab];
  const { data: reservationsResponse, isLoading: isReservationsLoading } =
    useActivityReservations(selectedScheduleId ?? 0, activeStatus);
  const allReservations = useMemo(
    () => reservationsResponse?.reservations ?? [],
    [reservationsResponse]
  );

  const tabCounts = useMemo(() => {
    const selectedSchedule = dailySchedules.find((s) => s.scheduleId === selectedScheduleId);
    const pending = selectedSchedule?.count.pending ?? 0;
    const confirmed = selectedSchedule?.count.confirmed ?? 0;
    const declined = selectedSchedule?.count.declined ?? 0;

    return {
      신청: pending,
      승인: isPast ? pending + confirmed : confirmed,
      거절: declined,
    };
  }, [dailySchedules, isPast, selectedScheduleId]);

  useEffect(() => {
    onTabCountsChange?.(tabCounts);
  }, [tabCounts, onTabCountsChange]);

  const filteredReservations = useMemo(
    () =>
      allReservations.filter(
        (reservation) =>
          (isPast && reservation.status !== "declined" ? "completed" : reservation.status) ===
          activeStatus
      ),
    [allReservations, activeStatus, isPast]
  );

  const sortedFilteredReservations = useMemo(() => {
    return [...filteredReservations].sort((a, b) => {
      const tb = parseCreatedAtMs(b.createdAt);
      const ta = parseCreatedAtMs(a.createdAt);
      if (tb !== ta) return tb - ta;
      return b.id - a.id;
    });
  }, [filteredReservations]);

  const handleApprove = (reservationId: number) => {
    updateStatus(
      { reservationId, status: "confirmed" },
      {
        onSuccess: () => onTabNavigate?.("승인"),
      }
    );
  };

  const handleReject = (reservationId: number) => {
    updateStatus(
      { reservationId, status: "declined" },
      {
        onSuccess: () => onTabNavigate?.("거절"),
      }
    );
  };

  const isLoading = isDailySchedulesLoading || isReservationsLoading;

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center text-gray-400 text-14">
        예약 정보를 불러오는 중입니다.
      </div>
    );
  }

  return (
    <div className="flex w-full min-h-0 flex-col gap-[30px] tablet:flex-row desktop:flex-col">
      <div className="w-full flex flex-col gap-3">
        <p className="text-18 font-bold">예약 시간</p>
        {scheduleDropdownItems.length > 0 ? (
          <Dropdown
            items={scheduleDropdownItems}
            selectedItem={selectedScheduleItem}
            placeholder="시간대를 선택해 주세요"
            onSelect={(item) => setSelectedScheduleId(Number(item.id))}
          />
        ) : (
          <p className="text-center text-gray-400 text-14">예약 시간이 없습니다.</p>
        )}
      </div>
      <div className="w-full flex min-h-0 flex-col gap-3">
        <p className="text-18 font-bold shrink-0">예약 내역</p>
        <div className="flex desktop:max-h-[120px] h-50 flex-col gap-3 overflow-y-auto overscroll-y-contain pr-1 [-webkit-overflow-scrolling:touch]">
          {sortedFilteredReservations.length > 0 ? (
            sortedFilteredReservations.map((reservation) => (
              <div
                key={reservation.id}
                className="w-full shrink-0 border border-gray-50 rounded-xl flex items-center justify-between px-4 py-[14px]"
              >
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

                <div className="flex flex-col gap-2">
                  {activeTab === "신청" && (
                    <>
                      <button
                        type="button"
                        disabled={isUpdating}
                        onClick={() => handleApprove(reservation.id)}
                        className="text-gray-600 ring ring-gray-50 px-[10px] py-[6px] rounded-lg rounded-lg text-14 font-bold hover:bg-primary-600 transition-colors disabled:opacity-60"
                      >
                        승인하기
                      </button>
                      <button
                        type="button"
                        disabled={isUpdating}
                        onClick={() => handleReject(reservation.id)}
                        className="bg-gray-50 text-gray-600 px-4 py-2 rounded-lg rounded-lg text-14 font-bold hover:bg-primary-50 transition-colors disabled:opacity-60"
                      >
                        거절하기
                      </button>
                    </>
                  )}
                  {activeTab === "승인" && (
                    <span
                      className={`px-2 py-1 rounded-full text-13 font-bold ${
                        isPast ? "bg-gray-50 text-gray-500" : "bg-[#DDF9F9] text-[#1790A0]"
                      }`}
                    >
                      {isPast ? "체험 완료" : "예약 승인"}
                    </span>
                  )}
                  {activeTab === "거절" && (
                    <span className="px-2 py-1 rounded-full bg-[#FCECEA] text-[#F96767] text-13 font-bold">
                      예약 거절
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-1 items-center justify-center py-10 text-center text-gray-400 text-14">
              {activeTab} 내역이 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReservationsStatusItems;
