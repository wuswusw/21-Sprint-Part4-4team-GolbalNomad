interface Notifications {
    id:number;
    teamId:string;
    userId:number;
    content:string;
    createdAt:string;
    updatedAt:string;
    deletedAt:string;
};

interface NotificationsResponse {
    cursorId:number | null;
    notifications:Notifications[];
    totalCount:number;
}

export type { Notifications, NotificationsResponse };