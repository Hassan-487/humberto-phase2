

import { useEffect, useRef } from "react";
import { loadGoogleMaps } from "@/lib/google-loader";

interface Location {
  latitude: number;
  longitude: number;
}

interface MapProps {
  current: Location;
}

export function LiveTripMap({ current }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const truckMarker = useRef<any>(null);

  console.log("LiveTripMap render", { current });

  // INITIALIZE MAP
  useEffect(() => {
    let isMounted = true;

    loadGoogleMaps().then(() => {
      if (!isMounted || !mapRef.current) return;

      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        center: {
          lat: Number(current.latitude),
          lng: Number(current.longitude),
        },
        zoom: 14,
        disableDefaultUI: true,
        zoomControl: true,
      });

      // ✅ CREATE MARKER IMMEDIATELY AFTER MAP LOAD
      const truckPos = {
        lat: Number(current.latitude),
        lng: Number(current.longitude),
      };

      truckMarker.current = new window.google.maps.Marker({
        map: mapInstance.current,
        position: truckPos,
        title: "Current Location",
        icon: {
          url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
          scaledSize: new window.google.maps.Size(40, 40),
        },
      });

      // Trigger resize after map is loaded
      setTimeout(() => {
        if (mapInstance.current) {
          window.google.maps.event.trigger(mapInstance.current, "resize");
          mapInstance.current.setCenter(truckPos);
        }
      }, 400);
    });

    return () => {
      isMounted = false;
      mapInstance.current = null;
      truckMarker.current = null;
    };
  }, []); // initialize once

  // UPDATE TRUCK POSITION (when GPS changes)
  useEffect(() => {
    if (!mapInstance.current || !truckMarker.current || !current) return;

    const truckPos = {
      lat: Number(current.latitude),
      lng: Number(current.longitude),
    };

    truckMarker.current.setPosition(truckPos);
    mapInstance.current.panTo(truckPos);
  }, [current]);

  return (
    <div
      ref={mapRef}
      className="h-full w-full rounded-lg border bg-muted"
    />
  );
}
