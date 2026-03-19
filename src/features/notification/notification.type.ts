export interface Notifications {
    id: number;
    teamId: string;
    userId: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

export interface NotificationsResponse {
    cursor: number | null;
    notifications: Notifications[];
    totalCount: number;
}