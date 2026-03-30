"use client";

import { useEffect, useRef } from "react";

interface UseIntersectionObserverProps {
  onIntersect: () => void;
  enabled?: boolean;
  threshold?: number;
  rootMargin?: string;
}

export function useIntersectionObserver({
  onIntersect,
  enabled = true,
  threshold = 0,
  rootMargin = "0px",
}: UseIntersectionObserverProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled || !ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          onIntersect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [enabled, onIntersect, threshold, rootMargin]);

  return ref;
}
