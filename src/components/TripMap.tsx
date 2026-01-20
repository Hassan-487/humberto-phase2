// export function TripMap({ lat, lng }: { lat: number; lng: number }) {
//   const mapUrl = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
  
//   return (
//     <div className="w-full h-48 rounded-lg overflow-hidden border border-border mt-4">
//       <iframe
//         width="100%"
//         height="100%"
//         src={mapUrl}
//         className="grayscale contrast-125"
//       ></iframe>
//     </div>
//   );
// }

// export function TripMap({ 
//   origin, 
//   destination, 
//   current 
// }: { 
//   origin?: { lat: number, lng: number }, 
//   destination?: { lat: number, lng: number }, 
//   current?: { lat: number, lng: number } 
// }) {
  
//   // Constructing a Static Maps or Embed URL with markers
//   // For a simple embed, we center on the current location, but for 
//   // professional view, we'd usually use the Javascript API.
//   // This version shows current location as the primary focus.
  
//   const lat = current?.lat || origin?.lat || 0;
//   const lng = current?.lng || origin?.lng || 0;

//   const mapUrl = `https://www.google.com/maps/embed/v1/view?key=AIzaSyDdoEK5Fkuee0WnosCH5PoUspKrLDkFqIk&center=${lat},${lng}&zoom=6&maptype=roadmap`;
  
//   // NOTE: To show 3 distinct markers in an iframe, the URL format changes slightly:
//   // src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyDdoEK5Fkuee0WnosCH5PoUspKrLDkFqIk&origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}`}

//   return (
//     <div className="w-full h-48 rounded-lg overflow-hidden border border-border mt-4">
//       <iframe
//         width="100%"
//         height="100%"
//         loading="lazy"
//         src={mapUrl}
//         className="grayscale contrast-125"
//       ></iframe>
//     </div>
//   );
// }