"use client"

import { useState } from "react";

import ReservationsStatusTabs from "./reservations-status-tabs";
import ReservationsStatusItems from "./reservations-status-items";

const TABS = ["신청", "승인", "거절"] as const;
type Tab = typeof TABS[number];

function ReservationsStatusDetail() {
    const [activeTab, setActiveTab] = useState<Tab>("신청");

    return (
        <div className="desktop:w-85 w-full px-6 py-[30px] bg-white rounded-3xl flex flex-col gap-[30px] shadow-[0_4px_24px_0_#9CB4CA33]">
            <div className="flex flex-col gap-3 items-start relative">
                <h2 className="text-20 font-bold">2026년 03월 15일</h2>
                <img src="/assets/icons/delete.svg" alt="close" className="absolute top-0 right-0 cursor-pointer desktop:block hidden" />
                <ReservationsStatusTabs tabList={TABS} activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
            <ReservationsStatusItems activeTab={activeTab} />
        </div>
    )
}

export default ReservationsStatusDetail;
