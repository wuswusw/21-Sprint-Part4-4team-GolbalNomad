import { NextRequest, NextResponse } from "next/server";
import type { KakaoTokenResponse } from "@/features/auth/types/auth.type";

const KAKAO_REST_API_KEY = process.env.KAKAO_REST_API_KEY;
const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json(
        { message: "인가 코드가 없습니다." },
        { status: 400 }
      );
    }

    if (!KAKAO_REST_API_KEY || !KAKAO_REDIRECT_URI) {
      return NextResponse.json(
        { message: "카카오 환경변수가 설정되지 않았습니다." },
        { status: 500 }
      );
    }

    const body = new URLSearchParams();
    body.set("grant_type", "authorization_code");
    body.set("client_id", KAKAO_REST_API_KEY);
    body.set("redirect_uri", KAKAO_REDIRECT_URI);
    body.set("code", code);

    const response = await fetch("https://kauth.kakao.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      body: body.toString(),
      cache: "no-store",
    });

    const data = (await response.json()) as
      | KakaoTokenResponse
      | { error_description?: string };

    if (!response.ok || !("access_token" in data)) {
      return NextResponse.json(
        {
          message:
            ("error_description" in data && data.error_description) ||
            "카카오 토큰 발급에 실패했습니다.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({ accessToken: data.access_token });
  } catch {
    return NextResponse.json(
      { message: "카카오 토큰 교환 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}