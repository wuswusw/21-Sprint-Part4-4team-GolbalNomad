"use client";

import Image from "next/image";
import Link from "next/link";
import Input from "@/components/ui/input";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-start justify-center bg-white px-5 pt-[139px] pb-10">
      <div className="flex w-full max-w-[640px] flex-col items-center">
        <Image
          src="/assets/images/earth.png"
          alt="지구 로고"
          width={144}
          height={144}
          priority
        />

        <Image
          src="/assets/images/login_font.png"
          alt="GlobalNomad 폰트"
          width={255}
          height={31}
          priority
          className="mt-6"
        />

        <form className="mt-[62px] flex w-full flex-col">
          <div className="flex flex-col">
            <label className="mb-[10px] text-16 font-medium text-gray-950">
              이메일
            </label>
            <Input
              type="email"
              placeholder="이메일을 입력해 주세요"
              containerClassName="gap-0"
              className="text-gray-950 h-[54px] w-full rounded-2xl border border-gray-100 bg-white px-5 text-16 font-medium text-gray-400 placeholder:text-16 placeholder:font-medium placeholder:text-gray-400"
            />
          </div>

          <div className="mt-5 flex flex-col">
            <label className="mb-[10px] text-16 font-medium text-gray-950">
              비밀번호
            </label>
            <Input
              type="password"
              isPassword
              placeholder="비밀번호를 입력해 주세요"
              containerClassName="gap-0"
              className="text-gray-950 h-[54px] w-full rounded-2xl border border-gray-100 bg-white px-5 text-16 font-medium text-gray-400 placeholder:text-16 placeholder:font-medium placeholder:text-gray-400"
            />
          </div>

          <button
            type="submit"
            className="mt-[30px] h-[54px] w-full rounded-2xl bg-gray-300 text-16 font-medium text-white"
          >
            로그인하기
          </button>

          <div className="mt-[30px] flex w-full items-center">
            <div className="h-px flex-1 bg-gray-100" />
            <span className="mx-4 text-16 font-medium text-gray-400">or</span>
            <div className="h-px flex-1 bg-gray-100" />
          </div>

          <button
            type="button"
            className="mt-[30px] flex h-[54px] w-full items-center justify-center gap-2 rounded-2xl border border-gray-100 bg-white text-16 font-medium text-gray-700"
          >
            <Image
              src="/assets/icons/icon_kakao.svg"
              alt="카카오"
              width={18}
              height={18}
            />
            카카오 로그인
          </button>

          <p className="mt-[30px] text-center text-16 font-medium text-gray-400">
            회원이 아니신가요?{" "}
            <Link href="/auth/signup" className="underline underline-offset-2">
              회원가입하기
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}