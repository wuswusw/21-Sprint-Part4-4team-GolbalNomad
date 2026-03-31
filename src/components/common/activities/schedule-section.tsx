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

  return (
    <div className="flex flex-col gap-6">
      <label className={LABEL_COMMON_CLASSES}>예약 가능한 시간대</label>
      {schedules.map((schedule, index) => (
        <div key={schedule.id} className="flex flex-col gap-2">
          {index === 0 && (
            <div className="flex gap-2 text-14 font-medium text-[#4B4B4B]">
              <div className="flex-[1.5]">날짜</div>
              <div className="flex-1">시작 시간</div>
              <div className="w-5"></div>
              <div className="flex-1">종료 시간</div>
              <div className="w-[56px]"></div>
            </div>
          )}

          <div className="flex items-center gap-2">
            <div className="flex-[1.5]">
              <input
                type="date"
                className="w-full h-[56px] rounded-lg border border-[#E0E0E5] px-4 outline-none"
                value={schedule.date}
                onChange={(e) => {
                  const newSchedules = [...schedules];
                  newSchedules[index].date = e.target.value;
                  setSchedules(newSchedules);
                }}
              />
            </div>

            <div className="flex-1">
              <Dropdown 
                items={TIME_ITEMS} 
                selectedItem={schedule.startTime} 
                onSelect={(item) => {
                  const newSchedules = [...schedules];
                  newSchedules[index].startTime = item;
                  setSchedules(newSchedules);
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
                  const newSchedules = [...schedules];
                  newSchedules[index].endTime = item;
                  setSchedules(newSchedules);
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
                className="!w-[42px] !h-[42px] !p-0 !min-w-[42px] rounded-full flex-shrink-0 !text-[#000000] !border-[#000000]"
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