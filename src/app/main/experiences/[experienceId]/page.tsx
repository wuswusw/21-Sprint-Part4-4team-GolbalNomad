import MainLayout from "@/components/layout/main-layout";
import ImageGallery from "./components/image-gallery";
import ExperienceDesc from "./components/experience-desc";
import Map from "./components/kakao-map";
import ReviewSection from "./components/review-section";
import ExperienceInfo from "./components/experience-info";
import ReservationCard from "./components/reservation-card";

function ExperienceDetailPage() {
  return (
    <div>
        <MainLayout>
            <div className="w-full mx-auto desktop:mt-22 tablet:mt-[34px] mt-[30px] desktop:mb-45 mb-[75px] mb-[30px] flex justify-center">
                <div className="w-full desktop:max-w-[1200px] px-10 grid grid-cols-1 desktop:grid-cols-[1fr_410px] gap-10">
                    <section className="w-full flex flex-col gap-6 tablet:gap-[30px] desktop:gap-10 text-gray-950">
                        <ImageGallery />
                        <ExperienceInfo className="desktop:hidden" />
                        <hr className="w-full border-[#E0E0E5] desktop:hidden" />
                        <ExperienceDesc />
                        <hr className="w-full border-[#E0E0E5]" />
                        <Map />
                        <hr className="w-full border-[#E0E0E5]" />
                        <ReviewSection />
                    </section>
                    <section className="hidden desktop:block text-gray-950">
                        <ExperienceInfo />
                        <ReservationCard />
                    </section>
                </div>
            </div>
        </MainLayout>
        <div className="w-full desktop:hidden sticky bottom-0 z-49 px-6 py-[18px] bg-white border-t border-[#e6e6e6]">
            <div className="flex items-center justify-between mb-3">
            <div className="flex justify-center items-center gap-1">
                <h2 className="text-18 font-bold">₩ 1,000</h2>
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