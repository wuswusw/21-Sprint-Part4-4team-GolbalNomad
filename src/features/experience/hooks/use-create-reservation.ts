import { useMutation, useQueryClient } from "@tanstack/react-query";
import {createReservation} from "../api/experience-detail.api"

export function useCreateReservation(activityId: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async(body: {scheduleId: number, headCount: number}) => {
            return createReservation(activityId, body)},
            onSuccess:(data) => {
                alert(`예약이 완료되었습니다. 예약번호: ${data.id}`);
                queryClient.invalidateQueries({ queryKey: ["my-reservations"] });
                queryClient.invalidateQueries({ queryKey: ["activities", activityId, "available-schedule"] });
            },
            onError:(error, variables) => {
                alert("예약에 실패했습니다.");
                console.error("에러 발생 상세:", error);
                console.log("실패한 예약 시도 데이터:", variables); // 테스트용
            },
    })
}