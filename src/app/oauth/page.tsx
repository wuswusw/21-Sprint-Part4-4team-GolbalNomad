"use client";

export const dynamic = "force-dynamic";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { kakaoSignIn, kakaoSignUp } from "@/features/auth/api/auth.api";
import { getKakaoRedirectUri } from "@/features/auth/lib/kakao";

function KakaoOAuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const run = async () => {
      const code = searchParams.get("code");
      const error = searchParams.get("error");
      const errorDescription = searchParams.get("error_description");
      const state = searchParams.get("state");
      const mode =
        (state as "sign-in" | "sign-up" | null) ||
        (sessionStorage.getItem("socialAuthMode") as
          | "sign-in"
          | "sign-up"
          | null);

      if (error) {
        alert(errorDescription || "카카오 인증에 실패했습니다.");
        router.replace("/auth/login");
        return;
      }

      if (!code || !mode) {
        alert("카카오 인증 정보가 올바르지 않습니다.");
        router.replace("/auth/login");
        return;
      }

      const tokenResponse = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      const tokenData = await tokenResponse.json();

      if (!tokenResponse.ok || !tokenData.accessToken) {
        alert(tokenData.message || "카카오 토큰 발급에 실패했습니다.");
        router.replace("/auth/login");
        return;
      }

      const redirectUri = getKakaoRedirectUri();

      if (mode === "sign-in") {
        const data = await kakaoSignIn({
          redirectUri,
          token: tokenData.accessToken,
        });

        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        sessionStorage.removeItem("socialAuthMode");
        sessionStorage.removeItem("socialSignupNickname");
        router.replace("/");
        return;
      }

      const nickname = sessionStorage.getItem("socialSignupNickname") || "";

      if (!nickname.trim()) {
        alert("카카오 회원가입용 닉네임 정보가 없습니다.");
        router.replace("/auth/signup");
        return;
      }

      const data = await kakaoSignUp({
        nickname,
        redirectUri,
        token: tokenData.accessToken,
      });

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      sessionStorage.removeItem("socialAuthMode");
      sessionStorage.removeItem("socialSignupNickname");
      router.replace("/");
    };

    run().catch((err: unknown) => {
      const message =
        err instanceof Error ? err.message : "카카오 로그인 처리 중 오류가 발생했습니다.";
      alert(message);
      router.replace("/auth/login");
    });
  }, [router, searchParams]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-25">
      <p className="text-16 font-medium text-gray-600">카카오 로그인 처리 중...</p>
    </main>
  );
}

export default function KakaoOAuthPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <KakaoOAuthContent />
    </Suspense>
  );
}