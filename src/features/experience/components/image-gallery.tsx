"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getValidImages } from "../utils/imageGallery";

interface ImageGalleryProps {
  bannerImageUrl?: string;
  subImages?: { id: number; imageUrl: string }[];
}

function ImageGallery({ bannerImageUrl, subImages }: ImageGalleryProps) {
  const allImages = getValidImages(bannerImageUrl, subImages);
  const hasMultipleSlides = allImages.length > 1;

  const handleNavigationClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

return (
  <div className="group relative w-full aspect-video tablet:aspect-auto tablet:h-100 rounded-3xl overflow-hidden">
    <Carousel opts={{ loop: false }} className="w-full h-full">
      <CarouselContent className="h-full">
        {allImages.map((src, index) => (
          <CarouselItem key={`${src}-${index}`} className="h-full">
            <div className="relative w-full h-full pointer-events-none">
              <Image
                src={src}
                alt={`체험 이미지 ${index + 1}`}
                fill
                className="object-cover "
                priority={index === 0}
                sizes="(max-width: 744px) 100vw, (max-width: 1199px) 100vw, 1200px"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {hasMultipleSlides && (
        <div 
          className="absolute inset-0 pointer-events-none z-[50]" 
          onClick={handleNavigationClick}
        > 
          <CarouselPrevious
            className="left-4 pointer-events-auto flex items-center justify-center border-none bg-white/70 hover:bg-white text-gray-700 shadow-md transition-all active:scale-95 disabled:opacity-20"
          />
          <CarouselNext
            className="right-4 pointer-events-auto flex items-center justify-center border-none bg-white/70 hover:bg-white text-gray-700 shadow-md transition-all active:scale-95 disabled:opacity-20"
          />
        </div>
      )}
    </Carousel>
  </div>
  );
}

export default ImageGallery;
