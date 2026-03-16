function ReviewCard() {
  return (
    <div className="w-full rounded-xl p-5 shadow-[0px_4px_24px_0px_#9CB4CA33]">
        <div className="flex justify-start items-center gap-2">
            <span className="text-body-16">홍길동</span>
            <span className="text-14 text-[#A4A1AA]">2023.2.4</span>
        </div>
        <div className="flex justify-start items-center">
            <img src="/assets/icons/star.svg" alt="star" className="w-4 h-4" />
            <img src="/assets/icons/star.svg" alt="star" className="w-4 h-4" />
            <img src="/assets/icons/star.svg" alt="star" className="w-4 h-4" />
            <img src="/assets/icons/star.svg" alt="star" className="w-4 h-4" />
            <img src="/assets/icons/star.svg" alt="star" className="w-4 h-4" />
        </div>
        <p className="text-body-16 mt-3">저는 저희 스트릿 댄서 체험에 참가하게 된 지 얼마 안됐지만, 정말 즐거운 시간을 보냈습니다. 새로운 스타일과 춤추기를 좋아하는 나에게 정말 적합한 체험이었고, 전문가가 직접 강사로 참여하기 때문에 어떤 수준의 춤추는 사람도 쉽게 이해할 수 있었습니다. 강사님께서 정말 친절하게 설명해주셔서 정말 좋았고, 이번 체험을 거쳐 새로운 스타일과 춤추기에 대한 열정이 더욱 생겼습니다. 저는 이 체험을 적극 추천합니다!"</p>
    </div>
  );
}

export default ReviewCard;