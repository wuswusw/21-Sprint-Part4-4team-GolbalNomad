import ReviewCard from "./review-card";
function ReviewSection() {
  return (
    <div>
        <div className="flex gap-2 justify-start items-center mb-2">
            <h2 className="text-body-18">체험 후기</h2>
            <p className="text-body-16 text-[#79747E]"> 1,300개</p>
        </div>
        <div className="w-full mx-auto flex flex-col items-center mb-[30px]">
            <span className="text-32 font-bold">4.2</span>
            <span className="text-body-16">매우 만족</span>
            <div className="flex justify-center gap-[2px] items-center">
                <img src="/assets/icons/star.svg" alt="star" className="w-4 h-4" />
                <span className="text-body-14 text-[#79747E]">1,300개 후기</span>
            </div>
        </div>
        <div className="flex flex-col gap-5">
            <ReviewCard />
            <ReviewCard />
        </div>
    </div>
  );
}

export default ReviewSection;