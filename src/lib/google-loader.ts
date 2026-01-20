let isLoading = false;
let isLoaded = false;

export function loadGoogleMaps(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (isLoaded) return resolve();

    if (isLoading) {
      const interval = setInterval(() => {
        if (isLoaded) {
          clearInterval(interval);
          resolve();
        }
      }, 50);
      return;
    }

    isLoading = true;

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${
      import.meta.env.VITE_GOOGLE_MAPS_KEY
    }&libraries=places`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      isLoaded = true;
      resolve();
    };

    script.onerror = reject;

    document.head.appendChild(script);
  });
}
