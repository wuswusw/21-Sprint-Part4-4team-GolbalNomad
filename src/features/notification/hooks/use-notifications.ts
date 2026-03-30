import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getNotifications, deleteNotifications } from "../api/notifications.api";
import { QUERY_KEYS } from "@/constants/query-keys";
import type { NotificationsResponse } from "../types/notifications.type";

const DEFAULT_SIZE = 10;
const REFETCH_INTERVAL_MS = 30_000;
const STALE_TIME_MS = 25_000;

export function useNotifications() {
    const queryClient = useQueryClient();

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: [QUERY_KEYS.NOTIFICATIONS],
        queryFn: () => getNotifications({ cursorId: null, size: DEFAULT_SIZE }),
        refetchInterval: REFETCH_INTERVAL_MS,
        staleTime: STALE_TIME_MS,
    });

    const deleteNotification = useMutation({
        mutationFn: (notificationId: number) =>
            deleteNotifications({ notificationId }),
        onMutate: async (notificationId: number) => {
            await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.NOTIFICATIONS] });

            const previousData = queryClient.getQueryData<NotificationsResponse>([
                QUERY_KEYS.NOTIFICATIONS,
            ]);

            queryClient.setQueryData<NotificationsResponse>(
                [QUERY_KEYS.NOTIFICATIONS],
                (old) => {
                    if (!old) return old;

                    return {
                        ...old,
                        notifications: old.notifications.filter(
                            (notification) => notification.id !== notificationId
                        ),
                        totalCount: Math.max(0, old.totalCount - 1),
                    };
                }
            );

            return { previousData };
        },
        onError: (error, _notificationId, context) => {
            if (context?.previousData) {
                queryClient.setQueryData(
                    [QUERY_KEYS.NOTIFICATIONS],
                    context.previousData
                );
            }
            console.error("알림 삭제 실패:", error);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.NOTIFICATIONS] });
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
