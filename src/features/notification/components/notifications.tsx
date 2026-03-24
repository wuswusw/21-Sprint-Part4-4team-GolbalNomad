"use client";

import Image from "next/image";
import { useNotifications } from "../hooks/use-notifications";

const LOCATION_STYLE = "fixed left-1/2 -translate-x-1/2 tablet:translate-x-0  tablet:left-auto top-13 tablet:absolute tablet:top-9 tablet:right-0 z-50 bg-white"


interface NotificationsProps {
    onClose: () => void;
}

function Notifications({ onClose }: NotificationsProps) {
    const { notifications, isLoading, isError, refetch, deleteNotification, isDeleting } = useNotifications({ cursorId: null, size: 10 });
    return (
        <div className={`${LOCATION_STYLE} flex flex-col tablet:w-[231px] w-[327px] shadow-[0px_2px_8px_0px_#78748640] rounded-[10px] pb-2`}>
            <div className="flex justify-between items-center px-5 py-[18.5px] border-b border-gray-100">
                <h1 className="text-16 font-bold">알림 6개</h1>
                <button type="button" onClick={onClose} aria-label="알림 닫기">
                    <Image src="/assets/icons/delete.svg" alt="close" width={24} height={24} />
                </button>
            </div>
            {isLoading && <p className="p-5 text-center text-14 text-gray-400">불러오는 중...</p>}
            <div className="max-h-[400px] overflow-y-auto">
                {notifications.length === 0 && !isLoading ? (
                    <p>새로운 알림이 없습니다.</p>
                ) : (notifications.map((notification) => (
                        <div key={notification.id} className="flex flex-col gap-2 px-5 py-4 text-gray-950">
                            <div className="flex justify-between items-center">
                                <span className="text-14 font-bold">예약 {notification.content}</span>
                                <span className="text-12 text-gray-400">1분 전</span>
                            </div>
                            <div className="flex flex-col gap-2 text-14 text-gray-500">
                                <p>{notification.title}</p>
                                <p>{notification.createdAt}</p>
                                <p>예약이 <span className={notification.content === "승인" ? "text-primary-500" : "text-[#FF2727]"}>{notification.content}</span>되었어요.</p>
                            </div>
                        </div>
                )))}
            </div>
        </div>
    )
}

export default Notifications;