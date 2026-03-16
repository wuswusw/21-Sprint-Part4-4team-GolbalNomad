"use client";

import Input from "@/components/ui/input";
import Search from "@/components/ui/search";

const labelStyle =
  "text-[24px] font-semibold leading-[32px] text-[#1F2937]";

const inputBaseStyle =
  "h-[58px] w-full rounded-[18px] border border-[#D9D9D9] bg-white px-8 text-[24px] font-medium leading-[32px] text-[#1F2937] placeholder:text-[24px] placeholder:font-medium placeholder:leading-[32px] placeholder:text-[#9CA3AF]";

const inputErrorStyle =
  "h-[58px] w-full rounded-[18px] border border-[#FF4D4F] bg-white px-8 text-[24px] font-medium leading-[32px] text-[#1F2937] placeholder:text-[24px] placeholder:font-medium placeholder:leading-[32px] placeholder:text-[#9CA3AF]";

const errorTextStyle =
  "pl-1 text-[14px] font-medium leading-[20px] text-[#FF4D4F]";

export default function TestPage() {
  return (
    <main className="min-h-screen bg-[#F5F5F5] px-[56px] py-[40px]">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-[72px]">
        {/* Input 테스트 */}
        <section className="flex flex-col gap-[48px]">
          <h1 className="text-[32px] font-bold text-black">Input Test</h1>

          {/* 로그인 기본 */}
          <section className="flex max-w-[820px] flex-col gap-[28px] bg-[#F5F5F5]">
            <Input
              label="이메일"
              placeholder="이메일을 입력해 주세요"
              containerClassName="flex flex-col gap-3"
              labelClassName={labelStyle}
              className={inputBaseStyle}
            />

            <Input
              label="비밀번호"
              placeholder="비밀번호를 입력해 주세요"
              isPassword
              containerClassName="flex flex-col gap-3"
              labelClassName={labelStyle}
              className={inputBaseStyle}
            />
          </section>

          {/* 로그인 에러 */}
          <section className="flex max-w-[820px] flex-col gap-[28px] bg-[#F5F5F5]">
            <Input
              label="이메일"
              value="codeit!codeir.c"
              readOnly
              error="이메일 형식으로 작성해 주세요."
              containerClassName="flex flex-col gap-3"
              labelClassName={labelStyle}
              className={inputErrorStyle}
              errorClassName={errorTextStyle}
            />

            <Input
              label="비밀번호"
              value="*****"
              readOnly
              isPassword
              error="8자 이상 입력해 주세요."
              containerClassName="flex flex-col gap-3"
              labelClassName={labelStyle}
              className={inputErrorStyle}
              errorClassName={errorTextStyle}
            />
          </section>

          {/* 회원가입 기본 */}
          <section className="flex max-w-[820px] flex-col gap-[28px] bg-[#F5F5F5]">
            <Input
              label="이메일"
              placeholder="이메일을 입력해 주세요"
              containerClassName="flex flex-col gap-3"
              labelClassName={labelStyle}
              className={inputBaseStyle}
            />

            <Input
              label="닉네임"
              placeholder="닉네임을 입력해주세요"
              containerClassName="flex flex-col gap-3"
              labelClassName={labelStyle}
              className={inputBaseStyle}
            />

            <Input
              label="비밀번호"
              placeholder="8자 이상 입력해 주세요"
              containerClassName="flex flex-col gap-3"
              labelClassName={labelStyle}
              className={inputBaseStyle}
            />

            <Input
              label="비밀번호 확인"
              placeholder="비밀번호를 한 번 더 입력해 주세요"
              isPassword
              containerClassName="flex flex-col gap-3"
              labelClassName={labelStyle}
              className={inputBaseStyle}
            />
          </section>

          {/* 회원가입 에러 */}
          <section className="flex max-w-[820px] flex-col gap-[28px] bg-[#F5F5F5]">
            <Input
              label="이메일"
              value="codeit@codeit.co"
              readOnly
              error="잘못된 이메일입니다."
              containerClassName="flex flex-col gap-3"
              labelClassName={labelStyle}
              className={inputErrorStyle}
              errorClassName={errorTextStyle}
            />

            <Input
              label="닉네임"
              value="코드잇닉네임너무길어요"
              readOnly
              error="열 자 이하로 작성해주세요."
              containerClassName="flex flex-col gap-3"
              labelClassName={labelStyle}
              className={inputErrorStyle}
              errorClassName={errorTextStyle}
            />

            <Input
              label="비밀번호"
              value="******"
              readOnly
              error="8자 이상 입력해 주세요."
              containerClassName="flex flex-col gap-3"
              labelClassName={labelStyle}
              className={inputErrorStyle}
              errorClassName={errorTextStyle}
            />

            <Input
              label="비밀번호 확인"
              value="****"
              readOnly
              isPassword
              error="비밀번호가 일치하지 않습니다."
              containerClassName="flex flex-col gap-3"
              labelClassName={labelStyle}
              className={inputErrorStyle}
              errorClassName={errorTextStyle}
            />
          </section>
        </section>

        {/* Search 테스트 */}
        <section className="flex flex-col gap-[48px]">
          <h1 className="text-[32px] font-bold text-black">Search Test</h1>

          {/* 샘플 */}
          <section className="flex max-w-[720px] flex-col items-center gap-[20px]">
            <h3 className="text-center text-[28px] font-bold leading-[36px] text-[#1F2937]">
              무엇을 체험하고 싶으신가요?
            </h3>

            <Search
              placeholder="내가 원하는 체험은"
              wrapperClassName="h-[54px] w-full rounded-[18px] border border-transparent bg-white pl-[52px] pr-[8px]"
              inputClassName="h-full w-full bg-transparent text-[18px] font-medium leading-[24px] text-[#1F2937] placeholder:text-[18px] placeholder:font-medium placeholder:leading-[24px] placeholder:text-[#9CA3AF]"
              buttonClassName="h-[42px] min-w-[110px] rounded-[14px] bg-[#409EFF] px-6 text-[16px] font-semibold leading-[22px] text-white"
              iconWrapperClassName="left-[18px]"
              iconClassName="h-[22px] w-[22px]"
            />
          </section>

          {/* 포커스 샘플 */}
          <section className="flex max-w-[720px] flex-col items-center gap-[20px]">
            <h3 className="text-center text-[28px] font-bold leading-[36px] text-[#1F2937]">
              무엇을 체험하고 싶으신가요?
            </h3>

            <Search
              value=""
              placeholder=""
              wrapperClassName="h-[54px] w-full rounded-[18px] border border-[#409EFF] bg-white pl-[52px] pr-[8px] shadow-[0_0_0_2px_rgba(64,158,255,0.15)]"
              inputClassName="h-full w-full bg-transparent text-[18px] font-medium leading-[24px] text-[#1F2937]"
              buttonClassName="h-[42px] min-w-[110px] rounded-[14px] bg-[#409EFF] px-6 text-[16px] font-semibold leading-[22px] text-white"
              iconWrapperClassName="left-[18px]"
              iconClassName="h-[22px] w-[22px]"
            />
          </section>
        </section>
      </div>
    </main>
  );
}