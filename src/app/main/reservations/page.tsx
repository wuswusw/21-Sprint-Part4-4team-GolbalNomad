// 예약 내역
'use client';
import { useState } from 'react';
import CardHorizontal1 from '@/components/common/card/card-horizontal-1';
import type { BadgeStatus } from '@/types/card';
import PageHeader from '@/components/common/PageHeader';

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
    <>
      {/* 상단 */}
      <div className="flex w-full flex-col items-start gap-3.5 py-2.5">
        {/* 타이틀 */}
        <PageHeader />

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
          id={1}
          imageUrl="https://cdn.dailyvet.co.kr/wp-content/uploads/2024/05/15231647/20240515ceva_experts4.jpg"
          status="confirmed"
          title="함께 배우면 즐거운 스트릿 댄스"
          scheduledDate="2023. 02. 14"
          price={10000}
          people={10}
        />

        <CardHorizontal1
          id={2}
          imageUrl="https://lh3.googleusercontent.com/proxy/DNVIwWacFoW3Za-pUNm8BiFDjLDOUAaq6y3dVk0TVXZSvlRvLGAqznzidRc1c7d-TqVhTxP8-h2D14HNgDEwfWvD0td6hQK1okNte93oCTs"
          status="cancel"
          title="함께 배우면 즐거운 스트릿 댄스"
          scheduledDate="2023. 02. 14"
          price={10000}
          people={10}
        />

        <CardHorizontal1
          id={3}
          imageUrl="https://i.pinimg.com/736x/d8/a6/cb/d8a6cbb02bc2c5c27ae238db2e89425d.jpg"
          status="rejected"
          title="함께 배우면 즐거운 스트릿 댄스"
          scheduledDate="2023. 02. 14"
          price={10000}
          people={10}
        />

        <CardHorizontal1
          id={4}
          imageUrl="https://i.pinimg.com/736x/d8/a6/cb/d8a6cbb02bc2c5c27ae238db2e89425d.jpg"
          status="completed"
          title="함께 배우면 즐거운 스트릿 댄스"
          scheduledDate="2023. 02. 14"
          price={10000}
          people={10}
        />

        <CardHorizontal1
          id={5}
          imageUrl="https://i.pinimg.com/736x/d8/a6/cb/d8a6cbb02bc2c5c27ae238db2e89425d.jpg"
          status="approval"
          title="함께 배우면 즐거운 스트릿 댄스"
          scheduledDate="2023. 02. 14"
          price={10000}
          people={10}
        />
      </div>
    </>
  );
}
