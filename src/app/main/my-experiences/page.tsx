// 내 체험 관리 페이지
'use client';

import CardExperiences from '@/components/common/card/card-experiences';
import PageHeader from '@/components/common/PageHeader';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteMyExperience, getMyExperiences } from '@/lib/api/my-experiences';
import type { MyActivityItem } from '@/types/my-experiences';
import { useModal } from '@/hooks/use-modal';

export default function MyExperiencesPage() {
  const router = useRouter();
  const { openModal } = useModal();
  const [items, setItems] = useState<MyActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cursorId, setCursorId] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(false);

  const fetchExperiences = useCallback(
    async ({
      append = false,
      nextCursorId,
    }: { append?: boolean; nextCursorId?: number | null } = {}) => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('accessToken') || '';
        const result = await getMyExperiences(token, {
          cursorId: append ? (nextCursorId ?? undefined) : undefined,
        });

        const list = result.activities;
        setItems((prev) => (append ? [...prev, ...list] : list));
        setCursorId(result.cursorId ?? null);
        setHasMore(result.cursorId != null);
      } catch (err) {
        console.error(err);
        setError('내 체험을 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const handleDelete = useCallback(
    async (activityId: number) => {
      try {
        const token = localStorage.getItem('accessToken') || '';
        await deleteMyExperience(token, activityId);
        setItems((prev) => prev.filter((item) => item.id !== activityId));
      } catch (err) {
        const message = err instanceof Error ? err.message : '체험 삭제에 실패했습니다.';
        if (message === 'Unauthorized') {
          router.push('/auth/login');
          return;
        }
        openModal('alert', { description: message, confirmText: '확인' });
      }
    },
    [openModal],
  );

  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

  return (
    <>
      {/* 상단 */}
      <div className="flex w-full flex-col items-start gap-3.5 py-2.5">
        <PageHeader />
      </div>

      {/* 체험관리 리스트 */}
      <div className="desktop:gap-6 flex w-full flex-col gap-[30px] px-6">
        {loading && items.length === 0 ? (
          <div>불러오는 중...</div>
        ) : error && items.length === 0 ? (
          <div>{error}</div>
        ) : items.length === 0 ? (
          <div>내역이 없습니다.</div>
        ) : (
          <>
            {items.map((item) => (
              <CardExperiences
                key={item.id}
                id={item.id}
                imageUrl={item.bannerImageUrl}
                title={item.title}
                rating={item.rating}
                price={item.price}
                onDelete={() => handleDelete(item.id)}
              />
            ))}
          </>
        )}

        {error && items.length > 0 && <div>{error}</div>}

        {hasMore && (
          <button
            onClick={() => fetchExperiences({ append: true, nextCursorId: cursorId })}
            disabled={loading}
            className="rounded-lg border border-[var(--color-primary-500)] px-4 py-2.5 text-[var(--color-primary-500)] transition-colors hover:bg-[var(--color-primary-500)] hover:text-white disabled:opacity-50"
          >
            더 보기
          </button>
        )}
      </div>
    </>
  );
}
