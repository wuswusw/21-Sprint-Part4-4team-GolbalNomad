import React from "react";
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

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    const numericValue = value ? Number(value) : 0;
    
    if (actions.setPrice) {
      actions.setPrice(numericValue);
    }
  };

    const INPUT_COMMON_CLASSES =
      "w-full rounded-xl border border-[#E0E0E5] p-5 outline-none transition focus:border-black placeholder:text-gray-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";
    const LABEL_COMMON_CLASSES = "mb-4 text-16 font-bold text-gray-950";

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log("제출 데이터:", state);
    };

  return (
    <div className="mx-auto w-full max-w-[800px] px-4 py-10">
      <form onSubmit={handleSubmit} className="flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <Input
            label="제목"
            placeholder="제목을 입력해 주세요"
            defaultValue={initialData?.title}
            className={INPUT_COMMON_CLASSES}
            labelClassName={LABEL_COMMON_CLASSES}
          />

          <div className="flex flex-col">
            <label className={LABEL_COMMON_CLASSES}>카테고리</label>
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
              defaultValue={initialData?.description}
              className={`${INPUT_COMMON_CLASSES} resize-none`}
            />
          </div>

          <Input
            label="가격"
            type="text"
            placeholder="체험 금액을 입력해 주세요"
            value={state.price ? state.price.toLocaleString() : ""}
            onChange={handlePriceChange}
            className={INPUT_COMMON_CLASSES}
            labelClassName={LABEL_COMMON_CLASSES}
          />

          <Input
            label="주소"
            placeholder="주소를 입력해 주세요"
            defaultValue={initialData?.address}
            className={INPUT_COMMON_CLASSES}
            labelClassName={LABEL_COMMON_CLASSES}
          />
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
            variant="primary"
            size="md"
            type="submit"
            className="!w-full max-w-[120px] !h-[56px] !rounded-lg"
          >
            {isEdit ? "수정하기" : "등록하기"}
          </Button>
        </div>
      </form>
    </div>
  );
}