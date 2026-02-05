// let isLoading = false;
// let isLoaded = false;

// export function loadGoogleMaps(): Promise<void> {
//   return new Promise((resolve, reject) => {
//     if (isLoaded) return resolve();

//     if (isLoading) {
//       const interval = setInterval(() => {
//         if (isLoaded) {
//           clearInterval(interval);
//           resolve();
//         }
//       }, 50);
//       return;
//     }

//     isLoading = true;

//     const script = document.createElement("script");
//     script.src = `https://maps.googleapis.com/maps/api/js?key=${
//       import.meta.env.VITE_GOOGLE_MAPS_KEY
//     }&libraries=places`;
//     script.async = true;
//     script.defer = true;

//     script.onload = () => {
//       isLoaded = true;
//       resolve();
//     };

//     script.onerror = reject;

//     document.head.appendChild(script);
//   });
// }


let isLoading = false;
let isLoaded = false;

export function loadGoogleMaps(): Promise<void> {
  return new Promise((resolve, reject) => {
    // Already loaded
    if (isLoaded && window.google?.maps) {
      resolve();
      return;
    }

    // Already loading → wait
    if (isLoading) {
      const interval = setInterval(() => {
        if (isLoaded && window.google?.maps) {
          clearInterval(interval);
          resolve();
        }
      }, 50);
      return;
    }

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_KEY;

    if (!apiKey) {
      reject(new Error("Google Maps API key is missing"));
      return;
    }

    isLoading = true;

    const script = document.createElement("script");
    script.src =
      `https://maps.googleapis.com/maps/api/js` +
      `?key=${apiKey}` +
      `&libraries=places,marker`; // 🔥 marker added
    script.async = true;
    script.defer = true;

    script.onload = () => {
      isLoaded = true;
      resolve();
    };

    script.onerror = (err) => {
      isLoading = false;
      reject(err);
    };

    document.head.appendChild(script);
  });
}
