



// import { useEffect, useRef } from "react";
// import { loadGoogleMaps } from "@/lib/google-loader";

// type MapMode = "origin" | "destination";

// interface LocationPayload {
//   locationName: string;
//   address: string;
//   latitude: number;
//   longitude: number;
// }

// declare global {
//   interface Window {
//     google: any;
//   }
// }

// export function LargeMapPicker({
//   mode,
//   existingLocations,
//   onSelect,
// }: {
//   mode: MapMode;
//   existingLocations: {
//     origin?: LocationPayload | null;
//     destination?: LocationPayload | null;
//   };
//   onSelect: (loc: LocationPayload) => void;
// }) {
//   const mapRef = useRef<HTMLDivElement>(null);
//   const searchRef = useRef<HTMLInputElement>(null);
//   const map = useRef<any>(null);
//   const marker = useRef<any>(null);

//   useEffect(() => {
//     loadGoogleMaps().then(() => {
//       if (!mapRef.current) return;

//       /* ================= MAP INIT ================= */
//       map.current = new window.google.maps.Map(mapRef.current, {
//         center: { lat: 23.6345, lng: -102.5528 }, // Mexico
//         zoom: 6,
//       });

//       /* ================= EXISTING MARKER ================= */
//       const existing = existingLocations[mode];
//       if (existing) {
//         marker.current = new window.google.maps.Marker({
//           map: map.current,
//           position: {
//             lat: existing.latitude,
//             lng: existing.longitude,
//           },
//           label: mode === "origin" ? "O" : "D",
//         });

//         map.current.panTo({
//           lat: existing.latitude,
//           lng: existing.longitude,
//         });
//         map.current.setZoom(14);
//       }

//       /* ================= AUTOCOMPLETE SEARCH ================= */
//       if (searchRef.current) {
//         const autocomplete = new window.google.maps.places.Autocomplete(
//           searchRef.current,
//           {
//             fields: ["geometry", "formatted_address", "name"],
//           }
//         );

//         autocomplete.addListener("place_changed", () => {
//           const place = autocomplete.getPlace();
//           if (!place.geometry) return;

//           const lat = place.geometry.location.lat();
//           const lng = place.geometry.location.lng();
//           const address = place.formatted_address || place.name || "";

//           if (marker.current) marker.current.setMap(null);

//           marker.current = new window.google.maps.Marker({
//             map: map.current,
//             position: { lat, lng },
//             label: mode === "origin" ? "O" : "D",
//           });

//           map.current.panTo({ lat, lng });
//           map.current.setZoom(15);

//           onSelect({
//             locationName: address.split(",")[0] || address,
//             address,
//             latitude: lat,
//             longitude: lng,
//           });
//         });
//       }

//       /* ================= MAP CLICK ================= */
//       map.current.addListener("click", async (e: any) => {
//         if (marker.current) marker.current.setMap(null);

//         marker.current = new window.google.maps.Marker({
//           map: map.current,
//           position: e.latLng,
//           label: mode === "origin" ? "O" : "D",
//         });

//         const geocoder = new window.google.maps.Geocoder();
//         const res = await geocoder.geocode({ location: e.latLng });
//         const address = res.results?.[0]?.formatted_address || "";

//         onSelect({
//           locationName: address.split(",")[0] || address,
//           address,
//           latitude: e.latLng.lat(),
//           longitude: e.latLng.lng(),
//         });
//       });
//     });

//     return () => {
//       if (marker.current) marker.current.setMap(null);
//     };
//   }, [mode]);

//   return (
//     <div className="w-full h-[60vh] rounded-xl border overflow-hidden relative">
//       {/* 🔍 SEARCH BAR */}
//       <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 w-[90%]">
//         <input
//           ref={searchRef}
//           type="text"
//           placeholder="Search location..."
//           className="
//             w-full h-10 px-4 text-sm
//             rounded-md border border-input
//             shadow bg-white
//             focus:outline-none focus:ring-2 focus:ring-primary
//           "
//         />
//       </div>

//       {/* MAP */}
//       <div ref={mapRef} className="w-full h-full" />
//     </div>
//   );
// }

import { useEffect, useRef } from "react";
import { loadGoogleMaps } from "@/lib/google-loader";

type MapMode = "origin" | "destination" | "end";

interface LocationPayload {
  locationName: string;
  address: string;
  latitude: number;
  longitude: number;
}

declare global {
  interface Window {
    google: any;
  }
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
    end?: LocationPayload | null;
  };
  onSelect: (loc: LocationPayload) => void;
}) {

  const mapRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const map = useRef<any>(null);
  const marker = useRef<any>(null);

  useEffect(() => {

    loadGoogleMaps().then(() => {

      if (!mapRef.current) return;

      /* ================= MAP INIT ================= */

      map.current = new window.google.maps.Map(mapRef.current, {
        center: { lat: 23.6345, lng: -102.5528 }, // Mexico
        zoom: 6,
      });

      /* ================= EXISTING MARKER ================= */

      const existing = existingLocations[mode];

      if (existing) {

        marker.current = new window.google.maps.Marker({
          map: map.current,
          position: {
            lat: existing.latitude,
            lng: existing.longitude,
          },
          label:
            mode === "origin"
              ? "O"
              : mode === "destination"
              ? "D"
              : "E",
        });

        map.current.panTo({
          lat: existing.latitude,
          lng: existing.longitude,
        });

        map.current.setZoom(14);
      }

      /* ================= AUTOCOMPLETE SEARCH ================= */

      if (searchRef.current) {

        const autocomplete = new window.google.maps.places.Autocomplete(
          searchRef.current,
          {
            fields: ["geometry", "formatted_address", "name"],
          }
        );

        autocomplete.addListener("place_changed", () => {

          const place = autocomplete.getPlace();
          if (!place.geometry) return;

          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          const address = place.formatted_address || place.name || "";

          if (marker.current) marker.current.setMap(null);

          marker.current = new window.google.maps.Marker({
            map: map.current,
            position: { lat, lng },
            label:
              mode === "origin"
                ? "O"
                : mode === "destination"
                ? "D"
                : "E",
          });

          map.current.panTo({ lat, lng });
          map.current.setZoom(15);

          onSelect({
            locationName: address.split(",")[0] || address,
            address,
            latitude: lat,
            longitude: lng,
          });
        });
      }

      /* ================= MAP CLICK ================= */

      map.current.addListener("click", async (e: any) => {

        if (marker.current) marker.current.setMap(null);

        marker.current = new window.google.maps.Marker({
          map: map.current,
          position: e.latLng,
          label:
            mode === "origin"
              ? "O"
              : mode === "destination"
              ? "D"
              : "E",
        });

        const geocoder = new window.google.maps.Geocoder();

        const res = await geocoder.geocode({
          location: e.latLng,
        });

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

  }, [mode]);

  return (
    <div className="w-full h-[60vh] rounded-xl border overflow-hidden relative">

      {/* SEARCH BAR */}

      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 w-[90%]">

        <input
          ref={searchRef}
          type="text"
          placeholder="Search location..."
          className="
            w-full h-10 px-4 text-sm
            rounded-md border border-input
            shadow bg-white
            focus:outline-none focus:ring-2 focus:ring-primary
          "
        />

      </div>

      {/* MAP */}

      <div ref={mapRef} className="w-full h-full" />

    </div>
  );
}