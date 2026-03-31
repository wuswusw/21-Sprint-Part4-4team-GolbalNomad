interface ReservationsStatusTabsProps<T extends string> {
    tabList: readonly T[];
    activeTab: T;
    setActiveTab: (tab: T) => void;
    tabCounts?: Partial<Record<T, number>>;
}

function ReservationsStatusTabs<T extends string>({
    tabList,
    activeTab,
    setActiveTab,
    tabCounts,
}: ReservationsStatusTabsProps<T>) {
    return (
        <div className="w-full flex items-center border-b border-gray-200">
            {tabList.map((tab) => (
                <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`py-2 px-4 text-14 w-full desktop:w-auto font-medium transition-colors
                        ${activeTab === tab
                            ? "border-b-2 border-primary-500 text-primary-500 -mb-px"
                            : "text-gray-500 hover:text-gray-950"
                        }`}
                >
                    <span>{tab}</span>
                    {tabCounts && (
                        <span className={`ml-1 tabular-nums ${activeTab === tab ? "text-primary-500" : "text-gray-400"}`}>
                            {tabCounts[tab] ?? 0}
                        </span>
                    )}
                </button>
            ))}
        </div>
    )
}

export default ReservationsStatusTabs;
