"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const images = [
  "/assets/images/img1.jpg",
  "/assets/images/img2.jpg",
  "/assets/images/img3.jpg",
]; // api 연동 후 삭제

function ImageGallery() {
  return (
    <div className="w-full aspect-video tablet:aspect-auto tablet:h-100 rounded-3xl overflow-hidden">
      <Carousel className="w-full h-full">
        <CarouselContent className="h-full">
          {images.map((src, index) => (
            <CarouselItem key={index} className="h-full">
              <div className="w-full h-full">
                <img
                  src={src}
                  alt={`체험 이미지 ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 border-none text-gray-700 hover:text-primary-500" />
        <CarouselNext className="right-4 border-none text-gray-700 hover:text-primary-500" />
      </Carousel>
    </div>
  );
}

export default ImageGallery;
