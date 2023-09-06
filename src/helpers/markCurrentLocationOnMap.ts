import { getCurrentPosition } from "./getCurrentPosition";
import mapboxgl, { Map as MapGl } from "mapbox-gl";

/**
 * Marks the current location on a MapboxGL map with a marker and displays a popup.
 * @param {MapGl | null} map - The MapboxGL map object (or null if not available).
 * @param {mapboxgl.Marker | null} marker - The MapboxGL marker object (or null if not available).
 */
export async function markCurrentLocationOnMap(
  map: MapGl | null,
  marker: mapboxgl.Marker | null
) {
  // Get the current position (latitude and longitude)
  const position = await getCurrentPosition();
  const { latitude, longitude } = position;

  // Create a marker at the current location.
  if (map) {
    marker = new mapboxgl.Marker({ color: "red" })
      .setLngLat([longitude, latitude])
      .addTo(map);
  } else {
    // TODO: Handle the case when the map object is not available.
  }

  // Create a popup.
  const popup = new mapboxgl.Popup({
    offset: 25,
    closeButton: false,
  }).setHTML("<h2 style='color: black;'>You are here!</h2>");

  // Add the popup to the map and specify its coordinates.
  if (map) {
    popup.addTo(map).setLngLat([longitude, latitude]);
  } else {
    // TODO: Handle the case when the map object is not available.
  }
}
