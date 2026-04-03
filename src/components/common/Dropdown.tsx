"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export interface DropdownItem {
  id: string | number;
  label: string;
}

interface DropdownProps {
  items: DropdownItem[];
  selectedItem?: DropdownItem | null;
  onSelect: (item: DropdownItem) => void;
  placeholder?: string;
  type?: "filter" | "input";
}

export default function Dropdown({
  items,
  selectedItem,
  onSelect,
  placeholder = "선택해 주세요",
  type = "input",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isInputType = type === "input";

  const triggerClasses = isInputType
    ? "flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-3 text-16 text-gray-900 focus:border-primary-500"
    : "flex cursor-pointer items-center gap-1 text-16 font-medium text-gray-900";

  const menuClasses = isInputType
    ? "absolute left-0 z-50 mt-2 w-full min-w-[120px] overflow-hidden rounded-lg bg-white ring-1 ring-black ring-opacity-5"
    : "absolute right-0 z-50 mt-2 min-w-[120px] overflow-hidden rounded-lg bg-white ring-1 ring-black ring-opacity-5";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={`relative ${isInputType ? "w-full" : "inline-block"}`}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={triggerClasses}
      >
        <span className={!selectedItem && isInputType ? "text-gray-400" : ""}>
          {selectedItem ? selectedItem.label : placeholder}
        </span>
        <Image
          src="/assets/icons/arrow_down.svg"
          alt="화살표"
          width={24}
          height={24}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className={menuClasses}>
          <div className="py-1">
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onSelect(item);
                  setIsOpen(false);
                }}
                className="block w-full whitespace-nowrap px-4 py-3 text-left text-14 text-gray-700 hover:bg-gray-100"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}