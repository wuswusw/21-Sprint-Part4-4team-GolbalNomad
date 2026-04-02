import {
    useInfiniteQuery,
    useMutation,
    useQueryClient,
    type InfiniteData,
} from "@tanstack/react-query";
import { getNotifications, deleteNotifications } from "../api/notifications.api";
import { QUERY_KEYS } from "@/constants/query-keys";
import type { NotificationsResponse } from "../types/notifications.type";

const PAGE_SIZE = 5;
const REFETCH_INTERVAL_MS = 30_000;
const STALE_TIME_MS = 25_000;

export function useNotifications() {
    const queryClient = useQueryClient();

    const {
        data,
        isPending,
        isError,
        refetch,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: [QUERY_KEYS.NOTIFICATIONS],
        queryFn: ({ pageParam }) =>
            getNotifications({
                cursorId: pageParam,
                size: PAGE_SIZE,
            }),
        initialPageParam: null as number | null,
        getNextPageParam: (lastPage) =>
            lastPage.cursorId === null ? undefined : lastPage.cursorId,
        refetchInterval: REFETCH_INTERVAL_MS,
        staleTime: STALE_TIME_MS,
    });

    const notifications =
        data?.pages.flatMap((page) => page.notifications) ?? [];
    const totalCount = data?.pages[0]?.totalCount ?? 0;

    const deleteNotification = useMutation({
        mutationFn: (notificationId: number) =>
            deleteNotifications({ notificationId }),
        onMutate: async (notificationId: number) => {
            await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.NOTIFICATIONS] });

            const previousData = queryClient.getQueryData<
                InfiniteData<NotificationsResponse>
            >([QUERY_KEYS.NOTIFICATIONS]);

            queryClient.setQueryData<InfiniteData<NotificationsResponse>>(
                [QUERY_KEYS.NOTIFICATIONS],
                (old) => {
                    if (!old) return old;

                    return {
                        pageParams: old.pageParams,
                        pages: old.pages.map((page) => ({
                            ...page,
                            notifications: page.notifications.filter(
                                (n) => n.id !== notificationId
                            ),
                            totalCount: Math.max(0, page.totalCount - 1),
                        })),
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
        notifications,
        totalCount,
        isLoading: isPending,
        isError,
        refetch,
        fetchNextPage,
        hasNextPage: Boolean(hasNextPage),
        isFetchingNextPage,
        deleteNotification: deleteNotification.mutate,
        isDeleting: deleteNotification.isPending,
    };
}
