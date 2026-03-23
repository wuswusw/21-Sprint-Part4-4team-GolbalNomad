"use client";

import { useState, useRef, useCallback } from "react";
import useOpenOutsideClick from "@/hooks/use-click-outside";

interface ExperienceInfoProps {
    className?: string;
    title?: string;
    category?: string;
    rating?: number;
    address?: string;
    description?: string;
    reviewCount?: number;
}

function ExperienceInfo({ className, title, category, rating, address, description, reviewCount }: ExperienceInfoProps) {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const summary = description?.split('.')[0] + '.';

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
        <p className="tablet:text-body-14 text-13 mb-2">{category}</p>
        <h1 className="tablet:text-24 text-18 font-bold mb-[17px]">{title}</h1>
        <div className="flex justify-start items-center gap-[6px] mb-[10px]">
            <img src="/assets/icons/star.svg" alt="star" className="w-4 h-4" />
            <span className="text-body-14 text-gray-700">{rating}({reviewCount ?? 0})</span>
        </div>
        <div className="flex justify-start gap-[2px] items-center desktop:mb-[17px]">
            <img src="/assets/icons/location.svg" alt="location" className="w-4 h-4" />
            <span className="text-body-14 text-gray-700">{address}</span>
        </div> 
        <p className="text-body-16 text-[#4B4B4B] mb-[30px] hidden desktop:block">{summary}</p>
    </div>
  );
}

export default ExperienceInfo;