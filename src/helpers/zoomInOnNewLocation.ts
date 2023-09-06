import { LngLat, Map as MapGl } from "mapbox-gl";

/**
 * Zooms and centers the map on a new location.
 * @param {MapGl | null} map - The MapboxGL map object (or null if not available).
 * @param {number} lat - The latitude of the new location.
 * @param {number} lon - The longitude of the new location.
 */
export function zoomInOnNewLocation(
  map: MapGl | null,
  lat: number,
  lon: number
) {
  if (map === null) return;
  const newCenter = new LngLat(Number(lon), Number(lat));

  map.flyTo({
    center: newCenter, // Set the new center coordinates
    zoom: 10, // Zoom level.
    duration: 2000, // Set the animation duration in milliseconds.
  });
}
