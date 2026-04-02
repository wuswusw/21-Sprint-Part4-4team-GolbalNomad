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
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <section className="pb-[40px] tablet:pb-[60px] desktop:pb-[60px]">
      <h2
        className="
          text-center font-bold leading-none text-black
          text-[16px]
          tablet:text-[32px]
          desktop:text-[32px]
        "
      >
        무엇을 체험하고 싶으신가요?
      </h2>

      <div
        className="
          mx-auto mt-[36px]
          w-[327px]
          tablet:w-[604px]
          desktop:w-[1040px]
        "
      >
        <Search
          value={keyword}
          onChange={(e) => onChangeKeyword(e.target.value)}
          onSearch={handleSubmit}
          placeholder="내가 원하는 체험은"
          wrapperClassName="w-full"
          iconWrapperClassName="
            left-[20px]
            tablet:left-[28px]
            desktop:left-[34px]
          "
          iconClassName="
            h-5 w-5
            tablet:h-6 tablet:w-6
            desktop:h-6 desktop:w-6
          "
          inputClassName="
            h-[53px] w-full rounded-[20px] border border-gray-200 bg-white
            pl-[52px] pr-[100px]
            text-[14px] font-medium text-black
            placeholder:text-[14px] placeholder:font-medium placeholder:text-gray-400
            tablet:h-[70px] tablet:pl-[60px] tablet:pr-[140px]
            tablet:text-[18px] tablet:placeholder:text-[18px]
            desktop:h-[70px] desktop:pl-[68px] desktop:pr-[144px]
            desktop:text-[18px] desktop:placeholder:text-[18px]
          "
          buttonClassName="
            absolute right-[6px] top-1/2 flex -translate-y-1/2 items-center justify-center
            h-[41px] w-[85px] rounded-[14px] bg-primary-500
            text-[14px] font-bold text-white hover:bg-blue-500
            tablet:right-[10px] tablet:h-[50px] tablet:w-[120px]
            tablet:text-[16px]
            desktop:right-[12px] desktop:h-[50px] desktop:w-[120px]
            desktop:text-[16px]
          "
        />
      </div>
    </section>
  );
}

export default HomeSearch;