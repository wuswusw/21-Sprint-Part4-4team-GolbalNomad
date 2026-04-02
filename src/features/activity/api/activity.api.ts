import type {
  GetActivitiesParams,
  GetActivitiesResponse,
} from "../types/activity.type";



const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID;

const getAccessToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken"); 
  }
  return null;
};

if (!BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL이 설정되지 않았습니다.");
}

if (!TEAM_ID) {
  throw new Error("NEXT_PUBLIC_TEAM_ID가 설정되지 않았습니다.");
}

export interface CreateActivityRequest {
  title: string;
  category: string;
  description: string;
  address: string;
  price: number;
  schedules: {
    date: string;
    startTime: string;
    endTime: string;
  }[];
  bannerImageUrl: string;
  subImageUrls: string[];
}

export interface UpdateActivityRequest {
  title: string;
  category: string;
  description: string;
  address: string;
  price: number;
  bannerImageUrl: string;
  subImageUrlsToAdd: string[]; 
  subImageIdsToRemove: number[]; 
  schedulesToAdd: {
    date: string;
    startTime: string;
    endTime: string;
  }[]; 
  scheduleIdsToRemove: number[];
}

export async function getActivities(
  params: GetActivitiesParams
): Promise<GetActivitiesResponse> {
  const searchParams = new URLSearchParams();

  searchParams.set("method", params.method);

  if (params.cursorId !== undefined) {
    searchParams.set("cursorId", String(params.cursorId));
  }

  if (params.category) {
    searchParams.set("category", params.category);
  }

  if (params.keyword) {
    searchParams.set("keyword", params.keyword);
  }

  if (params.sort) {
    searchParams.set("sort", params.sort);
  }

  if (params.page !== undefined) {
    searchParams.set("page", String(params.page));
  }

  if (params.size !== undefined) {
    searchParams.set("size", String(params.size));
  }

  const response = await fetch(
    `${BASE_URL}/${TEAM_ID}/activities?${searchParams.toString()}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      errorData?.message || "체험 리스트를 불러오는데 실패했습니다."
    );
  }

  return response.json();
}

export async function uploadActivityImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("image", file); 

  const token = getAccessToken();

  const response = await fetch(`${BASE_URL}/${TEAM_ID}/activities/image`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`, 
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "이미지 업로드에 실패했습니다.");
  }

  const data = await response.json();
  return data.activityImageUrl; 
}

export async function createActivity(activityData: CreateActivityRequest): Promise<unknown> {
  const token = getAccessToken();

  const response = await fetch(`${BASE_URL}/${TEAM_ID}/activities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`, 
    },
    body: JSON.stringify(activityData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "체험 등록에 실패했습니다.");
  }

  return response.json();
}

export async function updateActivity(
  activityId: number, 
  activityData: UpdateActivityRequest
): Promise<unknown> {
  const token = getAccessToken();

  const response = await fetch(`${BASE_URL}/${TEAM_ID}/activities/${activityId}`, {
    method: "PATCH", 
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(activityData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "체험 수정에 실패했습니다.");
  }

  return response.json();
}