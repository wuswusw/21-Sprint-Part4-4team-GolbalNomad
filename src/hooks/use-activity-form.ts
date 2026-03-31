import { useState, useRef } from "react";
import { DropdownItem } from "@/components/common/Dropdown";

export interface Schedule {
  id: string | number;
  date: string;
  startTime: DropdownItem | null;
  endTime: DropdownItem | null;
}

export function useActivityForm() {
  const [selectedCategory, setSelectedCategory] = useState<DropdownItem | null>(null);
  const [price, setPrice] = useState<number>(0);

  const [schedules, setSchedules] = useState<Schedule[]>([
    { id: String(Number(new Date())), date: "", startTime: null, endTime: null }
  ]);

  const [bannerImg, setBannerImg] = useState<string | null>(null);
  const [introImgs, setIntroImgs] = useState<string[]>([]);

  const bannerInputRef = useRef<HTMLInputElement>(null);
  const introInputRef = useRef<HTMLInputElement>(null);

  const addSchedule = () => {
    setSchedules([...schedules, { 
      id: String(Date.now()), 
      date: "", 
      startTime: null, 
      endTime: null 
    }]);
  };

  const removeSchedule = (id: string | number) => {
    if (schedules.length > 1) {
      setSchedules(schedules.filter(s => s.id !== id));
    }
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (bannerImg?.startsWith("blob:")) URL.revokeObjectURL(bannerImg);
      setBannerImg(URL.createObjectURL(file));
    }
  };

  const handleIntroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (introImgs.length + files.length > 4) {
      alert("이미지는 최대 4장까지 등록 가능합니다.");
      return;
    }
    const newUrls = files.map(file => URL.createObjectURL(file));
    setIntroImgs(prev => [...prev, ...newUrls]);
  };

  return {
    state: { selectedCategory, price, schedules, bannerImg, introImgs }, 
    actions: { 
      setSelectedCategory, setPrice, setSchedules, setBannerImg, setIntroImgs,
      addSchedule, removeSchedule, handleBannerChange, handleIntroChange 
    },
    refs: { bannerInputRef, introInputRef }
  };
}