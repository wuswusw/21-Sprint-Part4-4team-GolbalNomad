import React from "react";
import Image from "next/image";

// 1. 이미지 객체 타입 정의 (훅의 상태와 일치시킴)
interface ImageFile {
  preview: string;
  file: File;
}

// 소개 이미지는 삭제 등을 위해 id가 포함된 구조
interface IntroImageFile extends ImageFile {
  id: string;
}

interface ImageUploadSectionProps {
  // string | null -> ImageFile | null 로 변경
  bannerImg: ImageFile | null; 
  // string[] -> IntroImageFile[] 로 변경
  introImgs: IntroImageFile[]; 
  bannerInputRef: React.RefObject<HTMLInputElement | null>; 
  introInputRef: React.RefObject<HTMLInputElement | null>;
  handleBannerChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleIntroChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // 함수 타입들도 변경된 상태 구조에 맞게 수정
  setBannerImg: (img: ImageFile | null) => void;
  setIntroImgs: React.Dispatch<React.SetStateAction<IntroImageFile[]>>;
}

export default function ImageUploadSection({
  bannerImg,
  introImgs,
  bannerInputRef,
  introInputRef,
  handleBannerChange,
  handleIntroChange,
  setBannerImg,
  setIntroImgs
}: ImageUploadSectionProps) {
  
  const LABEL_COMMON_CLASSES = "mb-4 text-16 font-bold text-gray-950";
  
  const UPLOAD_BOX_CLASSES = `
    h-[128px] w-[128px] cursor-pointer rounded-2xl 
    border border-[#E0E0E5] 
    flex flex-col items-center justify-center 
    bg-transparent hover:bg-gray-50 transition-all
  `;

  const PREVIEW_CONTAINER_CLASSES = `
    relative h-[128px] w-[128px] rounded-2xl 
    group overflow-hidden flex-shrink-0
  `;

  const DELETE_BTN_CLASSES = `
    absolute top-2 right-2 
    w-8 h-8 rounded-full 
    bg-black/70 text-white 
    flex items-center justify-center 
    opacity-0 group-hover:opacity-100 transition 
    hover:bg-black/90 z-10
  `;

  return (
    <div className="flex flex-col gap-10">
      {/* 배너 이미지 섹션 */}
      <div className="flex flex-col">
        <label className={LABEL_COMMON_CLASSES}>배너 이미지 등록</label>
        <div className="flex flex-wrap gap-4 items-center">
          {!bannerImg && (
            <div onClick={() => bannerInputRef.current?.click()} className={UPLOAD_BOX_CLASSES}>
              <Image src="/assets/icons/editButton.svg" alt="Upload" width={32} height={32} />
              <p className="mt-2 text-14 text-[#787486]">이미지 등록</p>
            </div>
          )}
          <input type="file" ref={bannerInputRef} onChange={handleBannerChange} accept="image/*" className="hidden" />

          {bannerImg && (
            <div className={PREVIEW_CONTAINER_CLASSES}>
              {/* bannerImg.preview를 사용합니다 */}
              <Image 
                src={bannerImg.preview} 
                alt="Banner" 
                fill 
                className="object-cover rounded-2xl" 
              />
              <button
                type="button"
                onClick={() => setBannerImg(null)}
                className={DELETE_BTN_CLASSES}
              >
                <span className="text-xl leading-none">✕</span> 
              </button>
            </div>
          )}  
        </div>
      </div>

      {/* 소개 이미지 섹션 */}
      <div className="flex flex-col">
        <label className={LABEL_COMMON_CLASSES}>소개 이미지 등록</label>
        <div className="flex flex-wrap gap-4">
          <div onClick={() => introInputRef.current?.click()} className={UPLOAD_BOX_CLASSES}>
            <Image src="/assets/icons/editButton.svg" alt="Add" width={32} height={32} />
            <p className="mt-2 text-14 text-[#787486]">{introImgs.length}/4</p>
          </div>
          <input type="file" ref={introInputRef} onChange={handleIntroChange} accept="image/*" multiple className="hidden" />

          {introImgs.map((img, idx) => (
            <div key={img.id || idx} className={PREVIEW_CONTAINER_CLASSES}>
              {/* img.preview를 사용합니다 */}
              <Image 
                src={img.preview} 
                alt={`Intro ${idx}`} 
                fill 
                className="object-cover rounded-2xl" 
              />
              <button
                type="button"
                onClick={() => setIntroImgs(prev => prev.filter((_, i) => i !== idx))}
                className={DELETE_BTN_CLASSES}
              >
                <span className="text-xl leading-none">✕</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}