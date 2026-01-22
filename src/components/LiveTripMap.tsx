// import { useEffect, useRef } from "react";
// import { loadGoogleMaps } from "@/lib/google-loader";

// interface MapProps {
//   destination: any;
//   current: any;
// }

// export function LiveTripMap({ destination, current }: MapProps) {
//   const mapRef = useRef<HTMLDivElement>(null);
//   const mapInstance = useRef<any>(null);
//   const truckMarker = useRef<any>(null);
//   const directionsRenderer = useRef<any>(null);

//   useEffect(() => {
//     loadGoogleMaps().then(() => {
//       if (!mapRef.current || mapInstance.current) return;

//       // Initialize Map
//       mapInstance.current = new window.google.maps.Map(mapRef.current, {
//         zoom: 12,
//         disableDefaultUI: true,
//         zoomControl: true,
//       });

//       // Initialize Directions Renderer (The Blue Line)
//       directionsRenderer.current = new window.google.maps.DirectionsRenderer({
//         map: mapInstance.current,
//         suppressMarkers: true, // We will draw our own truck icon
//         polylineOptions: {
//           strokeColor: "#3b82f6",
//           strokeWeight: 5,
//           strokeOpacity: 0.6,
//         },
//       });

//       // Force resize fix for the "Gray Box" issue in Sheets
//       setTimeout(() => {
//         window.google.maps.event.trigger(mapInstance.current, "resize");
//       }, 500);
//     });
//   }, []);

//   useEffect(() => {
//     if (!mapInstance.current || !window.google || !current || !destination) return;

//     const truckPos = { lat: current.latitude, lng: current.longitude };
//     const destPos = { lat: destination.latitude, lng: destination.longitude };

//     // 1. Draw/Update Truck Marker
//     if (!truckMarker.current) {
//       truckMarker.current = new window.google.maps.Marker({
//         position: truckPos,
//         map: mapInstance.current,
//         label: "🚚",
//         title: "Current Location",
//       });
//     } else {
//       truckMarker.current.setPosition(truckPos);
//     }

//     // 2. Calculate and Display Route
//     const directionsService = new window.google.maps.DirectionsService();
//     directionsService.route(
//       {
//         origin: truckPos,
//         destination: destPos,
//         travelMode: window.google.maps.TravelMode.DRIVING,
//       },
//       (result: any, status: string) => {
//         if (status === "OK") {
//           directionsRenderer.current.setDirections(result);
//         }
//       }
//     );
//   }, [current, destination]);

//   return <div ref={mapRef} className="h-full w-full rounded-lg border bg-muted" />;
// }



import { useEffect, useRef } from "react";
import { loadGoogleMaps } from "@/lib/google-loader";

interface Location {
  latitude: number;
  longitude: number;
}

interface MapProps {
  destination: Location;
  current: Location;
}

export function LiveTripMap({ destination, current }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);

  const truckMarker = useRef<any>(null);
  const destinationMarker = useRef<any>(null);
  const directionsRenderer = useRef<any>(null);
console.log("LiveTripMap render", { current, destination });

  // =========================
  // 1️⃣ INIT MAP (ONCE)
  // =========================
  useEffect(() => {
    loadGoogleMaps().then(() => {
      if (!mapRef.current || mapInstance.current) return;

      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        center: {
          lat: Number(current?.latitude) || 30.3753,
          lng: Number(current?.longitude) || 69.3451,
        },
        zoom: 12,
        disableDefaultUI: true,
        zoomControl: true,
      });

      directionsRenderer.current = new window.google.maps.DirectionsRenderer({
        map: mapInstance.current,
        suppressMarkers: true,
        polylineOptions: {
          strokeColor: "#3b82f6",
          strokeWeight: 5,
          strokeOpacity: 0.6,
        },
      });

      // Sheet resize fix
      setTimeout(() => {
        window.google.maps.event.trigger(mapInstance.current, "resize");
      }, 300);
    });
  }, []);

  // =========================
  // 2️⃣ DRAW ROUTE (ONLY WHEN DESTINATION CHANGES)
  // =========================
  useEffect(() => {
    if (!mapInstance.current || !destination || !current) return;

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: {
          lat: Number(current.latitude),
          lng: Number(current.longitude),
        },
        destination: {
          lat: Number(destination.latitude),
          lng: Number(destination.longitude),
        },
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result: any, status: string) => {
        if (status === "OK") {
          directionsRenderer.current.setDirections(result);
        }
      }
    );

    // Destination marker
    if (!destinationMarker.current) {
      destinationMarker.current = new window.google.maps.Marker({
        map: mapInstance.current,
        label: "D",
      });
    }

    destinationMarker.current.setPosition({
      lat: destination.latitude,
      lng: destination.longitude,
    });
  }, [destination]);

  // =========================
  // 3️⃣ MOVE TRUCK (EVERY GPS UPDATE)
  // =========================
  useEffect(() => {
    if (!mapInstance.current || !current) return;

    const truckPos = {
      lat: Number(current.latitude),
      lng: Number(current.longitude),
    };

    if (!truckMarker.current) {
      truckMarker.current = new window.google.maps.Marker({
        map: mapInstance.current,
        position: truckPos,
        label: "🚚",
        title: "Current Location",
      });
    } else {
      truckMarker.current.setPosition(truckPos);
    }
  }, [current]);

  return (
    <div
      ref={mapRef}
      className="h-full w-full rounded-lg border bg-muted"
    />
  );
}
