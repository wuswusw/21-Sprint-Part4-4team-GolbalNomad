// 무한 스크롤 훅
'use client';

import { RefObject, useEffect, useRef } from 'react';

type UseInfiniteScrollParams = {
  targetRef: RefObject<HTMLElement | null>;
  onIntersect: () => Promise<void> | void;
  enabled?: boolean;
  root?: Element | null;
  rootMargin?: string;
  threshold?: number;
};

export default function useInfiniteScroll({
  targetRef,
  onIntersect,
  enabled = true,
  root = null,
  rootMargin = '200px',
  threshold = 0,
}: UseInfiniteScrollParams) {
  const fetchingRef = useRef(false);

  useEffect(() => {
    const target = targetRef.current;
    if (!target || !enabled) return;

    const observer = new IntersectionObserver(
      async (entries) => {
        const entry = entries[0];

        if (!entry.isIntersecting || fetchingRef.current) return;

        fetchingRef.current = true;
        try {
          await onIntersect();
        } finally {
          fetchingRef.current = false;
        }
      },

      { root, rootMargin, threshold },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [targetRef, enabled, root, rootMargin, threshold, onIntersect]);
}
