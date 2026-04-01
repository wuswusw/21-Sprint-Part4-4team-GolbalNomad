import Image from "next/image";
import Link from "next/link";
import type { Activity } from "@/features/activity/types/activity.type";

interface ExperienceCardProps {
  experience: Activity;
}

function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <Link href={`/experiences/${experience.id}`} className="block w-full">
      <article className="flex w-full flex-col overflow-hidden rounded-[24px] shadow-[0_6px_16px_rgba(156,180,202,0.18)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(156,180,202,0.24)]">
        <div className="relative h-[290px] w-full overflow-hidden rounded-[24px]">
          <Image
            src={experience.bannerImageUrl}
            alt={experience.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="relative z-[2] -mt-[60px] flex flex-col gap-4 rounded-[24px] bg-white px-[30px] py-5 shadow-[0_-4px_12px_rgba(0,0,0,0.04)]">
          <div className="flex flex-col gap-2">
            <h3 className="truncate text-18 font-bold text-black">
              {experience.title}
            </h3>

            <div className="flex items-center gap-1 text-14 text-black">
              <span className="text-yellow-400">★</span>
              <span>{experience.rating.toFixed(1)}</span>
              <span className="text-gray-400">({experience.reviewCount})</span>
            </div>
          </div>

          <p className="text-18 font-bold text-black">
            ₩ {experience.price.toLocaleString()}
            <span className="text-16 font-medium text-gray-400"> / 인</span>
          </p>
        </div>
      </article>
    </Link>
  );
}

export default ExperienceCard;