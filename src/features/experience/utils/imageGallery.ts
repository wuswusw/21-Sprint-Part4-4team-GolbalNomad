export const getValidImages = (banner?: string, subImages?: { imageUrl: string }[]) => {
    const images = new Set<string>();
    if (banner?.trim()) images.add(banner.trim());
    subImages?.forEach((item) => {
      if (item.imageUrl?.trim()) images.add(item.imageUrl.trim());
    });
    return Array.from(images);
  };