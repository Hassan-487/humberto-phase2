

import { useEffect, useRef } from "react";
import { loadGoogleMaps } from "@/lib/google-loader";

type MapMode = "origin" | "destination";

interface LocationPayload {
  locationName: string;
  address: string;
  latitude: number;
  longitude: number;
}

export function LargeMapPicker({
  mode,
  existingLocations,
  onSelect,
}: {
  mode: MapMode;
  existingLocations: {
    origin?: LocationPayload | null;
    destination?: LocationPayload | null;
  };
  onSelect: (loc: LocationPayload) => void;
}) {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const marker = useRef<any>(null);

  useEffect(() => {
    loadGoogleMaps().then(() => {
      if (!mapRef.current) return;

      map.current = new window.google.maps.Map(mapRef.current, {
        center: { lat: 39.8283, lng: -98.5795 },
        zoom: 5,
      });
    

      // Show existing marker ONLY for active mode
      const existing = existingLocations[mode];
      if (existing) {
        marker.current = new window.google.maps.Marker({
          map: map.current,
          position: {
            lat: existing.latitude,
            lng: existing.longitude,
          },
          label: mode === "origin" ? "O" : "D",
        });
      }

      map.current.addListener("click", async (e: any) => {
        if (marker.current) marker.current.setMap(null);

        marker.current = new window.google.maps.Marker({
          map: map.current,
          position: e.latLng,
          label: mode === "origin" ? "O" : "D",
        });

        const geocoder = new window.google.maps.Geocoder();
        const res = await geocoder.geocode({ location: e.latLng });
        const address = res.results?.[0]?.formatted_address || "";

        onSelect({
          locationName: address.split(",")[0] || address,
          address,
          latitude: e.latLng.lat(),
          longitude: e.latLng.lng(),
        });
      });
    });

    return () => {
      if (marker.current) marker.current.setMap(null);
    };
  }, []);

  return (
    <div className="w-full h-[60vh] rounded-xl border overflow-hidden">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
}
