"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps {
  address?: string;
}

function Map({ address }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  const initMap = () => {
    if (!window.kakao || !mapRef.current) return;

    window.kakao.maps.load(() => {
      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.addressSearch(address, (result: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

          const map = new window.kakao.maps.Map(mapRef.current, {
            center: coords,
            level: 3,
          });

          new window.kakao.maps.Marker({ map, position: coords });
        }
      });
    });
  };

  // 스크립트가 이미 캐시된 경우 대비
  useEffect(() => {
    if (window.kakao) {
      initMap();
    }
  }, []);

  return (
    <div>
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`}
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
