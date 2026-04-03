import { getAccessToken } from "@/features/auth/lib/auth-storage";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID;

export function getApiUrl(path: string) {
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

export async function parseError(response: Response): Promise<never> {
  if (response.status === 401) {
    throw new Error("UNAUTHORIZED");
  }

  let errorMessage = "요청 처리 중 오류가 발생했습니다.";

  try {
    const errorData = await response.json();
    errorMessage = errorData?.message || errorMessage;
  } catch {
    errorMessage = "서버 오류가 발생했습니다.";
  }

  throw new Error(errorMessage);
}

export function buildAuthHeaders() {
  const accessToken = getAccessToken();

  if (!accessToken) {
    throw new Error("UNAUTHORIZED");
  }

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
}

export function buildAuthHeadersMultipart() {
  const accessToken = getAccessToken();

  if (!accessToken) {
    throw new Error("UNAUTHORIZED");
  }

  return {
    Authorization: `Bearer ${accessToken}`,
  };
}