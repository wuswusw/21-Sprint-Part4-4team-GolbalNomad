// 내 체험 관리 페이지
'use client';

import CardExperiences from '@/components/common/card/card-experiences';
import PageHeader from '@/components/common/PageHeader';

export default function MyExperiencesPage() {
  return (
    <>
      {/* 상단 */}
      <div className="flex w-full flex-col items-start gap-3.5 py-2.5">
        <PageHeader />
      </div>

      {/* 체험관리 리스트 */}
      <div className="flex w-full flex-col gap-6">
        <CardExperiences
          id={1}
          imageUrl="https://cdn.dailyvet.co.kr/wp-content/uploads/2024/05/15231647/20240515ceva_experts4.jpg"
          title="함께 배우면 즐거운 스트릿 댄스"
          rating={4.5}
          reviewCount={230}
          price={100000}
        />
        <CardExperiences
          id={2}
          imageUrl="https://lh3.googleusercontent.com/proxy/DNVIwWacFoW3Za-pUNm8BiFDjLDOUAaq6y3dVk0TVXZSvlRvLGAqznzidRc1c7d-TqVhTxP8-h2D14HNgDEwfWvD0td6hQK1okNte93oCTs"
          title="함께 배우면 즐거운 스트릿 댄스"
          rating={4.5}
          reviewCount={230}
          price={100000}
        />
        <CardExperiences
          id={3}
          imageUrl="https://i.pinimg.com/736x/d8/a6/cb/d8a6cbb02bc2c5c27ae238db2e89425d.jpg"
          title="함께 배우면 즐거운 스트릿 댄스"
          rating={4.5}
          reviewCount={230}
          price={100000}
        />
        <CardExperiences
          id={4}
          imageUrl="https://i.pinimg.com/736x/d8/a6/cb/d8a6cbb02bc2c5c27ae238db2e89425d.jpg"
          title="함께 배우면 즐거운 스트릿 댄스"
          rating={4.5}
          reviewCount={230}
          price={100000}
        />
      </div>
    </>
  );
}
