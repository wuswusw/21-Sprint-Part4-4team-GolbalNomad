// 예약내역
'use client';

import CardReservation from '@/components/common/card/card-reservation';
import CardExperiences from '@/components/common/card/card-experiences';
import CardVertical from '@/components/common/card/card-vertical';
import { useModal } from '@/hooks/use-modal';

export default function ReservationPage() {
  const { openModal } = useModal();

  const handleOpenModal1 = () => {
    openModal('alert', {
      description: '비밀번호가 일치하지 않습니다.',
      confirmText: '확인',
    });
  };

  const handleOpenModal2 = () => {
    openModal('alert', {
      imageSrc: 'https://cdn-icons-png.flaticon.com/512/1628/1628767.png',
      description: '예약을 취소하시겠어요?',
      confirmText: '취소하기',
      cancelText: '아니오',
      onConfirm: () => {
        console.log('삭제');
      },
    });
  };

  const handleOpenModal3 = () => {
    openModal('review', {
      reservationId: '1234567890',
      activityTitle: '함께 배우면 즐거운 스트릿 댄스',
      reservationDate: '2023. 02. 14',
    });
  };

  const handleOpenModal4 = () => {
    openModal('slide', {
      title: '날짜',
      padding: 'pt-6 px-7.5 pb-5',
      children: (
        <div className="flex items-center justify-center gap-4">
          <div className="w-1/2">달력</div>
          <div className="w-1/2">예약 가능한 시간</div>
        </div>
      ),
    });
  };

  return (
    <div className="flex flex-col items-start gap-4">
      <button onClick={handleOpenModal1}>알림 팝업</button>
      <button onClick={handleOpenModal2}>이미지 있는 알림 팝업</button>
      <button onClick={handleOpenModal3}>리뷰 팝업</button>
      <button onClick={handleOpenModal4}>슬라이드 팝업</button>
      <CardReservation
        id={1}
        imageUrl="https://cdn-icons-png.flaticon.com/512/1628/1628767.png"
        status="pending"
        title="함께 배우면 즐거운 스트릿 댄스"
        scheduledDate="2023. 02. 14"
        price={10000}
        people={10}
      />
      <CardExperiences
        id={1}
        imageUrl="https://cdn-icons-png.flaticon.com/512/1628/1628767.png"
        title="함께 배우면 즐거운 스트릿 댄스"
        rating={4.5}
        reviewCount={10}
        price={100000}
      />
      <CardVertical
        id={1}
        imageUrl="https://cdn-icons-png.flaticon.com/512/1628/1628767.png"
        title="함께 배우면 즐거운 스트릿 댄스"
        rating={4.5}
        reviewCount={10}
        price={100000}
      />
      <p>※ 버튼 공용컴포넌트 완료시 적용 예정.</p>
    </div>
  );
}
