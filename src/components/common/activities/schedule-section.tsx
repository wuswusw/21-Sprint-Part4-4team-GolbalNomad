import React, { useState } from "react";
import Dropdown, { DropdownItem } from "@/components/common/Dropdown";
import Button from "@/components/common/Button";
import { Schedule } from "@/hooks/use-activity-form";

interface ScheduleSectionProps {
  schedules: Schedule[];
  removeSchedule: (id: string | number) => void;
  setSchedules: (schedules: Schedule[]) => void;
}

const TIME_ITEMS: DropdownItem[] = Array.from({ length: 24 }, (_, i) => {
  const time = `${String(i).padStart(2, "0")}:00`;
  return { id: time, label: time };
});

export default function ScheduleSection({ 
  schedules, 
  removeSchedule, 
  setSchedules 
}: ScheduleSectionProps) {
  
  const [inputSchedule, setInputSchedule] = useState<Omit<Schedule, 'id'>>({
    date: "",
    startTime: null,
    endTime: null,
  });

  const [errorMessage, setErrorMessage] = useState("");

  const LABEL_COMMON_CLASSES = "mb-4 text-16 font-bold text-gray-950";

  const handleAddClick = () => {
    const { date, startTime, endTime } = inputSchedule;

    if (!date || !startTime || !endTime) {
      setErrorMessage("날짜와 시간을 모두 선택해주세요.");
      return;
    }

    const startHour = parseInt((startTime.id as string).split(":")[0]);
    const endHour = parseInt((endTime.id as string).split(":")[0]);
    
    if (endHour <= startHour) {
      setErrorMessage("종료 시간은 시작 시간보다 늦어야 합니다.");
      return; 
    }

    const isDuplicate = schedules.some((s) => 
      s.date === date && s.startTime?.id === startTime.id && s.endTime?.id === endTime.id
    );

    if (isDuplicate) {
      setErrorMessage("이미 동일한 날짜와 시간대가 등록되어 있습니다.");
      return; 
    }

    setErrorMessage(""); 
    const newScheduleWithId = { ...inputSchedule, id: `new-${Date.now()}` };
    const currentValidSchedules = schedules.filter(s => s.date !== "");
    setSchedules([newScheduleWithId, ...currentValidSchedules]);
    
    setInputSchedule({ date: "", startTime: null, endTime: null });
  };

  const validSchedules = schedules.filter(s => s.date !== "");

  return (
    <div className="flex flex-col gap-6">
      <label className={LABEL_COMMON_CLASSES}>예약 가능한 시간대</label>
      
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 text-14 font-medium text-[#4B4B4B] px-1">
          <div className="flex-[1.5]">날짜</div>
          <div className="flex-1">시작 시간</div>
          <div className="w-5"></div>
          <div className="flex-1">종료 시간</div>
          <div className="w-[42px]"></div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-[1.5]">
            <input
              type="date"
              className={`w-full h-[56px] rounded-lg border px-4 outline-none transition ${
                errorMessage && !inputSchedule.date ? "border-red-500" : "border-[#E0E0E5] focus:border-black"
              }`}
              value={inputSchedule.date}
              onChange={(e) => {
                setInputSchedule({ ...inputSchedule, date: e.target.value });
                if (errorMessage) setErrorMessage(""); 
              }}
            />
          </div>
          <div className="flex-1">
            <Dropdown 
              items={TIME_ITEMS} 
              selectedItem={inputSchedule.startTime} 
              onSelect={(item) => {
                setInputSchedule({ ...inputSchedule, startTime: item });
                if (errorMessage) setErrorMessage("");
              }} 
              placeholder="0:00" 
            />
          </div>
          <span className="text-gray-400">-</span>
          <div className="flex-1">
            <Dropdown 
              items={TIME_ITEMS} 
              selectedItem={inputSchedule.endTime} 
              onSelect={(item) => {
                setInputSchedule({ ...inputSchedule, endTime: item });
                if (errorMessage) setErrorMessage("");
              }} 
              placeholder="0:00" 
            />
          </div>
          <Button
            type="button"
            variant="primary"
            onClick={handleAddClick}
            className="!w-[42px] !h-[42px] !p-0 !min-w-[42px] rounded-full flex-shrink-0"
          >
            <span className="text-21">+</span>
          </Button>
        </div>

        {errorMessage && (
          <p className="text-14 text-red-500 mt-1 ml-1">
            {errorMessage}
          </p>
        )}
      </div>

      {validSchedules.length > 0 && (
        <div className="flex flex-col gap-4">
          <hr className="border-[#E0E0E5] my-2" />
          {validSchedules.map((schedule) => (
            <div key={schedule.id} className="flex items-center gap-2">
              <div className="flex-[1.5]">
                <div className="w-full h-[56px] rounded-lg border border-[#E0E0E5] px-4 flex items-center text-[#4B4B4B]">
                  {schedule.date}
                </div>
              </div>
              <div className="flex-1 text-center border rounded-lg h-[56px] px-4 flex items-center text-[#4B4B4B]">
                {schedule.startTime?.label}
              </div>
              <span className="text-gray-400">-</span>
              <div className="flex-1 text-center border rounded-lg h-[56px] px-4 flex items-center text-[#4B4B4B]">
                {schedule.endTime?.label}
              </div>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  if (validSchedules.length === 1) {
                    setSchedules([]);
                  } else {
                    removeSchedule(schedule.id);
                  }
                }}
                className="!w-[42px] !h-[42px] !p-0 !min-w-[42px] rounded-full flex-shrink-0 !text-black !border-black"
              >
                <span className="text-21">-</span>
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}