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
import { getApiUrl, parseError } from "@/lib/api-client";

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