import MainLayout from "@/components/layout/MainLayout";
import Sidemenu from "@/components/common/Sidemenu";
import ReservationsStatusCalendar from "./components/reservations-status-calendar";
import ReservationsStatusModal from "./components/reservations-status-modal";

function ReservationsStatusPage() {
    return (
        <MainLayout>
            <div className="tablet:pt-10 pt-[30px] desktop:pt-10 pb-22 tablet:pb-25 pb-[14px] max-w-[980px] desktop:mx-auto tablet:mx-[30px] px-0 grid tablet:grid-cols-[178px_1fr] grid-cols-[1fr] desktop:grid-cols-[291px_1fr] gap-0 tablet:gap-[50px] gap-[20px]">
                <div className="h-fit">
                    <Sidemenu />
                </div>
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
                    <ReservationsStatusModal />
                </div>
            </div>
        </MainLayout>
    )
}

export default ReservationsStatusPage;