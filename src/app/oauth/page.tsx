"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AlertModal from "@/components/common/modal/alert-modal";
import { kakaoSignIn, kakaoSignUp } from "@/features/auth/api/auth.api";
import { getKakaoRedirectUri } from "@/features/auth/lib/kakao";

declare global {
  interface Window {
    __kakaoOauthLock?: boolean;
    __kakaoProcessedCode?: string | null;
  }
}

export default function KakaoOAuthPage() {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [redirectPath, setRedirectPath] = useState("/auth/login");

  const openErrorModal = (message: string, nextPath = "/auth/login") => {
    setModalMessage(message);
    setRedirectPath(nextPath);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    const nextPath = redirectPath;

    setModalMessage("");
    setRedirectPath("/auth/login");
    router.replace(nextPath);
  };

  useEffect(() => {
    if (window.__kakaoOauthLock) return;
    window.__kakaoOauthLock = true;

    const run = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const error = params.get("error");
      const errorDescription = params.get("error_description");
      const state = params.get("state");

      const mode =
        (state as "sign-in" | "sign-up" | null) ||
        (sessionStorage.getItem("socialAuthMode") as
          | "sign-in"
          | "sign-up"
          | null);

      if (error) {
        openErrorModal(errorDescription || "카카오 인증에 실패했습니다.");
        return;
      }

      if (!code || !mode) {
        openErrorModal("카카오 인증 정보가 올바르지 않습니다.");
        return;
      }

      if (window.__kakaoProcessedCode === code) {
        return;
      }
      window.__kakaoProcessedCode = code;

      window.history.replaceState({}, "", "/oauth");

      const redirectUri = getKakaoRedirectUri();

      if (mode === "sign-in") {
        const data = await kakaoSignIn({
          redirectUri,
          token: code,
        });

        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("nickname", data.user.nickname);
        localStorage.setItem("profileImage", data.user.profileImageUrl ?? "");
        window.dispatchEvent(new Event("auth-change"));

        sessionStorage.removeItem("socialAuthMode");
        sessionStorage.removeItem("socialSignupNickname");
        router.replace("/?authMessage=login");
        return;
      }

      const nickname = sessionStorage.getItem("socialSignupNickname") || "";

      if (!nickname.trim()) {
        openErrorModal(
          "카카오 회원가입용 닉네임 정보가 없습니다.",
          "/auth/signup"
        );
        return;
      }

      const data = await kakaoSignUp({
        nickname,
        redirectUri,
        token: code,
      });

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("nickname", data.user.nickname);
      localStorage.setItem("profileImage", data.user.profileImageUrl ?? "");
      window.dispatchEvent(new Event("auth-change"));

      sessionStorage.removeItem("socialAuthMode");
      sessionStorage.removeItem("socialSignupNickname");
      router.replace("/?authMessage=login");
    };

    run().catch((error: unknown) => {
      const message =
        error instanceof Error
          ? error.message
          : "카카오 로그인 처리 중 오류가 발생했습니다.";
      openErrorModal(message);
    });

    return () => {
      window.__kakaoOauthLock = false;
    };
  }, [router]);

  return (
    <>
      <main className="flex min-h-screen items-center justify-center bg-gray-25">
        <p className="text-16 font-medium text-gray-600">
          카카오 로그인 처리 중...
        </p>
      </main>

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