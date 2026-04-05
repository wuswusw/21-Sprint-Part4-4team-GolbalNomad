const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const NICKNAME_KEY = "nickname";
const PROFILE_IMAGE_KEY = "profileImage";

function isBrowser() {
  return typeof window !== "undefined";
}

/**
 * 브라우저 저장소를 임시 세션 저장소처럼 사용합니다.
 *
 * 컴포넌트나 API 레이어에서 localStorage를 직접 접근하지 않도록
 * 이 파일을 단일 진입점으로 사용합니다.
 */
export function getAccessToken(): string | null {
  if (!isBrowser()) return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  if (!isBrowser()) return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function getStoredNickname(): string {
  if (!isBrowser()) return "";
  return localStorage.getItem(NICKNAME_KEY) ?? "";
}

export function getStoredProfileImage(): string {
  if (!isBrowser()) return "";
  return localStorage.getItem(PROFILE_IMAGE_KEY) ?? "";
}

export function setAuthSession(params: {
  accessToken: string;
  refreshToken: string;
  nickname: string;
  profileImage: string;
}) {
  if (!isBrowser()) return;

  localStorage.setItem(ACCESS_TOKEN_KEY, params.accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, params.refreshToken);
  localStorage.setItem(NICKNAME_KEY, params.nickname);
  localStorage.setItem(PROFILE_IMAGE_KEY, params.profileImage);

  window.dispatchEvent(new Event("auth-change"));
}

export function clearAuthSession() {
  if (!isBrowser()) return;

  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(NICKNAME_KEY);
  localStorage.removeItem(PROFILE_IMAGE_KEY);

  window.dispatchEvent(new Event("auth-change"));
}

export function updateStoredUser(params: {
  nickname?: string;
  profileImage?: string;
}) {
  if (!isBrowser()) return;

  if (typeof params.nickname === "string") {
    localStorage.setItem(NICKNAME_KEY, params.nickname);
  }

  if (typeof params.profileImage === "string") {
    localStorage.setItem(PROFILE_IMAGE_KEY, params.profileImage);
  }

  window.dispatchEvent(new Event("auth-change"));
}