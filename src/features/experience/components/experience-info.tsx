"use client";

import { useState, useRef, useCallback } from "react";
import useOpenOutsideClick from "@/hooks/use-click-outside";

interface ExperienceInfoProps {
    className?: string;
}

function ExperienceInfo({ className }: ExperienceInfoProps) {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const closeDropdown = useCallback(() => { setIsOpen(false); }, []);
    useOpenOutsideClick(ref, closeDropdown, isOpen);

    const handleKebabClick = () => {
        setIsOpen(prev => !prev);
    }

  return (
    <div className={`relative desktop:mb-[38px] ${className ?? ""}`}>
        <div ref={ref}>
            <button className="absolute top-0 right-0" onClick={handleKebabClick}>
                <img src="/assets/icons/kebab.svg" alt="kebab" className="w-6 h-6" />
            </button>
            {isOpen && (
                <div className="w-[95px] absolute top-0 right-5 flex flex-col bg-white ring ring-[#dfdfdf] rounded-lg overflow-hidden">
                    <button className="text-16 text-gray-950 hover:bg-primary-100 py-[18px]">수정하기</button>
                    <button className="text-16 text-gray-950 hover:bg-primary-100 py-[18px]">삭제하기</button>            
                </div>
            )}
        </div>
        <p className="tablet:text-body-14 text-13 mb-2">문화 · 예술</p>
        <h1 className="tablet:text-24 text-18 font-bold mb-[17px]">함께 배우면 즐거운 스트릿 댄스</h1>
        <div className="flex justify-start items-center gap-[6px] mb-[10px]">
            <img src="/assets/icons/star.svg" alt="star" className="w-4 h-4" />
            <span className="text-body-14 text-gray-700">4.9(293)</span>
        </div>
        <div className="flex justify-start gap-[2px] items-center desktop:mb-[17px]">
            <img src="/assets/icons/location.svg" alt="location" className="w-4 h-4" />
            <span className="text-body-14 text-gray-700">서울 중구 청계천로 100 10F</span>
        </div> 
        <p className="text-body-16 text-[#4B4B4B] mb-[30px] hidden desktop:block">초보자부터 전문가까지 춤추는 즐거움을 함께 느껴보세요.</p>
    </div>
  );
}

export default ExperienceInfo;