import ReservationsStatusCalendar from "@/features/reservation/components/reservations-status-calendar";
import ReservationsStatusDetail from "@/features/reservation/components/reservations-status-detail";

function ReservationsStatusPage() {
    return (
            <div className="desktop:w-160 tablet:w-[476px] w-full">
                <div className="flex flex-col desktop:gap-[30px] tablet:gap-6 gap-[18px] text-gray-950">
                    <div className="flex flex-col gap-[10px] tablet:px-0 px-6">
                        <h2 className="text-18 font-bold">예약 현황</h2>
                        <p className="text-14 text-gray-500">내 체험에 예약된 내역들을 한 눈에 확인할 수 있습니다.</p>
                    </div>
                    <div className="tablet:px-0 px-6">
                        <div className="w-full h-[54px] ring ring-[#E0E0E5] rounded-xl flex items-center justify-center">
                            드롭다운 컴포넌트
                        </div>
                    </div>
                    <ReservationsStatusCalendar />
                    <ReservationsStatusDetail />

                </div>
            </div>
    )
}

export default ReservationsStatusPage;