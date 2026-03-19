"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/input";
import { useSignup } from "../hooks/use-signup";
import { startKakaoAuth } from "../lib/kakao";
import { signupSchema, type SignupFormValues } from "../schemas/auth.schema";

export default function SignupForm() {
  const router = useRouter();
  const { mutate, isPending } = useSignup();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
  });

  const nickname = useWatch({
    control,
    name: "nickname",
  });

  const onSubmit = ({ email, nickname, password }: SignupFormValues) => {
    mutate(
      { email, nickname, password },
      {
        onSuccess: () => {
          alert("회원가입이 완료되었습니다.");
          router.push("/auth/login");
        },
        onError: (error: Error) => {
          alert(error.message);
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-[62px] flex w-full flex-col">
      <div className="flex flex-col">
        <label
          htmlFor="signup-email"
          className="mb-[10px] text-16 font-medium text-gray-950"
        >
          이메일
        </label>
        <Input
          id="signup-email"
          type="email"
          {...register("email")}
          error={errors.email?.message ?? ""}
          placeholder="이메일을 입력해 주세요"
          containerClassName="gap-0"
          errorClassName="m-0 mt-[6px] pl-1 text-12 font-medium leading-none text-red-500"
          className={`h-[54px] w-full rounded-2xl bg-white px-5 text-16 font-medium text-gray-950 shadow-[0_6px_6px_rgba(0,0,0,0.02)] placeholder:text-16 placeholder:font-medium placeholder:text-gray-400 ${
            errors.email ? "border border-red-500" : "border border-gray-100"
          }`}
        />
      </div>

      <div className="mt-5 flex flex-col">
        <label
          htmlFor="signup-nickname"
          className="mb-[10px] text-16 font-medium text-gray-950"
        >
          닉네임
        </label>
        <Input
          id="signup-nickname"
          type="text"
          {...register("nickname")}
          error={errors.nickname?.message ?? ""}
          placeholder="닉네임을 입력해 주세요"
          containerClassName="gap-0"
          errorClassName="m-0 mt-[6px] pl-1 text-12 font-medium leading-none text-red-500"
          className={`h-[54px] w-full rounded-2xl bg-white px-5 text-16 font-medium text-gray-950 shadow-[0_6px_6px_rgba(0,0,0,0.02)] placeholder:text-16 placeholder:font-medium placeholder:text-gray-400 ${
            errors.nickname ? "border border-red-500" : "border border-gray-100"
          }`}
        />
      </div>

      <div className="mt-5 flex flex-col">
        <label
          htmlFor="signup-password"
          className="mb-[10px] text-16 font-medium text-gray-950"
        >
          비밀번호
        </label>
        <Input
          id="signup-password"
          type="password"
          isPassword
          {...register("password")}
          error={errors.password?.message ?? ""}
          placeholder="8자 이상 입력해 주세요"
          containerClassName="gap-0"
          errorClassName="m-0 mt-[6px] pl-1 text-12 font-medium leading-none text-red-500"
          className={`h-[54px] w-full rounded-2xl bg-white px-5 text-16 font-medium text-gray-950 shadow-[0_6px_6px_rgba(0,0,0,0.02)] placeholder:text-16 placeholder:font-medium placeholder:text-gray-400 ${
            errors.password ? "border border-red-500" : "border border-gray-100"
          }`}
        />
      </div>

      <div className="mt-5 flex flex-col">
        <label
          htmlFor="signup-password-confirm"
          className="mb-[10px] text-16 font-medium text-gray-950"
        >
          비밀번호 확인
        </label>
        <Input
          id="signup-password-confirm"
          type="password"
          isPassword
          {...register("passwordConfirm")}
          error={errors.passwordConfirm?.message ?? ""}
          placeholder="비밀번호를 한 번 더 입력해 주세요"
          containerClassName="gap-0"
          errorClassName="m-0 mt-[6px] pl-1 text-12 font-medium leading-none text-red-500"
          className={`h-[54px] w-full rounded-2xl bg-white px-5 text-16 font-medium text-gray-950 shadow-[0_6px_6px_rgba(0,0,0,0.02)] placeholder:text-16 placeholder:font-medium placeholder:text-gray-400 ${
            errors.passwordConfirm ? "border border-red-500" : "border border-gray-100"
          }`}
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="mt-[30px] h-[54px] w-full rounded-2xl bg-gray-300 text-16 font-medium text-white disabled:opacity-70"
      >
        {isPending ? "회원가입 중..." : "회원가입하기"}
      </button>

      <div className="mt-[30px] flex w-full items-center">
        <div className="h-px flex-1 bg-gray-100" />
        <span className="mx-4 shrink-0 text-16 font-medium text-gray-500">
          SNS 계정으로 회원가입하기
        </span>
        <div className="h-px flex-1 bg-gray-100" />
      </div>

      <button
        type="button"
        onClick={() => {
          if (!nickname?.trim()) {
            alert("카카오 회원가입 전에 닉네임을 입력해 주세요.");
            return;
          }

          startKakaoAuth("sign-up", nickname);
        }}
        className="mt-[30px] flex h-[54px] w-full items-center justify-center gap-2 rounded-2xl border border-gray-100 bg-white text-16 font-medium text-gray-700 shadow-[0_6px_6px_rgba(0,0,0,0.02)]"
      >
        <Image
          src="/assets/icons/icon_kakao.svg"
          alt="카카오"
          width={18}
          height={18}
        />
        카카오 회원가입
      </button>

      <p className="mt-[30px] text-center text-16 font-medium text-gray-400">
        회원이신가요?{" "}
        <Link href="/auth/login" className="underline underline-offset-2">
          로그인하기
        </Link>
      </p>
    </form>
  );
}