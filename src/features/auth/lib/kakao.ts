import { registerOAuthApp } from "@/features/auth/api/auth.api";

const KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

export type SocialAuthMode = "sign-in" | "sign-up";

export function getKakaoRedirectUri() {
  if (!KAKAO_REDIRECT_URI) {
    throw new Error("NEXT_PUBLIC_KAKAO_REDIRECT_URI가 설정되지 않았습니다.");
  }

  return KAKAO_REDIRECT_URI;
}

export async function startKakaoAuth(
  mode: SocialAuthMode,
  nickname?: string
) {
  if (!KAKAO_REST_API_KEY) {
    throw new Error("NEXT_PUBLIC_KAKAO_REST_API_KEY가 설정되지 않았습니다.");
  }

  const redirectUri = getKakaoRedirectUri();

  const app = await registerOAuthApp({
    appKey: KAKAO_REST_API_KEY,
    provider: "kakao",
  });

  console.log("[REGISTER OAUTH APP]", app);
  console.log("[CURRENT ENV APP KEY]", KAKAO_REST_API_KEY);
  console.log("[CURRENT REDIRECT URI]", redirectUri);

  if (app.appKey !== KAKAO_REST_API_KEY) {
    throw new Error("팀에 등록된 카카오 앱키가 현재 env와 다릅니다.");
  }

  sessionStorage.setItem("socialAuthMode", mode);

  if (mode === "sign-up" && nickname) {
    sessionStorage.setItem("socialSignupNickname", nickname);
  } else {
    sessionStorage.removeItem("socialSignupNickname");
  }

  const url = new URL("https://kauth.kakao.com/oauth/authorize");
  url.searchParams.set("client_id", KAKAO_REST_API_KEY);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("state", mode);

  window.location.href = url.toString();
}