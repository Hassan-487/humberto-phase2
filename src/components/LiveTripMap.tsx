
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

      // Trigger resize after map is loaded
      setTimeout(() => {
        if (mapInstance.current) {
          window.google.maps.event.trigger(mapInstance.current, "resize");
          mapInstance.current.setCenter({
            lat: Number(current.latitude),
            lng: Number(current.longitude),
          });
        }
      }, 400);
    });

    return () => {
      isMounted = false;
      mapInstance.current = null;
      truckMarker.current = null;
    };
  }, []); // Empty dependency array - initialize once

  // UPDATE TRUCK POSITION
  // useEffect(() => {
  //   if (!mapInstance.current || !current) return;

  //   const truckPos = {
  //     lat: Number(current.latitude),
  //     lng: Number(current.longitude),
  //   };

  //   if (!truckMarker.current) {
  //     truckMarker.current = new window.google.maps.Marker({
  //       map: mapInstance.current,
  //       position: truckPos,
  //       title: "Current Location",
  //       animation: window.google.maps.Animation.DROP,
  //     });
  //   } else {
  //     truckMarker.current.setPosition(truckPos);
  //   }

  //   // Center map on current location
  //   mapInstance.current.setCenter(truckPos);
  // }, [current]);
useEffect(() => {
  if (!mapInstance.current || !current) return;

  const { AdvancedMarkerElement } = window.google.maps.marker || {};
  if (!AdvancedMarkerElement) return;

  const truckPos = {
    lat: Number(current.latitude),
    lng: Number(current.longitude),
  };

  // CREATE MARKER ONCE
  if (!truckMarker.current) {
    truckMarker.current = new AdvancedMarkerElement({
      map: mapInstance.current,
      position: truckPos,
      title: "Current Location",
    });
  }
  // UPDATE POSITION
  else {
    truckMarker.current.position = truckPos;
  }

  // Smooth center update
  mapInstance.current.panTo(truckPos);
}, [current]);

  return (
    <div
      ref={mapRef}
      className="h-full w-full rounded-lg border bg-muted"
    />
  );
}