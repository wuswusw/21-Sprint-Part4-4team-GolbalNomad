"use client";

import { useCallback, useEffect, useRef } from "react";
import Script from "next/script";

type WindowWithKakao = Window & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- 카카오맵 JS SDK
  kakao?: any;
};

const KAKAO_MAP_SCRIPT_SRC =
  "//dapi.kakao.com/v2/maps/sdk.js?appkey=" +
  (process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY ?? "") +
  "&libraries=services&autoload=false";

interface MapProps {
  address?: string;
}

function Map({ address }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const pollRef = useRef<number | null>(null);

  const initMap = useCallback(() => {
    if (!mapRef.current || !address?.trim()) return;

    if (pollRef.current != null) {
      window.clearInterval(pollRef.current);
      pollRef.current = null;
    }

    const run = () => {
      const { kakao } = window as WindowWithKakao;
      const el = mapRef.current;
      // autoload=false 일 때 스크립트 onLoad 직후에는 kakao는 있어도 maps가 아직 없을 수 있음
      if (!kakao?.maps?.load || !el) return false;

      kakao.maps.load(() => {
        if (!mapRef.current) return;
        const geocoder = new kakao.maps.services.Geocoder();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        geocoder.addressSearch(address, (result: any, status: any) => {
          if (status === kakao.maps.services.Status.OK) {
            const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

            const map = new kakao.maps.Map(mapRef.current, {
              center: coords,
              level: 3,
            });

            new kakao.maps.Marker({ map, position: coords });
          }
        });
      });
      return true;
    };

    if (run()) return;

    let attempts = 0;
    const maxAttempts = 60;
    pollRef.current = window.setInterval(() => {
      attempts += 1;
      if (run() || attempts >= maxAttempts) {
        if (pollRef.current != null) {
          window.clearInterval(pollRef.current);
          pollRef.current = null;
        }
      }
    }, 50);
  }, [address]);

  useEffect(() => {
    return () => {
      if (pollRef.current != null) {
        window.clearInterval(pollRef.current);
        pollRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const { kakao } = window as WindowWithKakao;
    if (kakao?.maps?.load) {
      initMap();
    }
  }, [address, initMap]);

  return (
    <div>
      <Script
        src={KAKAO_MAP_SCRIPT_SRC}
        strategy="afterInteractive"
        onLoad={initMap}
      />
      <h2 className="text-body-18">오시는 길</h2>
      <p className="text-body-14 mb-3">{address}</p>
      <div ref={mapRef} className="w-full h-[450px] rounded-3xl" />
    </div>
  );
}

export default Map;