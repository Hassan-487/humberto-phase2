

// import { useEffect, useRef } from "react";
// import { loadGoogleMaps } from "@/lib/google-loader";

// type MapMode = "origin" | "pickup" | "destination";

// interface LocationPayload {
//   locationName: string;
//   address: string;
//   latitude: number;
//   longitude: number;
//   notes?: string;
// }

// interface Props {
//   mode: MapMode;
//   locations: {
//     originLocation?: LocationPayload | null;
//     pickupLocation?: LocationPayload | null;
//     destinationLocation?: LocationPayload | null;
//   };
//   onSelect: (loc: LocationPayload) => void;
// }

// export function LargeMapPicker({ mode, locations, onSelect }: Props) {
//   const mapRef = useRef<HTMLDivElement>(null);
//   const mapInstance = useRef<any>(null);
//   const markers = useRef<Record<string, any>>({});
  
//   // 🔥 FIX: Store the latest onSelect in a ref so the 
//   // click listener always uses the current mapMode
//   const onSelectRef = useRef(onSelect);
//   useEffect(() => {
//     onSelectRef.current = onSelect;
//   }, [onSelect]);

//   useEffect(() => {
//     loadGoogleMaps().then(() => {
//       if (!mapRef.current || mapInstance.current) return;

//       mapInstance.current = new window.google.maps.Map(mapRef.current, {
//         center: { lat: 30.3753, lng: 69.3451 },
//         zoom: 5,
//         gestureHandling: "greedy",
//       });

//       mapInstance.current.addListener("click", async (e: any) => {
//         const geocoder = new window.google.maps.Geocoder();
//         const res = await geocoder.geocode({ location: e.latLng });
//         const address = res.results?.[0]?.formatted_address || "";

//         const payload = {
//           locationName: address.split(",")[0] || address,
//           address,
//           latitude: e.latLng.lat(),
//           longitude: e.latLng.lng(),
//         };

//         // Call the current version of onSelect
//         onSelectRef.current(payload);
//       });
//     });
//   }, []);

//   useEffect(() => {
//     if (!mapInstance.current || !window.google) return;

//     const config = [
//       { key: "originLocation", label: "O" },
//       { key: "pickupLocation", label: "P" },
//       { key: "destinationLocation", label: "D" },
//     ] as const;

//     config.forEach(({ key, label }) => {
//       const loc = (locations as any)[key];

//       if (loc && loc.latitude && loc.longitude) {
//         const pos = { lat: loc.latitude, lng: loc.longitude };

//         if (!markers.current[key]) {
//           markers.current[key] = new window.google.maps.Marker({
//             position: pos,
//             map: mapInstance.current,
//             label: label,
//           });
//         } else {
//           markers.current[key].setPosition(pos);
//           markers.current[key].setMap(mapInstance.current);
//         }
//       }
//     });
//   }, [locations]);

//   return (
//     <div className="w-full h-[60vh] rounded-xl border overflow-hidden">
//       <div ref={mapRef} className="w-full h-full" />
//     </div>
//   );
// }








// import { useEffect, useRef } from "react";
// import { loadGoogleMaps } from "@/lib/google-loader";

// type MapMode = "origin" | "destination";

// interface LocationPayload {
//   locationName: string;
//   address: string;
//   latitude: number;
//   longitude: number;
//   notes?: string;
// }

// interface Props {
//   mode: MapMode;
//   locations: {
//     originLocation?: LocationPayload | null;
//     destinationLocation?: LocationPayload | null;
//   };
//   onSelect: (loc: LocationPayload) => void;
// }

// export function LargeMapPicker({ mode, locations, onSelect }: Props) {
//   const mapRef = useRef<HTMLDivElement>(null);
//   const mapInstance = useRef<any>(null);
//   const markers = useRef<Record<string, any>>({});
//   const onSelectRef = useRef(onSelect);

//   useEffect(() => {
//     onSelectRef.current = onSelect;
//   }, [onSelect]);

//   useEffect(() => {
//     loadGoogleMaps().then(() => {
//       if (!mapRef.current || mapInstance.current) return;

//       mapInstance.current = new window.google.maps.Map(mapRef.current, {
//         center: { lat: 30.3753, lng: 69.3451 },
//         zoom: 5,
//         gestureHandling: "greedy",
//       });

//       mapInstance.current.addListener("click", async (e: any) => {
//         const geocoder = new window.google.maps.Geocoder();
//         const res = await geocoder.geocode({ location: e.latLng });
//         const address = res.results?.[0]?.formatted_address || "";

//         onSelectRef.current({
//           locationName: address.split(",")[0] || address,
//           address,
//           latitude: e.latLng.lat(),
//           longitude: e.latLng.lng(),
//         });
//       });
//     });
//   }, []);

//   useEffect(() => {
//     if (!mapInstance.current || !window.google) return;

//     const bounds = new window.google.maps.LatLngBounds();

//     if (locations.originLocation) {
//       const pos = {
//         lat: locations.originLocation.latitude,
//         lng: locations.originLocation.longitude,
//       };

//       if (!markers.current.origin) {
//         markers.current.origin = new window.google.maps.Marker({
//           map: mapInstance.current,
//           label: "O",
//         });
//       }

//       markers.current.origin.setPosition(pos);
//       bounds.extend(pos);
//     }

//     if (locations.destinationLocation) {
//       const pos = {
//         lat: locations.destinationLocation.latitude,
//         lng: locations.destinationLocation.longitude,
//       };

//       if (!markers.current.destination) {
//         markers.current.destination = new window.google.maps.Marker({
//           map: mapInstance.current,
//           label: "D",
//         });
//       }

//       markers.current.destination.setPosition(pos);
//       bounds.extend(pos);
//     }

//     if (!bounds.isEmpty()) {
//       mapInstance.current.fitBounds(bounds);
//     }
//   }, [locations]);

//   return (
//     <div className="w-full h-[60vh] rounded-xl border overflow-hidden">
//       <div ref={mapRef} className="w-full h-full" />
//     </div>
//   );
// }





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
