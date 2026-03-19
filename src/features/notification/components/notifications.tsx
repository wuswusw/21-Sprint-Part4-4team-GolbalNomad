import Image from "next/image";

const NOTIFICATIONS = [
    {
        id: 1,
        title: "함께하면 즐거운 스트릿 댄스",
        content: "승인",
        createdAt: "2026-03-17T17:02:37.054Z",
    },
    {
        id: 2,
        title: "함께하면 즐거운 스트릿 댄스",
        content: "거절",
        createdAt: "2026-03-17T17:02:37.054Z",
    },
    
]

function Notifications() {

    return (
        <div className="flex flex-col tablet:w-[231px] w-[327px] shadow-[0px_2px_8px_0px_#78748640] rounded-[10px] pb-2">
            <div className="flex justify-between items-center px-5 py-[18.5px] border-b border-gray-100">
                <h1 className="text-16 font-bold">알림 6개</h1>
                <Image src="/assets/icons/delete.svg" alt="close" width={24} height={24} />
            </div>
            {NOTIFICATIONS.map((notificationn) => (
                <div key={notificationn.id} className="flex flex-col gap-2 px-5 py-4 text-gray-950">
                    <div className="flex justify-between items-center">
                        <span className="text-14 font-bold">예약 {notificationn.content}</span>
                        <span className="text-12 text-gray-400">1분 전</span>
                    </div>
                    <div className="flex flex-col gap-2 text-14 text-gray-500">
                        <p>{notificationn.title}</p>
                        <p>{notificationn.createdAt}</p>
                        <p>예약이 <span className={notificationn.content === "승인" ? "text-primary-500" : "text-[#FF2727]"}>{notificationn.content}</span>되었어요.</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Notifications;