"use client";

import React, {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  forwardRef,
} from "react";
import Image from "next/image";

type SearchProps = {
  wrapperClassName?: string;
  inputClassName?: string;
  buttonClassName?: string;
  iconWrapperClassName?: string;
  iconClassName?: string;
  buttonText?: string;
  onSearch?: React.SubmitEventHandler<HTMLFormElement>;
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
} & InputHTMLAttributes<HTMLInputElement>;

const Search = forwardRef<HTMLInputElement, SearchProps>(
  (
    {
      wrapperClassName = "",
      inputClassName = "",
      buttonClassName = "",
      iconWrapperClassName = "",
      iconClassName = "",
      buttonText = "검색하기",
      onSearch,
      buttonProps,
      id,
      ...props
    },
    ref
  ) => {
    return (
      <form
        onSubmit={onSearch}
        className={`relative flex items-center ${wrapperClassName}`}
        role="search"
      >
        <div
          className={`pointer-events-none absolute left-0 top-1/2 z-10 -translate-y-1/2 ${iconWrapperClassName}`}
        >
          <Image
            src="/assets/icons/icon_search.svg"
            alt=""
            width={24}
            height={24}
            className={iconClassName}
          />
        </div>

        <input
          ref={ref}
          id={id}
          type="search"
          {...props}
          className={`
            w-full
            outline-none
            transition
            ${inputClassName}
          `}
        />

        <button
          type="submit"
          className={buttonClassName}
          {...buttonProps}
        >
          {buttonText}
        </button>
      </form>
    );
  }
);

Search.displayName = "Search";

export default Search;