"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ImageGalleryProps {
  bannerImageUrl?: string;
  subImages?: { id: number; imageUrl: string }[];
}

function ImageGallery({ bannerImageUrl, subImages }: ImageGalleryProps) {
  const banner = bannerImageUrl ?? "";
  const subs = subImages ?? [];
  const allImages = [banner, ...subs.map((item) => item.imageUrl)];

  return (
    <div className="w-full aspect-video tablet:aspect-auto tablet:h-100 rounded-3xl overflow-hidden">
      <Carousel className="w-full h-full">
        <CarouselContent className="h-full">
          {allImages.map((src, index) => (
            <CarouselItem key={index} className="h-full">
              <div className="relative w-full h-full">
                <Image
                  src={src}
                  alt={`체험 이미지 ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 744px) 327px, (max-width: 1199px) 684px, 670px"
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
