"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { getRelativeTime } from "@/lib/utils";
import type { Notifications as NotificationType } from "../types/notifications.type";

function splitNotificationContent(content: string): {
    title: string;
    dateLine: string;
    body: string;
} | null {
    const open = content.indexOf("(");
    if (open === -1) return null;
    const close = content.indexOf(")", open);
    if (close === -1) return null;
    const title = content.slice(0, open).trim();
    const dateLine = content.slice(open, close + 1).trim();
    const body = content.slice(close + 1).trim();
    return { title, dateLine, body };
}

function colorNotificationContent(content: string) {
    const colorWords = content.split(/(승인|거절)/);
    return colorWords.map((colorWord, index) => {
        if (colorWord === "승인") {
            return (
                <span key={index} className="text-primary-500">
                    {colorWord}
                </span>
            );
        }
        if (colorWord === "거절") {
            return (
                <span key={index} className="text-red-500">
                    {colorWord}
                </span>
            );
        }
        return (
            <span key={index}>
                {colorWord}
            </span>
        );
    });
}

function NotificationContent({ content }: { content: string }) {
    const entireContent = splitNotificationContent(content);
    if (!entireContent) {
        return <div>{colorNotificationContent(content)}</div>;
    }
    return (
        <div className="flex flex-col gap-1">
            {entireContent.title ? <span>{entireContent.title}</span> : null}
            <span className="text-gray-600">{entireContent.dateLine}</span>
            <span>{colorNotificationContent(entireContent.body)}</span>
        </div>
    );
}

const LOCATION_STYLE =
    "fixed left-1/2 -translate-x-1/2 tablet:translate-x-0 tablet:left-auto top-13 tablet:absolute tablet:top-9 tablet:right-0 z-50 bg-white";

interface NotificationsProps {
    onClose: () => void;
    lastReadAt: string | null;
    notifications: NotificationType[];
    totalCount: number;
    isLoading: boolean;
    onDelete: (id: number) => void;
    fetchNextPage: () => void;
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
}

function NotificationItem({
    notification,
    isNew,
    onDelete,
}: {
    notification: NotificationType;
    isNew: boolean;
    onDelete: (id: number) => void;
}) {
    return (
        <div
            className={`relative flex flex-col gap-1 px-5 py-4 ${isNew ? "bg-primary-100" : ""}`}
        >
            <div className="flex items-start gap-2">
                {isNew && (
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary-500" />
                )}
                <p className="flex-1 text-14 leading-relaxed text-gray-950">
                    <NotificationContent content={notification.content} />
                </p>
                <button
                    type="button"
                    onClick={() => onDelete(notification.id)}
                    className="shrink-0 p-0.5"
                    aria-label="알림 삭제"
                >
                    <Image
                        src="/assets/icons/delete.svg"
                        alt="삭제"
                        width={16}
                        height={16}
                    />
                </button>
            </div>
            <span className="self-end text-12 text-gray-400">
                {getRelativeTime(notification.createdAt)}
            </span>
        </div>
    );
}

function Notifications({
    onClose,
    lastReadAt,
    notifications,
    totalCount,
    isLoading,
    onDelete,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
}: NotificationsProps) {
    const scrollRootRef = useRef<HTMLDivElement>(null);
    const sentinelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const root = scrollRootRef.current;
        const sentinel = sentinelRef.current;
        if (!root || !sentinel) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const hit = entries[0]?.isIntersecting;
                if (hit && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            { root, rootMargin: "120px", threshold: 0 }
        );

        observer.observe(sentinel);
        return () => observer.disconnect();
    }, [fetchNextPage, hasNextPage, isFetchingNextPage, notifications.length]);

    return (
        <div
            className={`${LOCATION_STYLE} flex flex-col w-[327px] tablet:w-[368px] shadow-[0px_2px_8px_0px_#78748640] rounded-[10px] pb-2`}
        >
            <div className="flex justify-between items-center px-5 py-[18.5px] border-b border-gray-100">
                <h1 className="text-16 font-bold">알림 {totalCount}개</h1>
                <button type="button" onClick={onClose} aria-label="알림 닫기">
                    <Image
                        src="/assets/icons/delete.svg"
                        alt="close"
                        width={24}
                        height={24}
                    />
                </button>
            </div>

            <div
                ref={scrollRootRef}
                className="max-h-[400px] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
                {isLoading ? (
                    <div className="flex justify-center py-10">
                        <Loader2 className="animate-spin text-gray-400" size={24} />
                    </div>
                ) : notifications.length === 0 ? (
                    <p className="py-10 text-center text-14 text-gray-400">
                        새로운 알림이 없습니다
                    </p>
                ) : (
                    <>
                        {notifications.map((notification: NotificationType) => (
                            <NotificationItem
                                key={notification.id}
                                notification={notification}
                                isNew={
                                    !lastReadAt ||
                                    new Date(notification.createdAt) >
                                        new Date(lastReadAt)
                                }
                                onDelete={onDelete}
                            />
                        ))}
                        <div
                            ref={sentinelRef}
                            className="flex min-h-6 justify-center py-2"
                            aria-hidden
                        >
                            {isFetchingNextPage && (
                                <Loader2
                                    className="animate-spin text-gray-400"
                                    size={20}
                                />
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Notifications;
