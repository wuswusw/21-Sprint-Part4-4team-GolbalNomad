export const experienceQueryKeys = {
  all: ["activities"] as const,
  detail: (activityId: number) =>
    [...experienceQueryKeys.all, activityId] as const,
  availableSchedule: {
    root: (activityId: number) =>
      [...experienceQueryKeys.detail(activityId), "available-schedule"] as const,
    month: (activityId: number, year: string, month: string) =>
      [
        ...experienceQueryKeys.availableSchedule.root(activityId),
        year,
        month,
      ] as const,
  },
  reviews: (activityId: number) =>
    [...experienceQueryKeys.detail(activityId), "reviews"] as const,
};
