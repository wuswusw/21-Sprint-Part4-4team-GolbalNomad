import {useInfiniteQuery} from "@tanstack/react-query";
import  {getMyActivities}  from "../api/reservations-status.api";
import { MyActivitiesListResponse } from "../types/reservations-status.type";

export function useMyActivities(size: number = 10) {
    return useInfiniteQuery<MyActivitiesListResponse>({
        queryKey: ["myActivities", "list", size],
        queryFn: ({ pageParam }) => getMyActivities({ cursorId: pageParam as number | null, size }),
        initialPageParam: null as number | null,
        getNextPageParam: (lastPage) => lastPage.cursorId ?? undefined,
    })
}