"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useModal } from "@/hooks/use-modal";
import { createReservation } from "../api/experience-detail.api";
import type { CreateReservationRequest } from "../types/experience-detail.type";

export function useCreateReservation(activityId: number) {
  const queryClient = useQueryClient();
  const { openModal } = useModal();

  return useMutation({
    mutationFn: (body: CreateReservationRequest) =>
      createReservation(activityId, body),
    onSuccess: (data) => {
      openModal("alert", {
        description: `예약이 완료되었습니다.`,
        confirmText: "확인",
      });
      queryClient.invalidateQueries({ queryKey: ["my-reservations"] });
      queryClient.invalidateQueries({
        queryKey: ["activities", activityId, "available-schedule"],
      });
    },
    onError: (error, variables) => {
      openModal("alert", {
        description: "예약에 실패했습니다.",
        confirmText: "확인",
      });
      console.error("에러 발생 상세:", error);
      console.log("실패한 예약 시도 데이터:", variables);
    },
  });
}
