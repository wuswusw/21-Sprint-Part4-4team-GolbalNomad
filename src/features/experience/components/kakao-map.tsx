"use client";

import { useEffect, useRef } from "react";
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

  const initMap = () => {
    const { kakao } = window as WindowWithKakao;
    if (!kakao || !mapRef.current) return;

    kakao.maps.load(() => {
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
  };

  useEffect(() => {
    if ((window as WindowWithKakao).kakao) {
      initMap();
    }
  }, []);

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