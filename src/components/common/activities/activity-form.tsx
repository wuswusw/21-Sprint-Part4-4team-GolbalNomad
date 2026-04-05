import Script from 'next/script';
import React, { useState, useEffect } from 'react';
import DaumPostcodeEmbed, { Address } from 'react-daum-postcode';
import Input from '@/components/ui/input';
import Dropdown, { DropdownItem } from '@/components/common/Dropdown';
import Button from '@/components/common/Button';
import { useActivityForm } from '@/hooks/use-activity-form';
import ScheduleSection from './schedule-section';
import ImageUploadSection from './image-upload-section';
import {
  uploadActivityImage,
  createActivity,
  updateActivity,
  CreateActivityRequest,
  UpdateActivityRequest,
  getActivity,
} from '@/features/activity/api/activity.api';
import { useRouter } from 'next/navigation';
import BaseModal from '@/components/common/modal/base-modal';
import { CATEGORY_ITEMS } from '@/constants/category';

interface ActivityData {
  id: number;
  title: string;
  category: string;
  description: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  subImages: { id: number; imageUrl: string }[];
  schedules: { id: number; date: string; startTime: string; endTime: string }[];
}

interface ActivityFormProps {
  mode: 'create' | 'edit';
  initialData?: ActivityData | null;
  activityId?: number;
}

