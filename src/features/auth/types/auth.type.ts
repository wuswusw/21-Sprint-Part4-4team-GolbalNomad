export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  nickname: string;
  password: string;
}

export interface OAuthProviderTokenRequest {
  redirectUri: string;
  token: string;
}

export interface OAuthSignUpRequest extends OAuthProviderTokenRequest {
  nickname: string;
}

export interface OAuthAppRequest {
  appKey: string;
  provider: "kakao";
}

export interface OAuthAppResponse {
  createdAt: string;
  updatedAt: string;
  appKey: string;
  provider: "kakao";
  teamId: string;
  id: number;
}

export interface User {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  user: User;
  refreshToken: string;
  accessToken: string;
}

export interface SignupResponse {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface TokenResponse {
  refreshToken: string;
  accessToken: string;
}

export interface AuthErrorResponse {
  message: string;
}

export interface KakaoTokenResponse {
  token_type: string;
  access_token: string;
  expires_in: number;
  refresh_token?: string;
  refresh_token_expires_in?: number;
  scope?: string;
}