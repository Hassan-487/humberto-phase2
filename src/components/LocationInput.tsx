// import React, { useRef, useEffect } from "react";
// import { Input } from "@/components/ui/input";

// declare global {
//   interface Window {
//     google: any;
//   }
// }

// interface LocationData {
//   address: string;
//   latitude: number;
//   longitude: number;
// }

// interface Props {
//   placeholder: string;
//   onLocationSelect: (data: LocationData) => void;
//   defaultValue?: string;
// }

// export function LocationInput({ placeholder, onLocationSelect, defaultValue }: Props) {
//   const inputRef = useRef<HTMLInputElement>(null);

//  useEffect(() => {
//   // Function to initialize autocomplete
//   const initAutocomplete = () => {
//     if (!window.google || !inputRef.current) return;

//     const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
//       types: ["address", "geocode"],
//     });

//     autocomplete.addListener("place_changed", () => {
//       const place = autocomplete.getPlace();
//       if (!place.geometry || !place.geometry.location) return;

//       onLocationSelect({
//         address: place.formatted_address || place.name || "",
//         latitude: place.geometry.location.lat(),
//         longitude: place.geometry.location.lng(),
//       });
//     });
//   };

//   // If google is already loaded, init; otherwise, wait for the window load event
//   if (window.google) {
//     initAutocomplete();
//   } else {
//     window.addEventListener('load', initAutocomplete);
//     return () => window.removeEventListener('load', initAutocomplete);
//   }
// }, [onLocationSelect]);
//   return <Input ref={inputRef} placeholder={placeholder} defaultValue={defaultValue} required />;
// }

import { useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { loadGoogleMaps } from "@/lib/google-loader";

declare global {
  interface Window {
    google: any;
  }
}

interface LocationData {
  address: string;
  latitude: number;
  longitude: number;
}

interface Props {
  placeholder: string;
  onLocationSelect: (data: LocationData) => void;
}

export function LocationInput({ placeholder, onLocationSelect }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadGoogleMaps().then(() => {
      if (!window.google || !inputRef.current) return;

      const autocomplete =
        new window.google.maps.places.Autocomplete(inputRef.current);

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) return;

        onLocationSelect({
          address: place.formatted_address,
          latitude: place.geometry.location.lat(),
          longitude: place.geometry.location.lng(),
        });
      });
    });
  }, []);

  return <Input ref={inputRef} placeholder={placeholder} required />;
}
