import Image from "next/image";

interface HomePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PAGE_GROUP_SIZE = 5;

function HomePagination({
  currentPage,
  totalPages,
  onPageChange,
}: HomePaginationProps) {
  if (totalPages < 1) return null;

  const currentGroup = Math.ceil(currentPage / PAGE_GROUP_SIZE);
  const startPage = (currentGroup - 1) * PAGE_GROUP_SIZE + 1;
  const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, totalPages);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  return (
    <div className="mt-10 flex items-center justify-center gap-2">
      <button
        type="button"
        disabled={isPrevDisabled}
        onClick={() => onPageChange(currentPage - 1)}
        className="flex h-10 w-10 items-center justify-center disabled:cursor-not-allowed"
      >
        <Image
          src={
            isPrevDisabled
              ? "/assets/icons/icon_pagination_left_disabled.svg"
              : "/assets/icons/icon_pagination_left_active.svg"
          }
          alt="이전 페이지"
          width={40}
          height={40}
        />
      </button>

      {pages.map((page) => {
        const isActive = currentPage === page;

        return (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={`flex h-10 w-10 items-center justify-center border-b-2 text-[14px] font-bold ${
              isActive
                ? "border-[#3D9EF2] text-[#1F1F22]"
                : "border-transparent text-[#B3B4BC]"
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        type="button"
        disabled={isNextDisabled}
        onClick={() => onPageChange(currentPage + 1)}
        className="flex h-10 w-10 items-center justify-center disabled:cursor-not-allowed"
      >
        <Image
          src={
            isNextDisabled
              ? "/assets/icons/icon_pagination_right_disabled.svg"
              : "/assets/icons/icon_pagination_right_active.svg"
          }
          alt="다음 페이지"
          width={40}
          height={40}
        />
      </button>
    </div>
  );
}

export default HomePagination;