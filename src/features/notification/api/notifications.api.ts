import { NotificationsResponse } from "../types/notifications.type";

interface GetNotificationsParams {
    cursorId:number | null;
    size:number;
}

interface DeleteNotificationsParams {
    notificationId: number;
}

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
  
  function buildAuthHeaders(): HeadersInit {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
  
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }
  
    return headers;
  }

export async function getNotifications ({cursorId, size = 10}: GetNotificationsParams): Promise<NotificationsResponse> {
    const queryParams = new URLSearchParams();
    if (cursorId) queryParams.set("cursorId", cursorId.toString());
    if (size) queryParams.set("size", size.toString());

    const response = await fetch(getApiUrl(`/my-notifications?${queryParams.toString()}`), {
        method: "GET",
        headers: buildAuthHeaders(),
    });
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || "알림을 불러오는데 실패했습니다.";
    
        if (response.status === 400) {
          throw new Error(errorMessage || "cursorId는 숫자로 입력해주세요.");
        }
    
        if (response.status === 401) {
          throw new Error(errorMessage || "Unauthorized");
        }
        throw new Error(errorMessage);
      }
    
      return response.json();
}

export async function deleteNotifications ({notificationId}: DeleteNotificationsParams): Promise<void> {
    const response = await fetch(getApiUrl(`/my-notifications/${notificationId}`), {
        method: "DELETE",
        headers: buildAuthHeaders(),
    });
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || "알림 삭제에 실패했습니다.";
  
        switch (response.status) {
          case 401:
            throw new Error("인증되지 않은 사용자입니다. 다시 로그인해주세요.");
          case 403:
            throw new Error("본인의 알림만 삭제할 수 있습니다.");
          case 404:
            throw new Error("존재하지 않는 알림입니다.");
          default:
            throw new Error(errorMessage);
        }
    } return;
}
