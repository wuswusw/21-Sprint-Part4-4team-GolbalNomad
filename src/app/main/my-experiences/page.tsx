'use client';

import { useRouter } from 'next/navigation';
import CardHorizontal2 from '@/components/common/card/card-horizontal-2';
import { useModal } from '@/hooks/use-modal';

export default function MyExperiencesPage() {
  const router = useRouter();
  const { openModal } = useModal();
  return (
    <>
      <div className="flex flex-col items-start gap-7.5">
        {/* 상단 */}
        <div className="flex w-full flex-col items-start gap-3.5 py-2.5">
          <div className="flex w-full justify-between">
            <div className="flex w-full flex-col items-start gap-1.5">
              <h3 className="text-18 font-bold">내 체험 관리</h3>
              <p className="text-14 font-medium text-gray-500">
                체험을 등록하거나 수정 및 삭제가 가능합니다.
              </p>
            </div>
            <button
              className="text--16 flex-shrink-0 rounded-xl bg-[var(--color-primary-500)] px-4 py-2.5 font-bold text-white"
              onClick={() => router.push('/main/my-experiences/create')}
            >
              체험 등록하기
            </button>
          </div>
        </div>

        {/* 체험관리 리스트 */}
        <div className="flex w-full flex-col gap-6">
          <CardHorizontal2
            imageUrl="https://cdn.dailyvet.co.kr/wp-content/uploads/2024/05/15231647/20240515ceva_experts4.jpg"
            title="함께 배우면 즐거운 스트릿 댄스"
            rating={4.5}
            reviewCount={230}
            price={100000}
            onEdit={() => {
              router.push('/main/my-experiences/edit');
            }}
            onDelete={() => {
              openModal('alert', {
                imageSrc: 'https://cdn-icons-png.flaticon.com/512/5610/5610967.png',
                description: '체험을 삭제하시겠어요?',
                confirmText: '삭제하기',
                cancelText: '아니오',
                onConfirm: () => {
                  console.log('삭제');
                },
              });
            }}
          />
          <CardHorizontal2
            imageUrl="https://lh3.googleusercontent.com/proxy/DNVIwWacFoW3Za-pUNm8BiFDjLDOUAaq6y3dVk0TVXZSvlRvLGAqznzidRc1c7d-TqVhTxP8-h2D14HNgDEwfWvD0td6hQK1okNte93oCTs"
            title="함께 배우면 즐거운 스트릿 댄스"
            rating={4.5}
            reviewCount={230}
            price={100000}
            onEdit={() => {
              router.push('/main/my-experiences/edit');
            }}
            onDelete={() => {
              openModal('alert', {
                description: '체험을 삭제하시겠어요?',
                confirmText: '삭제하기',
                cancelText: '아니오',
                onConfirm: () => {
                  console.log('삭제');
                },
              });
            }}
          />
          <CardHorizontal2
            imageUrl="https://i.pinimg.com/736x/d8/a6/cb/d8a6cbb02bc2c5c27ae238db2e89425d.jpg"
            title="함께 배우면 즐거운 스트릿 댄스"
            rating={4.5}
            reviewCount={230}
            price={100000}
            onEdit={() => {
              router.push('/main/my-experiences/edit');
            }}
            onDelete={() => {
              openModal('alert', {
                description: '체험을 삭제하시겠어요?',
                confirmText: '삭제하기',
                cancelText: '아니오',
                onConfirm: () => {
                  console.log('삭제');
                },
              });
            }}
          />
          <CardHorizontal2
            imageUrl="https://i.pinimg.com/736x/d8/a6/cb/d8a6cbb02bc2c5c27ae238db2e89425d.jpg"
            title="함께 배우면 즐거운 스트릿 댄스"
            rating={4.5}
            reviewCount={230}
            price={100000}
            onEdit={() => {
              router.push('/main/my-experiences/edit');
            }}
            onDelete={() => {
              openModal('alert', {
                description: '체험을 삭제하시겠어요?',
                confirmText: '삭제하기',
                cancelText: '아니오',
                onConfirm: () => {
                  console.log('삭제');
                },
              });
            }}
          />
        </div>
      </div>
    </>
  );
}
