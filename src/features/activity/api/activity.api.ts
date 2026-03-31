import type {
  GetActivitiesParams,
  GetActivitiesResponse,
} from "../types/activity.type";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID;

if (!BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL이 설정되지 않았습니다.");
}

if (!TEAM_ID) {
  throw new Error("NEXT_PUBLIC_TEAM_ID가 설정되지 않았습니다.");
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

