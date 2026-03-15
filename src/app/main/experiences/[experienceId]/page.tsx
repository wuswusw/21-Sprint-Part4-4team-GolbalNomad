import MainLayout from "@/components/layout/MainLayout";
import MyDayPicker from "./components/ReactDayPicker";


function ExperienceDetailPage() {
  return (
    <MainLayout>
        <div className="w-full mx-auto mt-22 mb-45 flex justify-center">
            <div className="w-full desktop:max-w-[1200px] px-10 grid grid-cols-1 desktop:grid-cols-[1fr_410px] gap-10">
                <section className="w-full flex flex-col gap-10 text-gray-950">
                    <div className="w-full h-100 rounded-3xl overflow-hidden grid grid-cols-2 grid-rows-2 gap-3">
                        <div className="row-span-2 bg-primary-100"></div>
                        <div className="bg-primary-100"></div>
                        <div className="bg-primary-100"></div>
                    </div>
                    <div>
                        <h2 className="text-body-18">체험 설명</h2>
                        <p className="text-body-16">안녕하세요! 저희 스트릿 댄스 체험을 소개합니다. 저희는 신나고 재미있는 스트릿 댄스 스타일을 가르칩니다. 크럼프는 세계적으로 인기 있는 댄스 스타일로, 어디서든 춤출 수 있습니다. 저희 체험에서는 새로운 스타일을 접할 수 있고, 즐거운 시간을 보낼 수 있습니다. 저희는 초보자부터 전문가까지 어떤 수준의 춤추는 사람도 가르칠 수 있도록 준비해놓았습니다. 저희와 함께 즐길 수 있는 시간을 기대해주세요! 각종 음악에 적합한 스타일로, 저희는 크럼프 외에도 전통적인 스트릿 댄스 스타일과 최신 스트릿 댄스 스타일까지 가르칠 수 있습니다. 저희 체험에서는 전문가가 직접 강사로 참여하기 때문에, 저희가 제공하는 코스는 어떤 수준의 춤추는 사람도 쉽게 이해할 수 있도록 준비해놓았습니다. 저희 체험을 참가하게 된다면, 즐거운 시간 뿐만 아니라 새로운 스타일을 접할 수 있을 것입니다.</p>
                    </div>
                    <div>
                        <h2 className="text-body-18">오시는 길</h2>
                        <p className="text-body-14">서울시 중구 청계천로 100 10F</p>
                        <img src="/assets/images/map.png" alt="map" className="w-full h-[450px] object-cover rounded-3xl" />
                    </div>
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
                        </div>
                    </div>
                </section>
                <section className="hidden desktop:block text-gray-950">
                    <div className="relative mb-[38px]">
                        <div>
                            <button className="absolute top-0 right-0">
                                <img src="/assets/icons/kebab.svg" alt="kebab" className="w-6 h-6" />
                            </button>
                        </div>
                        <p className="text-body-14 mb-2">문화 · 예술</p>
                        <h1 className="text-24 font-bold mb-[17px]">함께 배우면 즐거운 스트릿 댄스</h1>
                        <div className="flex justify-start items-center gap-[6px] mb-[10px]">
                            <img src="/assets/icons/star.svg" alt="star" className="w-4 h-4" />
                            <span className="text-body-14 text-gray-700">4.9(293)</span>
                        </div>
                        <div className="flex justify-start gap-[2px] items-center mb-[17px]">
                            <img src="/assets/icons/location.svg" alt="location" className="w-4 h-4" />
                            <span className="text-body-14 text-gray-700">서울 중구 청계천로 100 10F</span>
                        </div>
                        <p className="text-body-16 text-[#4B4B4B] mb-[30px]">초보자부터 전문가까지 춤추는 즐거움을 함께 느껴보세요.</p>
                    </div>
                    <div className="p-[30px] rounded-3xl shadow-[0px_4px_24px_0px_#9CB4CA33]">
                        <div className="flex justify-start items-center gap-1 mb-6">
                            <h2 className="text-24 font-bold">₩ 1,000</h2>
                            <p className="text-20 font-medium text-[#79747E]"> / 인</p>
                        </div>
                        <h3 className="text-16 font-bold mb-2">날짜</h3>
                        <div>
                            <MyDayPicker/>
                        </div>
                        <div className="flex justify-between my-6">
                            <h3 className="text-16 font-bold">참여 인원수</h3>
                            <div className="flex items-center rounded-full ring ring-[#eee] overflow-hidden px-[9px]">
                                <button><img src="/assets/icons/minus.svg" alt="minus" className="p-[10px]" /></button>
                                <p className="p-[10px] text-16 font-bold text-[#4B4B4B]">10</p>
                                <button><img src="/assets/icons/plus.svg" alt="plus" className="p-[10px]" /></button>                            </div>
                        </div>
                        <div className="flex flex-col items-start gap-3 mb-6">
                            <h3 className="text-16 font-bold mb-[2px]">예약 가능한 시간</h3>
                            <button className="w-full px-3 py-4 rounded-[11px] ring ring-gray-300 text-15 font-medium hover:ring-primary-500 hover:text-primary-500 hover:bg-primary-100">12:00 ~ 15:00</button>
                            <button className="w-full px-3 py-4 rounded-[11px] ring ring-gray-300 text-15 font-medium hover:ring-primary-500 hover:text-primary-500 hover:bg-primary-100">12:00 ~ 15:00</button>
                        </div>
                        <div className="flex justify-between items-center pt-5 pb-[10px] border-t border-[#ddd]">
                            <div className="flex items-start gap-[6px]">
                                <p className="text-20 font-medium text-[#79747E]">총 합계</p>
                                <p className="text-20 font-bold">₩ 10,000</p>
                            </div>
                            <button className="px-10 py-4 rounded-[14px] bg-primary-500 text-white text-16 font-bold">예약하기</button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </MainLayout>
  );
}

export default ExperienceDetailPage;