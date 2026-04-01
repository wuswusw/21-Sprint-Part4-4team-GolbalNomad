"use client"

import { useState, useRef } from "react";
import { format } from "date-fns";

import ReservationsStatusTabs from "./reservations-status-tabs";
import ReservationsStatusItems from "./reservations-status-items";
import useOutsideClick from "@/hooks/use-click-outside";

const TABS = ["신청", "승인", "거절"] as const;
type Tab = typeof TABS[number];

interface ReservationsStatusDetailProps {
    activityId: number;
    selectedDate: Date | null;
    onClose: () => void;
}

function ReservationsStatusDetail({ activityId, selectedDate, onClose }: ReservationsStatusDetailProps) {
    const [activeTab, setActiveTab] = useState<Tab>("신청");
    const [tabCounts, setTabCounts] = useState<Record<Tab, number>>({
        신청: 0,
        승인: 0,
        거절: 0,
    });
    void activityId;

    const detailRef = useRef<HTMLDivElement>(null);
    useOutsideClick(detailRef, onClose, true);

    return (
        <div ref={detailRef} className="desktop:w-85 w-full px-6 py-[30px] bg-white rounded-3xl flex flex-col gap-[30px] shadow-[0_4px_24px_0_#9CB4CA33] text-gray-950">
            <div className="flex flex-col gap-3 items-start relative">
                <h2 className="text-20 font-bold">
                    {selectedDate ? format(selectedDate, "yyyy년 MM월 dd일") : "날짜를 선택해 주세요"}
                </h2>
                <img src="/assets/icons/delete.svg" alt="close" onClick={onClose} className="absolute top-0 right-0 cursor-pointer desktop:block hidden" />
                <ReservationsStatusTabs
                    tabList={TABS}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    tabCounts={tabCounts}
                />
            </div>
            <ReservationsStatusItems
                activityId={activityId}
                selectedDate={selectedDate || new Date()}
                activeTab={activeTab}
                onTabCountsChange={setTabCounts}
                onTabNavigate={setActiveTab}
            />
        </div>
    );
}

export default ReservationsStatusDetail;