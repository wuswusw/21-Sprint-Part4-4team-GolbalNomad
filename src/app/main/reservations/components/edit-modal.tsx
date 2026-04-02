'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { EditModalProps } from '@/types/modal';
import { toCalendarYearMonthStrings } from '@/features/experience/lib/experience-detail.utils';
import Calender from '@/features/experience/components/reservation-calender';
import BaseModal from '@/components/common/modal/base-modal';
import { getReservationAvailableDays } from '@/features/experience/api/experience-detail.api';
import { updateReservationSchedule } from '@/lib/api/reservations';
import Button from '@/components/common/Button';
import type {
  ReservationAvailableDaysResponse,
  ReservationAvailableTime,
} from '@/features/experience/types/experience-detail.type';

interface Props extends EditModalProps {
  onClose: () => void;
}

function timeSlotKey(time: ReservationAvailableTime) {
  return `${time.id}-${time.startTime}-${time.endTime}`;
}

export default function EditReservationModal({
  reservationId,
  activityId,
  price,
  onConfirm,
  onClose,
}: Props) {
  const [selectedTimeId, setSelectedTimeId] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availableDays, setAvailableDays] = useState<ReservationAvailableDaysResponse | undefined>(
    undefined,
  );
  const [count, setCount] = useState(1);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState('');

  const isReadyToReserve = selectedDate !== null && selectedTimeId !== null;
  const total = (price ?? 0) * count;

  useEffect(() => {
    setAvailableDays(undefined);
    const { year, month } = toCalendarYearMonthStrings(currentMonth);
    getReservationAvailableDays({ activityId, year, month })
      .then(setAvailableDays)
      .catch(() => setAvailableDays(undefined));
  }, [activityId, currentMonth]);

  const availableTimes =
    selectedDate && availableDays
      ? (availableDays.find((day) => day.date === selectedDate)?.times ?? [])
      : [];

  const handleTimeBtnClick = (scheduleId: number) => {
    setSelectedTimeId((prev) => (prev === scheduleId ? null : scheduleId));
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date ? format(date, 'yyyy-MM-dd') : null);
    setSelectedTimeId(null);
  };

  const handleReservationBtnClick = async () => {
    if (selectedTimeId == null || selectedDate == null) return;
    setIsPending(true);
    setError('');
    try {
      const token = localStorage.getItem('accessToken') || '';
      await updateReservationSchedule(token, reservationId, {
        scheduleId: selectedTimeId,
        headCount: count,
      });
      onConfirm?.();
      onClose();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : '예약 변경에 실패했습니다. 다시 시도해 주세요.',
      );
    } finally {
      setIsPending(false);
    }
  };

  const handleMinusBtnClick = () => {
    if (count <= 1) return;
    setCount(count - 1);
  };

  const handlePlusBtnClick = () => {
    setCount(count + 1);
  };

  return (
    <BaseModal onClose={onClose} padding="px-6 pt-15 pb-5" gap="gap-5">
      <Calender
        availableDays={availableDays}
        onSelectDate={handleDateSelect}
        onMonthChange={setCurrentMonth}
      />

      <div className="flex items-center justify-between">
        <h3 className="text-16 font-bold">참여 인원수</h3>
        <div className="flex items-center overflow-hidden rounded-full px-[9px] ring ring-[#eee]">
          <button type="button" onClick={handleMinusBtnClick} disabled={count <= 1}>
            <img src="/assets/icons/minus.svg" alt="minus" className="p-[10px]" />
          </button>
          <p className="text-16 flex w-5 items-center justify-center p-[10px] font-bold text-[#4B4B4B]">
            {count}
          </p>
          <button type="button" onClick={handlePlusBtnClick}>
            <img src="/assets/icons/plus.svg" alt="plus" className="p-[10px]" />
          </button>
        </div>
      </div>

      <div className="flex flex-col items-start gap-3">
        <h3 className="text-16 mb-[2px] font-bold">예약 가능한 시간</h3>
        {!selectedDate ? (
          <p className="text-body-16 w-full text-center text-[#4B4B4B]">날짜를 선택해주세요.</p>
        ) : availableTimes.length === 0 ? (
          <p className="text-body-16 w-full text-center text-[#4B4B4B]">
            선택한 날짜의 예약 가능 시간이 없습니다.
          </p>
        ) : (
          availableTimes.map((time) => (
            <button
              key={timeSlotKey(time)}
              type="button"
              onClick={() => handleTimeBtnClick(time.id)}
              className={`text-15 hover:ring-primary-500 hover:text-primary-500 hover:bg-primary-100 w-full rounded-[11px] px-3 py-4 font-medium ring ring-gray-300 ${
                selectedTimeId === time.id
                  ? 'ring-primary-500 text-primary-500 bg-primary-100'
                  : 'bg-white text-gray-950'
              }`}
            >
              {time.startTime} ~ {time.endTime}
            </button>
          ))
        )}
      </div>
      {error && <p className="text-14 text-center text-red-500">{error}</p>}
      <div className="flex items-center justify-between border-t border-[#ddd] pt-5 pb-[10px]">
        <div className="flex items-start gap-[6px]">
          <p className="text-20 font-medium text-[#79747E]">총 합계</p>
          <p className="text-20 font-bold">₩ {total.toLocaleString()}</p>
        </div>
        <Button
          size="lg"
          disabled={!isReadyToReserve || isPending}
          onClick={handleReservationBtnClick}
          className="bg-primary-500 text-16 h-[50px] rounded-[14px] px-10 py-4 font-bold !text-white"
        >
          {isPending ? '변경 중...' : '변경하기'}
        </Button>
      </div>
    </BaseModal>
  );
}
