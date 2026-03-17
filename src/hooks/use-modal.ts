// 모달 훅
'use client';

import { useModalContext } from '@/components/common/modal/modal-provider';

export function useModal() {
  const context = useModalContext();
  return context;
}
