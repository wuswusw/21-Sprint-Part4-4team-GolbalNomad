"use client";

import Image from "next/image";
import Link from "next/link";
import type { Activity } from "@/features/activity/types/activity.type";

interface ExperienceCardProps {
  experience: Activity;
  variant?: "default" | "popular";
}

function ExperienceCard({
  experience,
  variant = "default",
}: ExperienceCardProps) {
  const isPopular = variant === "popular";

  return (
<<<<<<< HEAD
    <Link
      href={`/experiences/${experience.id}`}
      className={`block w-full ${isPopular ? "h-full" : ""}`}
    >
      <article
        className={`
          flex w-full flex-col overflow-hidden bg-white transition duration-200
          hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(156,180,202,0.24)]
          ${
            isPopular
              ? "h-full rounded-[16px] shadow-[0_6px_16px_rgba(156,180,202,0.18)] tablet:rounded-[24px]"
              : "rounded-[24px] shadow-[0_6px_16px_rgba(156,180,202,0.18)]"
          }
        `}
      >
        <div
          className={`
            relative w-full overflow-hidden
            ${
              isPopular
                ? "h-[160px] rounded-[16px] tablet:h-[300px] tablet:rounded-[24px] desktop:h-[290px]"
                : "h-[290px] rounded-[24px]"
            }
          `}
        >
=======
    <Link href={`/main/experiences/${experience.id}`} className="block w-full">
      <article className="flex w-full flex-col overflow-hidden rounded-[24px] shadow-[0_6px_16px_rgba(156,180,202,0.18)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(156,180,202,0.24)]">
        <div className="relative h-[290px] w-full overflow-hidden rounded-[24px]">
>>>>>>> origin/develop
          <Image
            src={experience.bannerImageUrl}
            alt={experience.title}
            fill
            className="object-cover"
          />
        </div>

        <div
          className={`
            relative z-[2] flex flex-col bg-white
            ${
              isPopular
                ? "-mt-[32px] gap-2 rounded-[16px] px-5 py-4 shadow-[0_-4px_12px_rgba(0,0,0,0.04)] tablet:-mt-[60px] tablet:gap-4 tablet:rounded-[24px] tablet:px-[24px] tablet:py-5 desktop:px-[30px]"
                : "-mt-[60px] gap-4 rounded-[24px] px-[30px] py-5 shadow-[0_-4px_12px_rgba(0,0,0,0.04)]"
            }
          `}
        >
          <div className={isPopular ? "flex flex-col gap-1.5 tablet:gap-2" : "flex flex-col gap-2"}>
            <h3
              className={`
                truncate text-black
                ${
                  isPopular
                    ? "text-[14px] font-semibold tablet:text-[18px] tablet:font-bold"
                    : "text-18 font-bold"
                }
              `}
            >
              {experience.title}
            </h3>

            <div
              className={`
                flex items-center gap-1 text-black
                ${isPopular ? "text-[12px] font-medium tablet:text-14 tablet:font-normal" : "text-14"}
              `}
            >
              <span
                className={`
                  text-yellow-400
                  ${isPopular ? "text-[9.38px] tablet:text-base" : ""}
                `}
              >
                ★
              </span>
              <span>{experience.rating.toFixed(1)}</span>
              <span className="text-gray-400">({experience.reviewCount})</span>
            </div>
          </div>

          <p
            className={`
              text-black
              ${
                isPopular
                  ? "text-[15px] font-bold tablet:text-18"
                  : "text-18 font-bold"
              }
            `}
          >
            ₩ {experience.price.toLocaleString()}
            <span
              className={`
                text-gray-400
                ${
                  isPopular
                    ? "text-[12px] font-semibold tablet:text-16 tablet:font-medium"
                    : "text-16 font-medium"
                }
              `}
            >
              {" "}
              / 인
            </span>
          </p>
        </div>
      </article>
    </Link>
  );
}

export default ExperienceCard;