import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getNotifications, deleteNotifications } from "../api/notifications.api";
import { useState } from "react"; // 모의 데이터 상태 관리

const MOCK_NOTIFICATIONS = [
    {
        id: 1,
        title: "함께하면 즐거운 스트릿 댄스",
        content: "승인",
        createdAt: "2026-03-23T17:02:37.054Z",
    },
    {
        id: 2,
        title: "함께하면 즐거운 스트릿 댄스",
        content: "거절",
        createdAt: "2026-03-23T17:02:37.054Z",
    },
    {
        id: 3,
        title: "함께하면 즐거운 스트릿 댄스",
        content: "거절",
        createdAt: "2026-03-23T17:02:37.054Z",
    },
    
]

interface UseNotificationsParams {
    cursorId:number | null;
    size:number | null;
}

export function useNotifications({ cursorId, size }: UseNotificationsParams) {
    const queryClient = useQueryClient();
    
    const [mockList, setMockList] = useState(MOCK_NOTIFICATIONS);

    const  {data, isLoading, isError, refetch} = useQuery({
        queryKey: ["notifications", cursorId, size],
        queryFn: async () => 
            // getNotifications({ cursorId, size }), 실제 API 호출 시 사용
        {
            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve(mockList);
                }, 2000);
            });
            return {
                notifications: mockList,
                totalCount: mockList.length,
                cursorId: null,
            }
        }
        // enabled: !!localStorage.getItem("accessToken"), // 실제 API 호출 시 사용
    })

    const deleteNotification = useMutation({
        mutationFn: async (notificationId: number) =>
            // deleteNotifications({ notificationId }), 실제 API 호출 시 사용
            {
                await new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(true);
                    }, 2000);
                });
            },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
        },
        onError: (error) => {
            console.error("알림 삭제 실패:", error);
            alert("알림 삭제에 실패했습니다.");
        },
    })

    return {
        notifications: data?.notifications ?? [],
        totalCount: data?.totalCount ?? 0,
        isLoading,
        isError,
        refetch,
        deleteNotification: deleteNotification.mutate,
        isDeleting: deleteNotification.isPending,
    }
}