'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ReservationsStatusCalendar from '@/features/reservation/components/reservations-status-calendar';
import Dropdown, { type DropdownItem } from '@/components/common/Dropdown';
import { useMyActivities } from '@/features/reservation/hooks/use-my-activities';
import ReservationsStatusSkeleton from '@/features/reservation/components/reservations-status-skeleton';
import PageHeader from '@/components/common/PageHeader';

function ReservationsStatusPage() {
  const router = useRouter();
  const [isAuthChecked] = useState(() => {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('accessToken');
  });

  useEffect(() => {
    if (!isAuthChecked) {
      router.replace('/auth/login');
    }
  }, [isAuthChecked, router]);

  const { data, isLoading } = useMyActivities(100);
  const activities = data?.pages.flatMap((page) => page.activities) ?? [];
  const dropdownItems: DropdownItem[] = activities.map((activity) => ({
    id: activity.id.toString(),
    label: activity.title,
  }));
  const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const currentSelectedItem = selectedItem ?? dropdownItems[0] ?? null;

  if (!isAuthChecked || isLoading) {
    return <ReservationsStatusSkeleton />;
  }

  return (
    <div className="desktop:w-160 w-full">
      <div className="desktop:gap-[30px] tablet:gap-6 flex flex-col gap-[18px] text-gray-950">
        <div className="flex w-full flex-col items-start gap-3.5 py-2.5">
          <PageHeader />
        </div>
        {activities.length > 0 ? (
          <div>
            <div className="tablet:px-0 mb-[30px] px-6">
              <Dropdown
                items={dropdownItems}
                selectedItem={currentSelectedItem || { id: '', label: '체험을 선택해 주세요' }}
                onSelect={setSelectedItem}
              />
            </div>

            {currentSelectedItem && (
              <div>
                <ReservationsStatusCalendar
                  activityId={Number(currentSelectedItem.id)}
                  selectedDate={selectedDate}
                  onDateChange={setSelectedDate}
                />{' '}
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <Image
              src="/assets/images/empty-state.png"
              alt="no_activity"
              width={246}
              height={203}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ReservationsStatusPage;