export default function ActivityForm({ mode, initialData, activityId }: ActivityFormProps) {
  const router = useRouter();
  const isEdit = mode === 'edit';
  const { state, actions, refs } = useActivityForm();

  const [originData, setOriginData] = useState<ActivityData | null>(null);

  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
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

  useEffect(() => {
    const { daum } = window as any;

    if (daum && daum.Postcode) {
      setIsScriptLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    script.onload = () => {
      setIsScriptLoaded(true);
    };
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (mode === 'edit' && activityId && !isDataLoaded) {
      const loadActivityData = async () => {
        try {
          const data = await getActivity(activityId);
          if (!data) return;

          setOriginData(data);

          actions.setTitle(data.title);
          actions.setDescription(data.description);
          actions.setPrice(data.price);
          actions.setAddress(data.address);

          const category = CATEGORY_ITEMS.find((item) => item.label === data.category);
          if (category) actions.setSelectedCategory(category);

          if (data.bannerImageUrl) {
            actions.setBannerImg({
              preview: data.bannerImageUrl,
              imageUrl: data.bannerImageUrl,
              file: null,
            } as any);
          }

          if (data.subImages) {
            actions.setIntroImgs(
              data.subImages.map((img: any) => ({
                id: img.id,
                preview: img.imageUrl,
                imageUrl: img.imageUrl,
                file: null,
              })) as any,
            );
          }

          if (data.schedules) {
            actions.setSchedules(
              data.schedules.map((s: any) => ({
                id: s.id,
                date: s.date,
                startTime: { label: s.startTime, value: s.startTime },
                endTime: { label: s.endTime, value: s.endTime },
              })) as any,
            );
          }

          setIsDataLoaded(true);
        } catch (error) {
          console.error('데이터 로드 실패:', error);
        }
      };
      loadActivityData();
    }
  }, [mode, activityId, actions, isDataLoaded]);

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
        ? '수정사항이 저장되지 않았습니다.\n정말 취소하시겠습니까?'
        : '저장되지 않았습니다.\n정말 뒤로 가시겠습니까?',
      onConfirm: () => router.back(),
    });
  };

  const INPUT_COMMON_CLASSES =
    'w-full rounded-xl border border-[#E0E0E5] py-3 px-4 outline-none transition focus:border-black placeholder:text-gray-400 shadow-[0_2px_6px_rgba(0,0,0,0.02)]';
  const LABEL_COMMON_CLASSES = 'mb-4 text-16 font-bold text-gray-950';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.isFormValid) return;

    try {
      const extractLabel = (val: any): string => {
        if (val && typeof val === 'object' && 'label' in val) return String(val.label);
        return typeof val === 'string' ? val : '';
      };

      let bannerImageUrl = (state.bannerImg as any)?.imageUrl || '';
      if (state.bannerImg?.file) {
        bannerImageUrl = await uploadActivityImage(state.bannerImg.file);
      }

      if (isEdit && activityId) {
        const subImageUrlsToAdd = await Promise.all(
          state.introImgs
            .filter((img: any) => img.file !== null)
            .map((img: any) => uploadActivityImage(img.file)),
        );

        const initialSubImages = originData?.subImages || [];
        const currentSubImgIds = state.introImgs.map((img: any) => img.id).filter((id) => id);
        const subImageIdsToRemove = initialSubImages
          .map((img) => img.id)
          .filter((id) => !currentSubImgIds.includes(id));

        const schedulesToAdd = state.schedules
          .filter((s: any) => typeof s.id === 'string')
          .map((s: any) => ({
            date: s.date,
            startTime: extractLabel(s.startTime),
            endTime: extractLabel(s.endTime),
          }));

        const initialScheduleIds = originData?.schedules.map((s: any) => s.id) || [];
        const currentScheduleIds = state.schedules.map((s: any) => s.id).filter((id: any) => !!id);
        const scheduleIdsToRemove = initialScheduleIds.filter(
          (id: number) => !currentScheduleIds.includes(id),
        );

        const updateData: UpdateActivityRequest = {
          title: state.title,
          category: state.selectedCategory?.label || '',
          description: state.description,
          address: state.address,
          price: Number(state.price),
          bannerImageUrl,
          subImageUrlsToAdd,
          subImageIdsToRemove,
          schedulesToAdd,
          scheduleIdsToRemove,
        };

        await updateActivity(Number(activityId), updateData);

        setModalState({
          isOpen: true,
          type: 'alert',
          message: '수정이 완료되었습니다.',
          onConfirm: () => router.push(`/main/experiences/${activityId}`),
        });
      } else {
        const subImageUrls = await Promise.all(
          state.introImgs
            .filter((img: any) => img.file)
            .map((img: any) => uploadActivityImage(img.file)),
        );

        const createData: CreateActivityRequest = {
          title: state.title,
          category: state.selectedCategory?.label || '',
          description: state.description,
          address: state.address,
          price: Number(state.price),
          schedules: state.schedules.map((s: any) => ({
            date: s.date,
            startTime: extractLabel(s.startTime),
            endTime: extractLabel(s.endTime),
          })),
          bannerImageUrl,
          subImageUrls: subImageUrls.filter((url) => !!url),
        };

        const response = (await createActivity(createData)) as any;
        const newId = response.id;

        setModalState({
          isOpen: true,
          type: 'alert',
          message: '체험 등록이 완료되었습니다.',
          onConfirm: () => router.push(`/main/experiences/${newId}`),
        });
      }
    } catch (error: any) {
      console.error('에러 발생:', error);
      let errorMessage = isEdit ? '수정에 실패했습니다.' : '등록에 실패했습니다.';

      const statusCode = error.response?.status;

      if (statusCode === 400) errorMessage = '입력 데이터가 올바르지 않습니다.';
      else if (statusCode === 401) errorMessage = '로그인 세션이 만료되었습니다.';
      else if (statusCode === 409)
        errorMessage = '이미 등록된 정보와 중복됩니다.\n(예: 동일 시간대 존재)';
      else if (error.message?.includes('시간대')) errorMessage = error.message;

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
      <form onSubmit={handleSubmit} className="flex flex-col gap-10 pb-20">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <label className={LABEL_COMMON_CLASSES}>제목</label>
              <span className="text-14 text-gray-400">{state.title.length}/50</span>
            </div>
            <Input
              placeholder="제목을 입력해 주세요"
              value={state.title}
              onChange={actions.handleTitleChange}
              className={INPUT_COMMON_CLASSES}
            />
          </div>
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
              value={state.description}
              onChange={(e) => actions.setDescription(e.target.value)}
              className={`${INPUT_COMMON_CLASSES} resize-none`}
            />
          </div>
          <Input
            label="가격"
            type="text"
            placeholder="체험 금액을 입력해 주세요"
            value={state.price === 0 ? '0' : state.price ? state.price.toLocaleString() : ''}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, '');
              actions.setPrice(val ? Number(val) : null);
            }}
            className={`${INPUT_COMMON_CLASSES} [appearance:textfield]`}
            labelClassName={LABEL_COMMON_CLASSES}
          />
          <div className="relative flex flex-col gap-[10px]">
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
              <div className="absolute top-[100%] left-0 z-50 mt-2 w-full overflow-hidden rounded-xl border border-[#E0E0E5] bg-white shadow-xl">
                <div className="flex justify-end border-b bg-gray-50 p-2">
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
          setBannerImg={actions.setBannerImg as any}
          setIntroImgs={actions.setIntroImgs as any}
        />

        <div className="mt-10 flex justify-center">
          <Button
            variant={state.isFormValid ? 'primary' : 'secondary'}
            type="submit"
            disabled={!state.isFormValid}
            className="!text-16 !h-[42px] !w-[120px] !rounded-lg !font-bold"
          >
            {isEdit ? '수정하기' : '등록하기'}
          </Button>
        </div>
      </form>

      {modalState.isOpen && (
        <BaseModal
          onConfirm={modalState.onConfirm}
          confirmText={modalState.type === 'confirm' ? '네' : '확인'}
          cancelText={modalState.type === 'confirm' ? '아니오' : undefined}
          size="sm"
        >
          <div className="flex flex-col items-center justify-center gap-4 py-4 text-center">
            <p className="text-18 font-medium whitespace-pre-line text-black">
              {modalState.message}
            </p>
          </div>
        </BaseModal>
      )}
    </div>
  );
}
