"use client";
import {useState, useEffect} from "react";
import {useParams} from "next/navigation";

import {getExperienceDetail} from "@/features/experience/api/experience-detail.api";
import {ExperienceDetailResponse} from "@/features/experience/types/experience-detail.type";

import ImageGallery from "@/features/experience/components/image-gallery";
import ExperienceDesc from "@/features/experience/components/experience-desc";
import Map from "@/features/experience/components/kakao-map";
import ReviewSection from "@/features/experience/components/review-section";
import ExperienceInfo from "@/features/experience/components/experience-info";
import ReservationCard from "@/features/experience/components/reservation-card";


function ExperienceDetailPage() {
    const [experienceDetail, setExperienceDetail] = useState<ExperienceDetailResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams<{ experienceId: string }>();
    const experienceId = params?.experienceId;

    useEffect(() => {
        const fetchExperienceDetail = async () => {
            if (!experienceId) return;
            setIsLoading(true);
            try {
                const response = await getExperienceDetail(Number(experienceId));
                setExperienceDetail(response);
            } catch (error) {
                // alert("체험 상세 정보를 불러오는 데 실패했습니다. 다시 시도해주세요.");
                console.warn("데이터가 없어 테스트용 모크 데이터를 사용합니다.");
            
            // 2. 테스트용으로 아래 가짜 데이터를 세팅
            setExperienceDetail({
                id: Number(experienceId),
                userId: 1,
                teamId: "sample-team",
                title: "도쿄 타워 전망대 입장권 & 메인 데크 체험",
                description: " 도쿄의 아름다운 스카이라인을 한눈에 담아보세요. 150m 높이의 메인 데크에서 바라보는 360도 파노라마 뷰는 잊지 못할 추억을 선사합니다. 밤이 되면 화려하게 빛나는 도쿄의 야경을 감상하며 낭만적인 시간을 보내실 수 있습니다. 도쿄 타워 내부의 다양한 굿즈 샵과 카페도 놓치지 마세요!",
                category: "관광 · 랜드마크",
                address: "서울특별시 강남구 테헤란로 123",
                price: 50000,
                rating: 4.8,
                reviewCount: 124,
                bannerImageUrl: "/assets/images/img1.jpg",
                subImages: [
                    { id: 1, imageUrl: "/assets/images/img2.jpg" },
                    { id: 2, imageUrl: "/assets/images/img3.jpg" }
                ],
                schedules: [
                    { id: 101, date: "2026-03-25", startTime: "14:00", endTime: "16:00" },
                    { id: 102, date: "2026-03-28", startTime: "10:00", endTime: "12:00" },
                    { id: 103, date: "2026-03-28", startTime: "13:00", endTime: "15:00" },
                    { id: 104, date: "2026-04-03", startTime: "13:00", endTime: "15:00" },
                ],
                createdAt: "2026-03-20T00:00:00Z",
                updatedAt: "2026-03-20T00:00:00Z"
            } as ExperienceDetailResponse);
            } finally {
                setIsLoading(false);
            }
        };
        fetchExperienceDetail();
    }, [experienceId]);
    if (isLoading) return <div>Loading...</div>;

  return (
    <div>
            <div className="w-full mx-auto desktop:mt-22 tablet:mt-[34px] mt-[30px] desktop:mb-45 mb-[75px] mb-[30px] flex justify-center">
                <div className="w-full desktop:max-w-[1200px] px-10 grid grid-cols-1 desktop:grid-cols-[1fr_410px] gap-10">
                    <section className="w-full flex flex-col gap-6 tablet:gap-[30px] desktop:gap-10 text-gray-950">
                        <ImageGallery
                            bannerImageUrl={experienceDetail?.bannerImageUrl}
                            subImages={experienceDetail?.subImages}
                        />
                        <ExperienceInfo className="desktop:hidden" title={experienceDetail?.title} category={experienceDetail?.category} rating={experienceDetail?.rating} address={experienceDetail?.address} description={experienceDetail?.description} />
                        <hr className="w-full border-[#E0E0E5] desktop:hidden" />
                        <ExperienceDesc description={experienceDetail?.description} />
                        <hr className="w-full border-[#E0E0E5]" />
                        <Map address={experienceDetail?.address} />
                        <hr className="w-full border-[#E0E0E5]" />
                        <ReviewSection reviewCount={experienceDetail?.reviewCount} rating={experienceDetail?.rating} />
                    </section>
                    <section className="hidden desktop:block text-gray-950">
                        <ExperienceInfo title={experienceDetail?.title} category={experienceDetail?.category} rating={experienceDetail?.rating} address={experienceDetail?.address} description={experienceDetail?.description} reviewCount={experienceDetail?.reviewCount} />
                        <ReservationCard price={experienceDetail?.price} schedules={experienceDetail?.schedules} />
                    </section>
                </div>
            </div>
            <div className="w-full desktop:hidden sticky bottom-0 z-49 px-6 py-[18px] bg-white border-t border-[#e6e6e6]">
                <div className="flex items-center justify-between mb-3">
                <div className="flex justify-center items-center gap-1">
                    <h2 className="text-18 font-bold">{experienceDetail?.price?.toLocaleString()}</h2>
                    <p className="text-16 font-medium text-[#79747E]"> / 인</p>
                </div>
                <button className="text-16 font-bold text-primary-500 underline underline-offset-4">날짜 선택하기</button>
                </div>
                <button className="w-full px-5 py-4 rounded-[14px] bg-gray-200 text-white text-16 font-bold">예약하기</button>
            </div>
    </div>
  );
}

export default ExperienceDetailPage;