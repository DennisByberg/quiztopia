import mapboxgl, { Map as MapGl } from "mapbox-gl";

/**
 * Add a marker and question to Mapbox.
 * @param marker - The Mapbox GL marker instance.
 * @param map - The Mapbox GL map.
 * @param question - The text of the question.
 * @param answer - The text of the answer.
 * @param latitude - The latitude coordinate for the marker's position.
 * @param longitude - The longitude coordinate for the marker's position.
 */
export function addMarkerAndQuestionToMap(
  marker: mapboxgl.Marker | null,
  map: MapGl,
  question: string,
  answer: string,
  latitude: number,
  longitude: number
) {
  // Create a new marker at the specified location
  marker = new mapboxgl.Marker({ color: "orange" });
  marker.setLngLat([Number(longitude), Number(latitude)]);

  // Add the marker to the map
  marker.addTo(map);

  // Create a popup with the question and answer text
  marker
    .setPopup(
      new mapboxgl.Popup().setHTML(
        `<h2 style="color: black;">${question} Svar: ${answer}</h2>`
      )
    )
    .addTo(map);
}
