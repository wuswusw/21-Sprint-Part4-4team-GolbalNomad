import { NotificationsResponse } from "../types/notifications.type";

interface GetNotificationsParams {
    cursorId:number | null;
    size:number | null;
}

interface DeleteNotificationsParams {
    teatId:string;
    notificationId:number;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID;

function getApiUrl(path: string) {
    if (!BASE_URL || !TEAM_ID) {
      throw new Error("환경 변수(API_BASE_URL 또는 TEAM_ID)가 설정되지 않았습니다.");
    }
    const normalizedBaseUrl = BASE_URL.replace(/\/+$/, "");
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    
    return `${normalizedBaseUrl}/${TEAM_ID}${normalizedPath}`;
  }
  const getAuthHeaders = () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
    return {
      "Content-Type": "application/json",
      ...(token ? { "Authorization": `Bearer ${token}` } : {}),
    };
  };

const getNotifications = async ({cursorId, size = 10}: GetNotificationsParams): Promise<NotificationsResponse> => {
    const queryParams = new URLSearchParams();
    if (cursorId) queryParams.set("cursorId", cursorId.toString());
    if (size) queryParams.set("size", size.toString());

    const response = await fetch(getApiUrl(`/notifications?${queryParams.toString()}`), {
        method: "GET",
        headers: getAuthHeaders(),
    });
    if (!response.ok) {
        throw new Error("알림을 불러오는 데 실패했습니다.");
    }
    return await response.json();
}

const deleteNotifications = async ({notificationId}: DeleteNotificationsParams): Promise<void> => {
    const response = await fetch(getApiUrl(`/notifications/${notificationId}`), {
        method: "DELETE",
        headers: getAuthHeaders(),
    });
    if (!response.ok) {
        throw new Error("알림을 삭제하는 데 실패했습니다.");
    }
    return;
}

export { getNotifications, deleteNotifications };