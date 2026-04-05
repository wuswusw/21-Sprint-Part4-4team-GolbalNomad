"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/input";
import Button from "@/components/common/Button";
import AlertModal from "@/components/common/modal/alert-modal";
import { useLogin } from "../hooks/use-login";
import { startKakaoAuth } from "../lib/kakao";
import { clearAuthSession, setAuthSession } from "../lib/auth-storage";
import { loginSchema, type LoginFormValues } from "../schemas/auth.schema";
import type { LoginResponse } from "../types/auth.type";
import { setAuthMessage } from "@/features/auth/lib/auth-message";

function clearAuthStorage() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("nickname");
  localStorage.removeItem("profileImage");
  window.dispatchEvent(new Event("auth-change"));
}

export default function LoginForm() {
  const router = useRouter();
  const { mutate, isPending } = useLogin();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [shouldRedirectToLogin, setShouldRedirectToLogin] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const openModal = (message: string, redirectToLogin = false) => {
    setModalMessage(message);
    setShouldRedirectToLogin(redirectToLogin);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);

    if (shouldRedirectToLogin) {
      clearAuthSession();
      router.push("/auth/login");
    }

    setModalMessage("");
    setShouldRedirectToLogin(false);
  };

  const onSubmit = (values: LoginFormValues) => {
    mutate(values, {
      onSuccess: (data: LoginResponse) => {
          setAuthSession({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            nickname: data.user.nickname,
            profileImage: data.user.profileImageUrl ?? "",
          });

          setAuthMessage("로그인 되었습니다.");
          router.push("/");
        },
      onError: (error: Error) => {
        if (
          error.message === "UNAUTHORIZED" ||
          error.message === "Unauthorized"
        ) {
          openModal("로그인이 만료되었습니다. 다시 로그인해 주세요.", true);
          return;
        }

        openModal(error.message);
      },
    });
  };

  const handleKakaoLogin = async () => {
    try {
      await startKakaoAuth("sign-in");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "카카오 로그인 준비 중 오류가 발생했습니다.";

      if (message === "UNAUTHORIZED" || message === "Unauthorized") {
        openModal("로그인이 만료되었습니다. 다시 로그인해 주세요.", true);
        return;
      }

      openModal(message);
    }
  };

  const isLoginButtonDisabled = !isValid || isPending;

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-[62px] flex w-full flex-col"
      >
        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="mb-[10px] text-16 font-medium text-gray-950"
          >
            이메일
          </label>
          <Input
            id="email"
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
            htmlFor="password"
            className="mb-[10px] text-16 font-medium text-gray-950"
          >
            비밀번호
          </label>
          <Input
            id="password"
            type="password"
            isPassword
            {...register("password")}
            error={errors.password?.message ?? ""}
            placeholder="비밀번호를 입력해 주세요"
            containerClassName="gap-0"
            errorClassName="m-0 mt-[6px] pl-1 text-12 font-medium leading-none text-red-500"
            className={`h-[54px] w-full rounded-2xl bg-white px-5 text-16 font-medium text-gray-950 shadow-[0_6px_6px_rgba(0,0,0,0.02)] placeholder:text-16 placeholder:font-medium placeholder:text-gray-400 ${
              errors.password
                ? "border border-red-500"
                : "border border-gray-100"
            }`}
          />
        </div>

        <Button
          type="submit"
          variant={isLoginButtonDisabled ? "secondary" : "primary"}
          size="full"
          disabled={isLoginButtonDisabled}
          className="mt-[30px] h-[54px] text-16 font-medium"
        >
          {isPending ? "로그인 중..." : "로그인하기"}
        </Button>

        <div className="mt-[30px] flex w-full items-center">
          <div className="h-px flex-1 bg-gray-100" />
          <span className="mx-4 text-16 font-medium text-gray-400">or</span>
          <div className="h-px flex-1 bg-gray-100" />
        </div>

        <Button
          type="button"
          onClick={handleKakaoLogin}
          variant="white"
          size="full"
          leftIcon={
            <Image
              src="/assets/icons/icon_kakao.svg"
              alt="카카오"
              width={18}
              height={18}
            />
          }
          className="mt-[30px] h-[54px] border border-gray-100 text-16 font-medium text-gray-700"
        >
          카카오 로그인
        </Button>

        <p className="mt-[30px] text-center text-16 font-medium text-gray-400">
          회원이 아니신가요?{" "}
          <Link href="/auth/signup" className="underline underline-offset-2">
            회원가입하기
          </Link>
        </p>
      </form>

      {isModalOpen && (
        <AlertModal
          description={modalMessage}
          confirmText="확인"
          onClose={closeModal}
          onConfirm={closeModal}
          size="sm"
        />
      )}
    </>
  );
}