import {
  LoginRequest,
  LoginResponse,
  OAuthAppRequest,
  OAuthAppResponse,
  OAuthProviderTokenRequest,
  OAuthSignUpRequest,
  SignupRequest,
  SignupResponse,
  TokenResponse,
} from "../types/auth.type";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID;

function getApiUrl(path: string) {
  if (!BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL이 설정되지 않았습니다.");
  }

  if (!TEAM_ID) {
    throw new Error("NEXT_PUBLIC_TEAM_ID가 설정되지 않았습니다.");
  }

  const normalizedBaseUrl = BASE_URL.replace(/\/+$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${normalizedBaseUrl}/${TEAM_ID}${normalizedPath}`;
}

async function parseError(response: Response): Promise<never> {
  if (response.status === 401) {
    throw new Error("UNAUTHORIZED");
  }

  let errorMessage = "요청 처리 중 오류가 발생했습니다.";

  try {
    const errorData = await response.json();

    console.log("에러 status:", response.status);
    console.log("에러 raw:", errorData);
    console.log("에러 message:", errorData?.message);
    console.log("에러 전체:", JSON.stringify(errorData, null, 2));

    errorMessage = errorData?.message || errorMessage;
  } catch {
    errorMessage = "서버 오류가 발생했습니다.";
  }

  throw new Error(errorMessage);
}

export async function login(data: LoginRequest): Promise<LoginResponse> {
  const response = await fetch(getApiUrl("/auth/login"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    return parseError(response);
  }

  return response.json();
}

export async function signup(data: SignupRequest): Promise<SignupResponse> {
  const response = await fetch(getApiUrl("/users"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    return parseError(response);
  }

  return response.json();
}

export async function reissueTokens(): Promise<TokenResponse> {
  const response = await fetch(getApiUrl("/auth/tokens"), {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    return parseError(response);
  }

  return response.json();
}

export async function registerOAuthApp(
  data: OAuthAppRequest
): Promise<OAuthAppResponse> {
  const response = await fetch(getApiUrl("/oauth/apps"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    return parseError(response);
  }

  return response.json();
}

export async function kakaoSignIn(
  data: OAuthProviderTokenRequest
): Promise<LoginResponse> {
  const response = await fetch(getApiUrl("/oauth/sign-in/kakao"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    return parseError(response);
  }

  return response.json();
}

export async function kakaoSignUp(
  data: OAuthSignUpRequest
): Promise<LoginResponse> {
  const response = await fetch(getApiUrl("/oauth/sign-up/kakao"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    return parseError(response);
  }

  return response.json();
}