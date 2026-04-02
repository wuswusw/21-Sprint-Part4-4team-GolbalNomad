import React from "react";
import Dropdown, { DropdownItem } from "@/components/common/Dropdown";
import Button from "@/components/common/Button";
import { Schedule } from "@/hooks/use-activity-form";

interface ScheduleSectionProps {
  schedules: Schedule[];
  addSchedule: () => void;
  removeSchedule: (id: string | number) => void;
  setSchedules: (schedules: Schedule[]) => void;
}

const TIME_ITEMS: DropdownItem[] = Array.from({ length: 24 }, (_, i) => {
  const time = `${String(i).padStart(2, "0")}:00`;
  return { id: time, label: time };
});

export default function ScheduleSection({ 
  schedules, 
  addSchedule, 
  removeSchedule, 
  setSchedules 
}: ScheduleSectionProps) {
  
  const LABEL_COMMON_CLASSES = "mb-4 text-16 font-bold text-gray-950";

  const validateAndSync = (index: number, updatedSchedule: Schedule) => {
    const { date, startTime, endTime } = updatedSchedule;

    if (startTime && endTime) {
      const startHour = parseInt(startTime.id as string);
      const endHour = parseInt(endTime.id as string);
      
      if (endHour <= startHour) {
        alert("종료 시간은 시작 시간보다 늦어야 합니다.");
        return; 
      }
    }

    const isDuplicate = schedules.some((s, i) => {
      if (i === index) return false;
      return (
        s.date === date && 
        s.startTime?.id === startTime?.id && 
        s.endTime?.id === endTime?.id
      );
    });

    if (isDuplicate) {
      alert("이미 동일한 날짜와 시간대가 등록되어 있습니다.");
      return; 
    }

    const newSchedules = [...schedules];
    newSchedules[index] = updatedSchedule;
    setSchedules(newSchedules);
  };

  return (
    <div className="flex flex-col gap-6">
      <label className={LABEL_COMMON_CLASSES}>예약 가능한 시간대</label>
      {schedules.map((schedule, index) => (
        <div key={schedule.id} className="flex flex-col gap-2">
          {index === 0 && (
            <div className="flex gap-2 text-14 font-medium text-[#4B4B4B] px-1">
              <div className="flex-[1.5]">날짜</div>
              <div className="flex-1">시작 시간</div>
              <div className="w-5"></div>
              <div className="flex-1">종료 시간</div>
              <div className="w-[42px]"></div>
            </div>
          )}

          <div className="flex items-center gap-2">
            <div className="flex-[1.5]">
              <input
                type="date"
                className="w-full h-[56px] rounded-lg border border-[#E0E0E5] px-4 outline-none focus:border-black transition"
                value={schedule.date}
                onChange={(e) => {
                  const updated = { ...schedule, date: e.target.value };
                  validateAndSync(index, updated);
                }}
              />
            </div>

            <div className="flex-1">
              <Dropdown 
                items={TIME_ITEMS} 
                selectedItem={schedule.startTime} 
                onSelect={(item) => {
                  const updated = { ...schedule, startTime: item };
                  validateAndSync(index, updated);
                }} 
                placeholder="0:00" 
              />
            </div>

            <span className="text-gray-400">-</span>

            <div className="flex-1">
              <Dropdown 
                items={TIME_ITEMS} 
                selectedItem={schedule.endTime} 
                onSelect={(item) => {
                  const updated = { ...schedule, endTime: item };
                  validateAndSync(index, updated);
                }} 
                placeholder="0:00" 
              />
            </div>

            {index === 0 ? (
              <Button
                type="button"
                variant="primary"
                onClick={addSchedule}
                className="!w-[42px] !h-[42px] !p-0 !min-w-[42px] rounded-full flex-shrink-0"
              >
                <span className="text-21">+</span>
              </Button>
            ) : (
              <Button
                type="button"
                variant="secondary"
                onClick={() => removeSchedule(schedule.id)}
                className="!w-[42px] !h-[42px] !p-0 !min-w-[42px] rounded-full flex-shrink-0 !text-black !border-black"
              >
                <span className="text-21">-</span>
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}