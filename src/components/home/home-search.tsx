"use client";

import React from "react";
import Search from "@/components/ui/search";

interface HomeSearchProps {
  keyword: string;
  onChangeKeyword: (value: string) => void;
  onSearch: () => void;
}

function HomeSearch({
  keyword,
  onChangeKeyword,
  onSearch,
}: HomeSearchProps) {
  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <section className="pt-[50px] pb-10 tablet:pb-14">
      <h2 className="text-center text-[32px] font-bold leading-none text-black">
        무엇을 체험하고 싶으신가요?
      </h2>

      <div className="mx-auto mt-[36px] w-[1040px]">
        <Search
          value={keyword}
          onChange={(e) => onChangeKeyword(e.target.value)}
          onSearch={handleSubmit}
          placeholder="내가 원하는 체험은"
          wrapperClassName="w-full"
          iconWrapperClassName="left-[34px]"
          iconClassName="h-6 w-6"
          inputClassName="h-[70px] w-full rounded-[20px] border border-gray-200 bg-white pl-[68px] pr-[144px] text-[18px] font-medium text-black placeholder:text-[18px] placeholder:font-medium placeholder:text-gray-400"
          buttonClassName="absolute right-[12px] top-1/2 flex h-[50px] w-[120px] -translate-y-1/2 items-center justify-center rounded-[14px] bg-primary-500 text-[16px] font-medium text-white hover:bg-blue-500"
        />
      </div>
    </section>
  );
}

export default HomeSearch;