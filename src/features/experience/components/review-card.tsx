import { format } from "date-fns";
import { ReviewResponse } from "../types/experience-detail.type";

interface ReviewCardProps {
  reviews?: ReviewResponse | null;
}

function ReviewCard({ reviews }: ReviewCardProps) {
  const reviewList = reviews?.reviews ?? [];

  if (reviewList.length === 0) {
    return (
      <div className="w-full text-center text-body-14 text-[#79747E] py-6">
        아직 후기가 없습니다.
      </div>
    );
  }

  return (
    <>
      {reviewList.map((review) => {
        const starCount = Math.max(0, Math.min(5, Math.round(review.rating)));

        return (
          <div
            key={review.id}
            className="w-full rounded-xl p-5 shadow-[0px_4px_24px_0px_#9CB4CA33]"
          >
            <div className="flex justify-start items-center gap-2">
              <span className="text-body-14 font-bold tablet:text-body-16">
                {review.user.nickname}
              </span>
              <span className="text-12 tablet:text-14 text-[#A4A1AA]">
                {format(new Date(review.createdAt), "yyyy.MM.dd")}
              </span>
            </div>

            <div className="flex justify-start items-center gap-2 mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <img
                  // eslint-disable-next-line react/no-array-index-key
                  key={i}
                  src="/assets/icons/star.svg"
                  alt="star"
                  className={`w-4 h-4 ${i < starCount ? "opacity-100" : "opacity-30"}`}
                />
              ))}
            </div>

            <p className="text-body-14 tablet:text-body-16 mt-3">
              {review.content}
            </p>
          </div>
        );
      })}
    </>
  );
}

export default ReviewCard;