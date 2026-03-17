interface ReservationsStatusTabsProps<T extends string> {
    tabList: readonly T[];
    activeTab: T;
    setActiveTab: (tab: T) => void;
}

function ReservationsStatusTabs<T extends string>({ tabList, activeTab, setActiveTab }: ReservationsStatusTabsProps<T>) {
    return (
        <div className="w-full flex items-center border-b border-gray-200">
            {tabList.map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-2 px-4 text-14 font-medium transition-colors
                        ${activeTab === tab
                            ? "border-b-2 border-primary-500 text-primary-500 -mb-px"
                            : "text-gray-500 hover:text-gray-950"
                        }`}
                >
                    {tab}
                </button>
            ))}
        </div>
    )
}

export default ReservationsStatusTabs;
