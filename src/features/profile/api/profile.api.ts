import type {
  MyProfile,
  UpdateMyProfileRequest,
} from "../types/profile.type";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID;

if (!BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL이 설정되지 않았습니다.");
}

if (!TEAM_ID) {
  throw new Error("NEXT_PUBLIC_TEAM_ID가 설정되지 않았습니다.");
}

function getAccessTokenOrThrow() {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("UNAUTHORIZED");
  }

  return accessToken;
}

export async function getMyProfile(): Promise<MyProfile> {
  const accessToken = getAccessTokenOrThrow();

  const response = await fetch(`${BASE_URL}/${TEAM_ID}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 401) {
    throw new Error("UNAUTHORIZED");
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message ?? "내 정보 조회에 실패했습니다.");
  }

  return response.json();
}

export async function updateMyProfile(
  payload: UpdateMyProfileRequest
): Promise<MyProfile> {
  const accessToken = getAccessTokenOrThrow();

  const response = await fetch(`${BASE_URL}/${TEAM_ID}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(payload),
  });

  if (response.status === 401) {
    throw new Error("UNAUTHORIZED");
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message ?? "내 정보 수정에 실패했습니다.");
  }

  return response.json();
}