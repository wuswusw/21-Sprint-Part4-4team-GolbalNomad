// 모달 타입
import { ReactNode } from 'react';

export type ModalType = 'alert' | 'review' | 'slide';

// alert 모달
export interface AlertModalProps {
  imageSrc?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

// review 모달
export interface ReviewModalProps {
  reservationId: string;
  activityTitle: string;
  reservationDate: string;
  size?: 'sm' | 'md' | 'lg';
}

// slide 모달
export interface SlideModalProps {
  padding?: string;
  title?: string;
  children?: ReactNode;
}

// 타입에 따라 모달
export interface ModalProps {
  alert: AlertModalProps;
  review: ReviewModalProps;
  slide: SlideModalProps;
}

// 열린 모달 상태
export type ModalState =
  | {
      type: 'alert';
      payload: AlertModalProps;
    }
  | {
      type: 'review';
      payload: ReviewModalProps;
    }
  | {
      type: 'slide';
      payload: SlideModalProps;
    }
  | null;
