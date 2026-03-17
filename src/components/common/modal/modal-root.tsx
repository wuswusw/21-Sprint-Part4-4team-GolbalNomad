// 모달 분기처리
'use client';

import { useModal } from '@/hooks/use-modal';

import AlertModal from '@/components/common/modal/alert-modal';
import ReviewModal from '@/components/common/modal/review-modal';
import SlideModal from '@/components/common/modal/slide-modal';

export default function ModalRoot() {
  const { modal, closeModal } = useModal();

  if (!modal) return null;

  switch (modal.type) {
    case 'alert':
      return <AlertModal onClose={closeModal} {...modal.payload} />;
    case 'review':
      return <ReviewModal onClose={closeModal} {...modal.payload} />;
    case 'slide':
      return <SlideModal onClose={closeModal} {...modal.payload} />;
    default:
      return null;
  }
}
