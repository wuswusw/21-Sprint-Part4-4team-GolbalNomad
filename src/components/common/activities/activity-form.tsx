import Script from "next/script";
import React, { useState } from "react";
import DaumPostcodeEmbed, { Address } from "react-daum-postcode";
import Input from "@/components/ui/input";
import Dropdown, { DropdownItem } from "@/components/common/Dropdown";
import Button from "@/components/common/Button";
import { useActivityForm } from "@/hooks/use-activity-form";
import ScheduleSection from "./schedule-section";
import ImageUploadSection from "./image-upload-section";
import { uploadActivityImage, createActivity, CreateActivityRequest } from "@/features/activity/api/activity.api";
import { useRouter } from "next/navigation"; 
import BaseModal from "@/components/common/modal/base-modal";

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
  const router = useRouter();
  const isEdit = mode === "edit";
  const { state, actions, refs } = useActivityForm();

  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'alert' | 'confirm';
    message: string;
    onConfirm?: () => void;
  }>({
    isOpen: false,
    type: 'alert',
    message: '',
  });

  const closeModal = () => setModalState((prev) => ({ ...prev, isOpen: false }));

  const handleAddressComplete = (data: Address) => {
    actions.setAddress(data.address); 
    setIsPostcodeOpen(false); 
  };

  const handleCancel = () => {
    setModalState({
      isOpen: true,
      type: 'confirm',
      message: isEdit 
        ? "수정사항이 저장되지 않았습니다.\n정말 취소하시겠습니까?" 
        : "저장되지 않았습니다.\n정말 뒤로 가시겠습니까?",
      onConfirm: () => router.back(),
    });
  };

  const INPUT_COMMON_CLASSES =
    "w-full rounded-xl border border-[#E0E0E5] py-3 px-4 outline-none transition focus:border-black placeholder:text-gray-400 shadow-[0_2px_6px_rgba(0,0,0,0.02)]";
  const LABEL_COMMON_CLASSES = "mb-4 text-16 font-bold text-gray-950";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.isFormValid) return;

    try {
      let bannerImageUrl = "";
      if (state.bannerImg?.file) {
        bannerImageUrl = await uploadActivityImage(state.bannerImg.file);
      }

      const subImageUrls = await Promise.all(
        state.introImgs.map((img) => uploadActivityImage(img.file))
      );

      const finalData: CreateActivityRequest = {
        title: state.title,
        category: state.selectedCategory?.label || "", 
        description: state.description,
        address: state.address,
        price: Number(state.price),
        schedules: state.schedules.map((s) => ({
          date: s.date,
          startTime: s.startTime?.label || "", 
          endTime: s.endTime?.label || "",
        })),
        bannerImageUrl: bannerImageUrl,
        subImageUrls: subImageUrls,
      };

      if (isEdit) {
        // await updateActivity(finalData); 
      } else {
        await createActivity(finalData);
      }

      setModalState({
        isOpen: true,
        type: 'alert',
        message: isEdit ? "수정이 완료되었습니다." : "체험 등록이 완료되었습니다.",
        onConfirm: () => router.push("/"), 
      });

    } catch (error: unknown) {
      console.error("에러 발생:", error);
      
      let errorMessage = isEdit ? "수정에 실패했습니다." : "등록에 실패했습니다.";
      const axiosError = error as { response?: { status: number } };
      
      const statusCode = axiosError.response?.status;


      if (statusCode === 400) {
        errorMessage = "입력 데이터가 올바르지 않습니다.\n항목을 다시 확인해 주세요.";
      } else if (statusCode === 401) {
        errorMessage = "로그인 세션이 만료되었습니다.\n다시 로그인해 주세요.";
      } else if (statusCode === 409) {
        errorMessage = "이미 등록된 정보와 중복됩니다.\n(예: 동일 시간대 존재)";
      }

      setModalState({
        isOpen: true,
        type: 'alert',
        message: errorMessage,
        onConfirm: closeModal,
      });
    }
  };

  return (
    <div className="mx-auto w-full max-w-[700px] min-w-[320px] md:min-w-[700px]">
      <Script
        src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        strategy="afterInteractive"
        onLoad={() => setIsScriptLoaded(true)}
      />

      <form onSubmit={handleSubmit} className="flex flex-col gap-10 pb-20">
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
              onClick={() => isScriptLoaded && setIsPostcodeOpen(!isPostcodeOpen)}
              className={`${INPUT_COMMON_CLASSES} cursor-pointer`}
              label=""
            />
            {isScriptLoaded && isPostcodeOpen && (
              <div className="absolute top-[100%] left-0 z-50 w-full mt-2 border border-[#E0E0E5] bg-white shadow-xl rounded-xl overflow-hidden">
                <div className="flex justify-end p-2 bg-gray-50 border-b">
                  <button type="button" onClick={() => setIsPostcodeOpen(false)} className="text-12 text-gray-500 hover:text-black">닫기</button>
                </div>
                <DaumPostcodeEmbed onComplete={handleAddressComplete} />
              </div>
            )}
          </div>
        </div>

        <ScheduleSection
          schedules={state.schedules}
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

        <div className="mt-10 flex justify-center gap-4">
          <Button
            type="button"
            variant="secondary"
            onClick={handleCancel}
            className="!w-full max-w-[120px] !h-[56px] !rounded-lg !text-black !border-black"
          >
            취소
          </Button>
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

      {modalState.isOpen && (
        <BaseModal
          onClose={closeModal}
          onConfirm={modalState.onConfirm}
          confirmText={modalState.type === 'confirm' ? "네" : "확인"}
          cancelText={modalState.type === 'confirm' ? "아니오" : undefined}
          size="sm"
        >
          <div className="flex flex-col items-center justify-center text-center gap-4 py-4">
            {modalState.type === 'confirm' && (
              <div className="w-[80px] h-[80px] bg-[#FF8E8E] rounded-full flex items-center justify-center text-white text-[40px] font-bold mb-2">
                !
              </div>
            )}
            <p className="whitespace-pre-line text-18 font-medium text-black">
              {modalState.message}
            </p>
          </div>
        </BaseModal>
      )}
    </div>
  );
}