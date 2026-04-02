import type {
  MyProfile,
  UpdateMyProfileRequest,
  UpdateProfileImageResponse,
} from "../types/profile.type";
import {
  buildAuthHeaders,
  buildAuthHeadersMultipart,
  getApiUrl,
  parseError,
} from "@/lib/api-client";

<<<<<<< HEAD
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
=======
export async function getMyProfile(): Promise<MyProfile> {
  const response = await fetch(getApiUrl("/users/me"), {
>>>>>>> origin/develop
    method: "GET",
    headers: buildAuthHeaders(),
  });

  if (response.status === 401) {
    throw new Error("UNAUTHORIZED");
  }

  if (!response.ok) {
    await parseError(response);
  }

  return response.json();
}

export async function updateMyProfile(
  payload: UpdateMyProfileRequest
): Promise<MyProfile> {
<<<<<<< HEAD
  const accessToken = getAccessTokenOrThrow();

  const response = await fetch(`${BASE_URL}/${TEAM_ID}/users/me`, {
=======
  const response = await fetch(getApiUrl("/users/me"), {
>>>>>>> origin/develop
    method: "PATCH",
    headers: buildAuthHeaders(),
    body: JSON.stringify(payload),
  });

  if (response.status === 401) {
    throw new Error("UNAUTHORIZED");
  }

  if (!response.ok) {
    await parseError(response);
  }

  return response.json();
}

export async function updateProfileImage(
  file: File
): Promise<UpdateProfileImageResponse> {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(getApiUrl("/users/me/image"), {
    method: "POST",
    headers: buildAuthHeadersMultipart(),
    body: formData,
  });

  if (!response.ok) {
    await parseError(response);
  }

  return response.json();
}
