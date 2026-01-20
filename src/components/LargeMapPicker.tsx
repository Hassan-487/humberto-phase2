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

//         onSelect(payload);
//       });
//     });
//   }, []);

//   // 🔥 Persist markers for ALL locations
//   useEffect(() => {
//     if (!mapInstance.current) return;

//     (["originLocation", "pickupLocation", "destinationLocation"] as const).forEach(
//       (key) => {
//         const loc = locations[key];
//         if (!loc) return;

//         if (!markers.current[key]) {
//           markers.current[key] = new window.google.maps.Marker({
//             map: mapInstance.current,
//             label:
//               key === "originLocation"
//                 ? "O"
//                 : key === "pickupLocation"
//                 ? "P"
//                 : "D",
//           });
//         }

//         markers.current[key].setPosition({
//           lat: loc.latitude,
//           lng: loc.longitude,
//         });
//       }
//     );
//   }, [locations]);

//   return (
//     <div className="w-full h-[60vh] rounded-xl border overflow-hidden">
//       <div ref={mapRef} className="w-full h-full" />
//     </div>
//   );
// }

import { useEffect, useRef } from "react";
import { loadGoogleMaps } from "@/lib/google-loader";

type MapMode = "origin" | "pickup" | "destination";

interface LocationPayload {
  locationName: string;
  address: string;
  latitude: number;
  longitude: number;
  notes?: string;
}

interface Props {
  mode: MapMode;
  locations: {
    originLocation?: LocationPayload | null;
    pickupLocation?: LocationPayload | null;
    destinationLocation?: LocationPayload | null;
  };
  onSelect: (loc: LocationPayload) => void;
}

export function LargeMapPicker({ mode, locations, onSelect }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markers = useRef<Record<string, any>>({});
  
  // 🔥 FIX: Store the latest onSelect in a ref so the 
  // click listener always uses the current mapMode
  const onSelectRef = useRef(onSelect);
  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  useEffect(() => {
    loadGoogleMaps().then(() => {
      if (!mapRef.current || mapInstance.current) return;

      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        center: { lat: 30.3753, lng: 69.3451 },
        zoom: 5,
        gestureHandling: "greedy",
      });

      mapInstance.current.addListener("click", async (e: any) => {
        const geocoder = new window.google.maps.Geocoder();
        const res = await geocoder.geocode({ location: e.latLng });
        const address = res.results?.[0]?.formatted_address || "";

        const payload = {
          locationName: address.split(",")[0] || address,
          address,
          latitude: e.latLng.lat(),
          longitude: e.latLng.lng(),
        };

        // Call the current version of onSelect
        onSelectRef.current(payload);
      });
    });
  }, []);

  useEffect(() => {
    if (!mapInstance.current || !window.google) return;

    const config = [
      { key: "originLocation", label: "O" },
      { key: "pickupLocation", label: "P" },
      { key: "destinationLocation", label: "D" },
    ] as const;

    config.forEach(({ key, label }) => {
      const loc = (locations as any)[key];

      if (loc && loc.latitude && loc.longitude) {
        const pos = { lat: loc.latitude, lng: loc.longitude };

        if (!markers.current[key]) {
          markers.current[key] = new window.google.maps.Marker({
            position: pos,
            map: mapInstance.current,
            label: label,
          });
        } else {
          markers.current[key].setPosition(pos);
          markers.current[key].setMap(mapInstance.current);
        }
      }
    });
  }, [locations]);

  return (
    <div className="w-full h-[60vh] rounded-xl border overflow-hidden">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
}