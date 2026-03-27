import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getNotifications, deleteNotifications } from "../api/notifications.api";
import { QUERY_KEYS } from "@/constants/query-keys";

const DEFAULT_SIZE = 10;

export function useNotifications() {
    const queryClient = useQueryClient();

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: [QUERY_KEYS.NOTIFICATIONS],
        queryFn: () => getNotifications({ cursorId: null, size: DEFAULT_SIZE }),
    });

    const deleteNotification = useMutation({
        mutationFn: (notificationId: number) =>
            deleteNotifications({ notificationId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.NOTIFICATIONS] });
        },
        onError: (error) => {
            console.error("알림 삭제 실패:", error);
        },
    });

    return {
        notifications: data?.notifications ?? [],
        totalCount: data?.totalCount ?? 0,
        isLoading,
        isError,
        refetch,
        deleteNotification: deleteNotification.mutate,
        isDeleting: deleteNotification.isPending,
    };
}
