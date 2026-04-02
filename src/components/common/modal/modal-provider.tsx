// 모달 상태관리
'use client';

import { ModalState, ModalType, ModalProps } from '@/types/modal';
import { ReactNode, createContext, useState, useCallback, useMemo, useContext } from 'react';
import ModalRoot from './modal-root';

interface ModalContextValue {
  modal: ModalState;
  openModal: <T extends ModalType>(type: T, payload: ModalProps[T]) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<ModalState>(null);
  const openModal = useCallback(<T extends ModalType>(type: T, payload: ModalProps[T]) => {
    setModal({
      type,
      payload,
    } as ModalState);
  }, []);

  const closeModal = useCallback(() => {
    setModal(null);
  }, []);

  const value = useMemo(
    () => ({
      modal,
      openModal,
      closeModal,
    }),
    [modal, openModal, closeModal],
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
      <ModalRoot />
    </ModalContext.Provider>
  );
}

export function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('ModalProvider내에서 useModalContext를 사용해야 합니다.');
  }
  return context;
}
