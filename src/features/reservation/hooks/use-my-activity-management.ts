import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import * as reservationsStatusApi from "../api/reservations-status.api";
import {ReservationStatus} from "../types/reservations-status.type";

export function useMyActivityManagement(activityId: number) {
    const queryClient = useQueryClient();

    const useMonthlySchedule = (year: string, month: string) =>
        useQuery({
        queryKey: ["myActivities", activityId, "dashboard", year, month],
        queryFn: () => reservationsStatusApi.getReservationMonthlySchedule({ activityId, year, month }),
        enabled: !!activityId,
        });

    const useDailySchedule = (date: string) =>
        useQuery({
        queryKey: ["myActivities", activityId, "reserved-schedule", date],
        queryFn: () => reservationsStatusApi.getReservationDailySchedule({ activityId, date }),
        enabled: !!activityId && !!date,
        });

    const useActivityReservations = (scheduleId: number, status: ReservationStatus) =>
        useQuery({
        queryKey: ["myActivities", activityId, "reservations", scheduleId, status],
        queryFn: () => reservationsStatusApi.getActivityReservations({ activityId, scheduleId, status }),
        enabled: !!activityId && !!scheduleId,
        });

    const updateStatusMutation = useMutation({
        mutationFn: ({ reservationId, status }: { reservationId: number; status: "confirmed" | "declined" }) =>
        reservationsStatusApi.updateReservationStatus({ activityId, reservationId, status }),
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["myActivities", activityId] });
        alert("상태가 성공적으로 변경되었습니다.");
        },
        onError: (error: Error) => {
        alert(error.message);
        },
    });

    return {
        useMonthlySchedule,
        useDailySchedule,
        useActivityReservations,
        updateStatus: updateStatusMutation.mutate,
        isUpdating: updateStatusMutation.isPending,
    };
}