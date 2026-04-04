// 모달 타입
import { ReactNode } from 'react';
import type { ReservationAvailableDaysResponse } from '@/features/experience/types/experience-detail.type';

export type ModalType = 'alert' | 'review' | 'slide' | 'edit';

// alert 모달
export interface AlertModalProps {
  imageSrc?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

// edit 모달
export interface EditModalProps {
  reservationId: number | string;
  activityId: number;
  price?: number;
  onConfirm?: () => void;
}

// review 모달
export interface ReviewModalProps {
  reservationId: string;
  activityTitle: string;
  reservationDate: string;
  size?: 'sm' | 'md' | 'lg';
  onReviewSuccess?: () => void;
}

// slide 모달
export interface SlideModalProps {
  padding?: string;
  title?: string;
  children?: ReactNode;
}

// edit-reservation 모달
export interface EditReservationModalProps {
  reservationId: number | string;
  activityId: number;
  headCount: number;
  onEditSuccess?: () => void;
}

// 타입에 따라 모달
export interface ModalProps {
  alert: AlertModalProps;
  review: ReviewModalProps;
  slide: SlideModalProps;
  edit: EditModalProps;
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
  | {
      type: 'edit';
      payload: EditModalProps;
    }
  | null;
