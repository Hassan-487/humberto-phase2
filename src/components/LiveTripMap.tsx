
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


//  useEffect(() => {
//   let isMounted = true;

//   loadGoogleMaps().then(() => {
//     if (!isMounted || !mapRef.current) return;

   
//     mapInstance.current = new window.google.maps.Map(mapRef.current, {
//       center: {
//         lat: Number(current.latitude),
//         lng: Number(current.longitude),
//       },
//       zoom: 13,
//       disableDefaultUI: true,
//       zoomControl: true,
//     });

//     directionsRenderer.current = new window.google.maps.DirectionsRenderer({
//       map: mapInstance.current,
//       suppressMarkers: true,
//       polylineOptions: {
//         strokeColor: "#3b82f6",
//         strokeWeight: 5,
//         strokeOpacity: 0.7,
//       },
//     });

 
//     setTimeout(() => {
//       window.google.maps.event.trigger(mapInstance.current, "resize");
//       mapInstance.current.setCenter({
//         lat: Number(current.latitude),
//         lng: Number(current.longitude),
//       });
//     }, 400);
//   });

//   return () => {
//     isMounted = false;
//     mapInstance.current = null;
//     truckMarker.current = null;
//     destinationMarker.current = null;
//     directionsRenderer.current = null;
//   };
// }, [current, destination]);


useEffect(() => {
  let isMounted = true;

  loadGoogleMaps().then(() => {
    if (!isMounted || !mapRef.current) return;

    mapInstance.current = new window.google.maps.Map(mapRef.current, {
      center: {
        lat: Number(current.latitude),
        lng: Number(current.longitude),
      },
      zoom: 13,
      disableDefaultUI: true,
      zoomControl: true,
    });

    directionsRenderer.current = new window.google.maps.DirectionsRenderer({
      map: mapInstance.current,
      suppressMarkers: true,
      polylineOptions: {
        strokeColor: "#3b82f6",
        strokeWeight: 5,
        strokeOpacity: 0.7,
      },
    });

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
    // Properly clean up Google Maps objects
    if (truckMarker.current) {
      truckMarker.current.setMap(null);
      truckMarker.current = null;
    }
    if (destinationMarker.current) {
      destinationMarker.current.setMap(null);
      destinationMarker.current = null;
    }
    if (directionsRenderer.current) {
      directionsRenderer.current.setMap(null);
      directionsRenderer.current = null;
    }
    // Let mapInstance be garbage collected naturally
  };
}, []); // ✅ EMPTY ARRAY - only run once on mount


useEffect(() => {
 
  if (
    !mapInstance.current ||
    !directionsRenderer.current ||
    !current ||
    !destination
  ) {
    return;
  }

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
      if (status === window.google.maps.DirectionsStatus.OK) {
        directionsRenderer.current!.setDirections(result);
      }
    }
  );

 
  if (!destinationMarker.current) {
    destinationMarker.current = new window.google.maps.Marker({
      map: mapInstance.current,
      label: "D",
    });
  }

  destinationMarker.current.setPosition({
    lat: Number(destination.latitude),
    lng: Number(destination.longitude),
  });
}, [destination, current]); 


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
