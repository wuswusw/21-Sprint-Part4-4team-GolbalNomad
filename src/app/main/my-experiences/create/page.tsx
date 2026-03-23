"use client";

import { useState } from "react";
import Dropdown, { DropdownItem } from "@/components/common/Dropdown";

export default function TestPage() {
  // 1. 메인 페이지용 (가격 필터) 상태
  const priceItems = [
    { id: "low", label: "낮은 가격순" },
    { id: "high", label: "높은 가격순" },
  ];
  // 2. 등록 페이지용 (카테고리) 상태
  const categoryItems = [
    { id: "culture", label: "문화·예술" },
    { id: "food", label: "식음료" },
    { id: "travel", label: "투어" },
  ];

  const [selectedPrice, setSelectedPrice] = useState<DropdownItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<DropdownItem | null>(null);

  return (
    <div className="p-20 flex flex-col gap-20 bg-gray-50 min-h-screen">
      
      {/* A. 메인 페이지 스타일 테스트 */}
      <section>
        <h2 className="text-20 font-bold mb-4">1. 메인 페이지 필터 타입</h2>
        <div className="p-6 rounded-lg w-fit">
          <Dropdown
            items={priceItems}
            selectedItem={selectedPrice}
            onSelect={(item) => setSelectedPrice(item)}
            type="filter"
            placeholder="가격"
          />
        </div>
      </section>

      {/* B. 등록 페이지 스타일 테스트 */}
      <section>
        <h2 className="text-20 font-bold mb-4">2. 등록/수정 페이지 인풋 타입</h2>
        <div className="bg-white p-6 rounded-lg shadow-sm max-w-sm">
          <label className="block mb-2 font-medium">카테고리 선택</label>
          <Dropdown
            items={categoryItems}
            selectedItem={selectedCategory}
            onSelect={(item) => setSelectedCategory(item)}
            type="input"
            placeholder="카테고리를 선택해 주세요"
          />
        </div>
      </section>

    </div>
  );
}