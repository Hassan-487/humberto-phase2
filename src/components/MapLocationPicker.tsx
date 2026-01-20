import { useEffect, useRef } from "react";
import { loadGoogleMaps } from "@/lib/google-loader";

export function MapLocationPicker({ label, onSelect }: any) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadGoogleMaps().then(() => {
      const map = new window.google.maps.Map(mapRef.current!, {
        center: { lat: 30.3753, lng: 69.3451 },
        zoom: 6,
      });

      map.addListener("click", async (e: any) => {
        const geocoder = new window.google.maps.Geocoder();
        const res = await geocoder.geocode({ location: e.latLng });

        new window.google.maps.Marker({
          position: e.latLng,
          map,
        });

        onSelect({
          address: res.results?.[0]?.formatted_address,
          latitude: e.latLng.lat(),
          longitude: e.latLng.lng(),
        });
      });
    });
  }, []);

  return (
    <div>
      <p className="text-xs font-bold uppercase">
        Select {label}
      </p>
      <div ref={mapRef} className="h-64 w-full border rounded" />
    </div>
  );
}
