/**
 * Asynchronously retrieves the current geolocation position.
 * @returns {Promise<Position>} A Promise that resolves with the geolocation position.
 */
export async function getCurrentPosition(): Promise<IPosition> {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      const geo = navigator.geolocation;
      geo.getCurrentPosition(
        (pos) => {
          const position: IPosition = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          };
          resolve(position);
        },
        (error) => {
          reject(error.message);
        }
      );
    } else {
      reject("Error, cant use this in your browser...");
    }
  });
}
