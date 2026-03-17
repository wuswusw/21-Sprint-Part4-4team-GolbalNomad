"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Input from "@/components/ui/input";
import { useLogin } from "../hooks/use-login";
import { startKakaoAuth } from "../lib/kakao";
import { validateEmail, validatePassword } from "../schemas/auth.schema";
import type { LoginResponse } from "../types/auth.type";

export default function LoginForm() {
  const router = useRouter();
  const { mutate, isPending } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleEmailBlur = () => {
    setEmailError(validateEmail(email));
  };

  const handlePasswordBlur = () => {
    setPasswordError(validatePassword(password));
  };

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const nextEmailError = validateEmail(email);
    const nextPasswordError = validatePassword(password);

    setEmailError(nextEmailError);
    setPasswordError(nextPasswordError);

    if (nextEmailError || nextPasswordError) return;

    mutate(
      { email, password },
      {
        onSuccess: (data: LoginResponse) => {
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);
          localStorage.setItem("nickname", data.user.nickname);
          localStorage.setItem("profileImage", data.user.profileImageUrl ?? "");
          window.dispatchEvent(new Event("auth-change"));
          router.push("/");
        },
        onError: (error: Error) => {
          alert(error.message);
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="mt-[62px] flex w-full flex-col">
      <div className="flex flex-col">
        <label htmlFor="email" className="mb-[10px] text-16 font-medium text-gray-950">
          이메일
        </label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={handleEmailBlur}
          error={emailError}
          placeholder="이메일을 입력해 주세요"
          containerClassName="gap-0"
          errorClassName="m-0 mt-[6px] pl-1 text-12 font-medium leading-none text-red-500"
          className={`h-[54px] w-full rounded-2xl bg-white px-5 text-16 font-medium text-gray-950 shadow-[0_6px_6px_rgba(0,0,0,0.02)] placeholder:text-16 placeholder:font-medium placeholder:text-gray-400 ${
            emailError ? "border border-red-500" : "border border-gray-100"
          }`}
        />
      </div>

      <div className="mt-5 flex flex-col">
        <label htmlFor="password" className="mb-[10px] text-16 font-medium text-gray-950">
          비밀번호
        </label>
        <Input
          id="password"
          type="password"
          isPassword
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={handlePasswordBlur}
          error={passwordError}
          placeholder="비밀번호를 입력해 주세요"
          containerClassName="gap-0"
          errorClassName="m-0 mt-[6px] pl-1 text-12 font-medium leading-none text-red-500"
          className={`h-[54px] w-full rounded-2xl bg-white px-5 text-16 font-medium text-gray-950 shadow-[0_6px_6px_rgba(0,0,0,0.02)] placeholder:text-16 placeholder:font-medium placeholder:text-gray-400 ${
            passwordError ? "border border-red-500" : "border border-gray-100"
          }`}
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="mt-[30px] h-[54px] w-full rounded-2xl bg-gray-300 text-16 font-medium text-white disabled:opacity-70"
      >
        {isPending ? "로그인 중..." : "로그인하기"}
      </button>

      <div className="mt-[30px] flex w-full items-center">
        <div className="h-px flex-1 bg-gray-100" />
        <span className="mx-4 text-16 font-medium text-gray-400">or</span>
        <div className="h-px flex-1 bg-gray-100" />
      </div>

      <button
        type="button"
        onClick={() => startKakaoAuth("sign-in")}
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
  );
}