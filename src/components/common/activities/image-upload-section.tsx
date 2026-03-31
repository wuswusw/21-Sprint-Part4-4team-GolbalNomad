import React from "react";
import Image from "next/image";

interface ImageUploadSectionProps {
  bannerImg: string | null;
  introImgs: string[];
  bannerInputRef: React.RefObject<HTMLInputElement | null>; 
  introInputRef: React.RefObject<HTMLInputElement | null>;
  handleBannerChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleIntroChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setBannerImg: (img: string | null) => void;
  setIntroImgs: React.Dispatch<React.SetStateAction<string[]>>;
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
    h-40 w-40 cursor-pointer rounded-2xl 
    border border-[#E0E0E5] 
    flex flex-col items-center justify-center 
    bg-transparent hover:bg-gray-50 transition-all
  `;

  const PREVIEW_CONTAINER_CLASSES = `
    relative h-40 w-40 rounded-2xl 
    group overflow-hidden flex-shrink-0
    shadow-[0_2px_10px_rgba(0,0,0,0.05)]
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
      <div className="flex flex-col gap-6">
        <label className={LABEL_COMMON_CLASSES}>배너 이미지</label>
        <div className="flex flex-wrap gap-4 items-center">
          {!bannerImg && (
            <div onClick={() => bannerInputRef.current?.click()} className={UPLOAD_BOX_CLASSES}>
              <Image src="/assets/icons/editButton.svg" alt="Upload" width={48} height={48} />
              <p className="mt-2 text-14 text-[#787486]">이미지 등록</p>
            </div>
          )}
          <input type="file" ref={bannerInputRef} onChange={handleBannerChange} accept="image/*" className="hidden" />

          {bannerImg && (
            <div className={PREVIEW_CONTAINER_CLASSES}>
              <Image 
                src={bannerImg} 
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

      <div className="flex flex-col gap-6">
        <label className={LABEL_COMMON_CLASSES}>소개 이미지</label>
        <div className="flex flex-wrap gap-4">
          <div onClick={() => introInputRef.current?.click()} className={UPLOAD_BOX_CLASSES}>
            <Image src="/assets/icons/editButton.svg" alt="Add" width={48} height={48} />
            <p className="mt-2 text-14 text-[#787486]">{introImgs.length}/4</p>
          </div>
          <input type="file" ref={introInputRef} onChange={handleIntroChange} accept="image/*" multiple className="hidden" />

          {introImgs.map((url, idx) => (
            <div key={idx} className={PREVIEW_CONTAINER_CLASSES}>
              <Image 
                src={url} 
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