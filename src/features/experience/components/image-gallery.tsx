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
  const banner = bannerImageUrl?.trim();
  const urls: string[] = [];
  if (banner) urls.push(banner);
  for (const item of subImages ?? []) {
    const trimmedImageUrl = item.imageUrl?.trim();
    if (trimmedImageUrl && !urls.includes(trimmedImageUrl)) {
      urls.push(trimmedImageUrl);
    }
  }
  const allImages =
    urls.length > 0 ? urls : [bannerImageUrl?.trim() ?? ""];

  const hasMultipleSlides = allImages.filter(Boolean).length > 1;
  const lockNav = !hasMultipleSlides;

  return (
    <div className="w-full aspect-video tablet:aspect-auto tablet:h-100 rounded-3xl overflow-hidden">
      <Carousel className="w-full h-full">
        <CarouselContent className="h-full">
          {allImages.map((src, index) => (
            <CarouselItem key={`${src}-${index}`} className="h-full">
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
        <CarouselPrevious
          className="left-4 border-none text-gray-700 hover:text-primary-500 disabled:pointer-events-none disabled:opacity-40"
          {...(lockNav ? { disabled: true } : {})}
        />
        <CarouselNext
          className="right-4 border-none text-gray-700 hover:text-primary-500 disabled:pointer-events-none disabled:opacity-40"
          {...(lockNav ? { disabled: true } : {})}
        />
      </Carousel>
    </div>
  );
}

export default ImageGallery;
