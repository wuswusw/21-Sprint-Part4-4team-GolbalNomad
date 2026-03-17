// 예약 내역
'use client';
import { useState } from 'react';
import CardHorizontal1 from '@/components/common/card/card-horizontal-1';
import type { BadgeStatus } from '@/types/card';

const STATUS_FILTERS: { label: string; value: BadgeStatus }[] = [
  { label: '예약 완료', value: 'confirmed' },
  { label: '예약 취소', value: 'cancel' },
  { label: '예약 승인', value: 'approval' },
  { label: '예약 거절', value: 'rejected' },
  { label: '체험 완료', value: 'completed' },
];

export default function ReservationPage() {
  const [selectedStatus, setSelectedStatus] = useState<BadgeStatus | null>(null);

  return (
    <div className="flex flex-col items-start gap-7.5">
      {/* 상단 */}
      <div className="flex flex-col items-start gap-3.5 py-2.5">
        {/* 타이틀 */}
        <div className="flex w-full flex-col items-start gap-1.5">
          <h3 className="text-18 font-bold">예약내역</h3>
          <p className="text-14 font-medium text-gray-500">예약내역 변경 및 취소할 수 있습니다.</p>
        </div>

        {/* 상태 */}
        <div className="flex gap-2">
          {STATUS_FILTERS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setSelectedStatus((prev) => (prev === value ? null : value))}
              className={`text-16 rounded-full border px-4 py-2.5 font-medium transition-colors ${
                selectedStatus === value
                  ? 'border-[var(--color-primary-500)] bg-[var(--color-primary-500)] text-white'
                  : 'border-[#D8D8D8] bg-white text-[var(--color-gray-950)]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* 예약 리스트 */}
      <div className="flex w-full flex-col gap-6">
        <CardHorizontal1
          imageUrl="https://i.pinimg.com/736x/d8/a6/cb/d8a6cbb02bc2c5c27ae238db2e89425d.jpg"
          status="confirmed"
          title="함께 배우면 즐거운 스트릿 댄스"
          scheduledDate="2023. 02. 14"
          price={10000}
          people={10}
          onEdit={() => {}}
          onCancel={() => {}}
        />

        <CardHorizontal1
          imageUrl="https://i.pinimg.com/736x/d8/a6/cb/d8a6cbb02bc2c5c27ae238db2e89425d.jpg"
          status="cancel"
          title="함께 배우면 즐거운 스트릿 댄스"
          scheduledDate="2023. 02. 14"
          price={10000}
          people={10}
        />

        <CardHorizontal1
          imageUrl="https://i.pinimg.com/736x/d8/a6/cb/d8a6cbb02bc2c5c27ae238db2e89425d.jpg"
          status="rejected"
          title="함께 배우면 즐거운 스트릿 댄스"
          scheduledDate="2023. 02. 14"
          price={10000}
          people={10}
        />

        <CardHorizontal1
          imageUrl="https://i.pinimg.com/736x/d8/a6/cb/d8a6cbb02bc2c5c27ae238db2e89425d.jpg"
          status="completed"
          title="함께 배우면 즐거운 스트릿 댄스"
          scheduledDate="2023. 02. 14"
          price={10000}
          people={10}
          onWriteReview={() => {}}
        />

        <CardHorizontal1
          imageUrl="https://i.pinimg.com/736x/d8/a6/cb/d8a6cbb02bc2c5c27ae238db2e89425d.jpg"
          status="approval"
          title="함께 배우면 즐거운 스트릿 댄스"
          scheduledDate="2023. 02. 14"
          price={10000}
          people={10}
        />
      </div>
    </div>
  );
}
