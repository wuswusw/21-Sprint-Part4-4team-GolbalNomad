import React, { useState } from "react";
import DaumPostcodeEmbed, { Address } from "react-daum-postcode";
import Input from "@/components/ui/input";
import Dropdown, { DropdownItem } from "@/components/common/Dropdown";
import Button from "@/components/common/Button";
import { useActivityForm } from "@/hooks/use-activity-form";
import ScheduleSection from "./schedule-section";
import ImageUploadSection from "./image-upload-section";

interface ActivityData {
  title?: string;
  category?: string;
  description?: string;
  price?: number;
  address?: string;
}

interface ActivityFormProps {
  mode: "create" | "edit";
  initialData?: ActivityData;
}

const CATEGORY_ITEMS: DropdownItem[] = [
  { id: "culture", label: "문화 · 예술" },
  { id: "food", label: "식음료" },
  { id: "sports", label: "스포츠" },
  { id: "tour", label: "투어" },
  { id: "sightseeing", label: "관광" },
];

export default function ActivityForm({ mode, initialData }: ActivityFormProps) {
  const isEdit = mode === "edit";
  const { state, actions, refs } = useActivityForm();

  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);

  const handleAddressComplete = (data: Address) => {
    actions.setAddress(data.address); 
    setIsPostcodeOpen(false); 
  };

  const INPUT_COMMON_CLASSES =
    "w-full rounded-xl border border-[#E0E0E5] py-3 px-4 outline-none transition focus:border-black placeholder:text-gray-400 shadow-[0_2px_6px_rgba(0,0,0,0.02)]";
  const LABEL_COMMON_CLASSES = "mb-4 text-16 font-bold text-gray-950";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("제출 데이터:", state);
  };

  return (
    <div className="mx-auto w-full max-w-[700px] min-w-[320px] md:min-w-[700px]">
      <form onSubmit={handleSubmit} className="flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              <label className={LABEL_COMMON_CLASSES}>제목</label>
              <span className="text-14 text-gray-400">
                {state.title.length}/50
              </span>
            </div>
            <Input
              placeholder="제목을 입력해 주세요"
              value={state.title}
              onChange={actions.handleTitleChange}
              className={INPUT_COMMON_CLASSES}
            />
          </div>

          <div className="flex flex-col ">
            <label className={LABEL_COMMON_CLASSES} >카테고리</label>
            <Dropdown
              items={CATEGORY_ITEMS}
              selectedItem={state.selectedCategory}
              onSelect={(item) => actions.setSelectedCategory(item)}
              placeholder="카테고리를 선택해 주세요"
            />
          </div>

          <div className="flex flex-col">
            <label className={LABEL_COMMON_CLASSES}>설명</label>
            <textarea
              rows={5}
              placeholder="체험에 대한 설명을 입력해 주세요"
              value={state.description}
              onChange={(e) => actions.setDescription(e.target.value)}
              className={`${INPUT_COMMON_CLASSES} resize-none`}
            />
          </div>

          <Input
            label="가격"
            type="text"
            placeholder="체험 금액을 입력해 주세요"
            value={state.price === 0 ? "0" : state.price ? state.price.toLocaleString() : ""}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              actions.setPrice(val ? Number(val) : null);
            }}
            className={`${INPUT_COMMON_CLASSES} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
            labelClassName={LABEL_COMMON_CLASSES}
          />

          <div className="flex flex-col gap-[10px] relative">
            <label className={LABEL_COMMON_CLASSES}>주소</label>
            <Input
              placeholder="주소를 입력해 주세요"
              value={state.address}
              readOnly
              onClick={() => setIsPostcodeOpen(!isPostcodeOpen)}
              className={`${INPUT_COMMON_CLASSES} cursor-pointer`}
              label=""
            />
            
            {isPostcodeOpen && (
              <div className="absolute top-[100%] left-0 z-50 w-full mt-2 border border-[#E0E0E5] bg-white shadow-xl rounded-xl overflow-hidden">
                <div className="flex justify-end p-2 bg-gray-50 border-b">
                  <button 
                    type="button" 
                    onClick={() => setIsPostcodeOpen(false)}
                    className="text-12 text-gray-500 hover:text-black"
                  >
                    닫기
                  </button>
                </div>
                <DaumPostcodeEmbed onComplete={handleAddressComplete} />
              </div>
            )}
          </div>
        </div>

        <ScheduleSection
          schedules={state.schedules}
          addSchedule={actions.addSchedule}
          removeSchedule={actions.removeSchedule}
          setSchedules={actions.setSchedules}
        />

        <ImageUploadSection
          bannerImg={state.bannerImg}
          introImgs={state.introImgs}
          bannerInputRef={refs.bannerInputRef}
          introInputRef={refs.introInputRef}
          handleBannerChange={actions.handleBannerChange}
          handleIntroChange={actions.handleIntroChange}
          setBannerImg={actions.setBannerImg}
          setIntroImgs={actions.setIntroImgs}
        />

        <div className="mt-10 flex justify-center">
          <Button
            variant={state.isFormValid ? "primary" : "secondary"}
            type="submit"
            disabled={!state.isFormValid}
            className="!w-full max-w-[120px] !h-[56px] !rounded-lg"
          >
            {isEdit ? "수정하기" : "등록하기"}
          </Button>
        </div>
      </form>
    </div>
  );
}