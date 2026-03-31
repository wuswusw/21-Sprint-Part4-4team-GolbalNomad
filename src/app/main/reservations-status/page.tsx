"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ReservationsStatusCalendar from "@/features/reservation/components/reservations-status-calendar";
import Dropdown, { type DropdownItem } from "@/components/common/Dropdown";
import { useMyActivities } from "@/features/reservation/hooks/use-my-activities";
import ReservationsStatusSkeleton from "@/features/reservation/components/reservations-status-skeleton";

import { MOCK_MY_ACTIVITIES } from "@/features/reservation/reservations-status-mock-data"; //추후 삭제 예정

function ReservationsStatusPage() {
    const router = useRouter();
    const [isAuthChecked, setIsAuthChecked] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            router.replace("/auth/login");
        } else {
            setIsAuthChecked(true);
        }
    }, [router]);

    const {data, isLoading} = useMyActivities(100);
    const activities = MOCK_MY_ACTIVITIES; //추후 데이터 생기면 data?.pages.flatMap((page) => page.activities) ?? []; 로 변경
    const dropdownItems: DropdownItem[] = activities.map((activity) => ({
        id: activity.id.toString(),
        label:activity.title,
    }))
    const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(null)
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)

    useEffect(() => {
        if(dropdownItems.length > 0 && !selectedItem) {
            setSelectedItem(dropdownItems[0])
        }
    }, [dropdownItems, selectedItem])

    if (!isAuthChecked || isLoading) {
        return <ReservationsStatusSkeleton />;
    }

    return (
            <div className="desktop:w-160 w-full">
                <div className="flex flex-col desktop:gap-[30px] tablet:gap-6 gap-[18px] text-gray-950">
                    <div className="flex flex-col gap-[10px] tablet:px-0 px-6 ">
                        <h2 className="text-18 font-bold">예약 현황</h2>
                        <p className="text-14 text-gray-500">내 체험에 예약된 내역들을 한 눈에 확인할 수 있습니다.</p>
                    </div>
                    {activities.length > 0 ? (
                        <div>
                            <div className="tablet:px-0 px-6 mb-[30px]">
                                <Dropdown
                                    items={dropdownItems}
                                    selectedItem={selectedItem || {id: "", label: "체험을 선택해 주세요"}}
                                    onSelect={setSelectedItem}
                                />
                            </div>
        
                            {selectedItem && (
                                <div>
                                    <ReservationsStatusCalendar
                                        activityId={Number(selectedItem.id)}
                                        selectedDate={selectedDate}
                                        onDateChange={setSelectedDate}
                                    />                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center">
                            <Image src="/assets/images/empty-state.png" alt="no_activity" width={246} height={203} />
                        </div>
                    )}

                </div>
            </div>
    )
}

export default ReservationsStatusPage;