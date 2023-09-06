import mapboxgl, { Map as MapGl } from "mapbox-gl";

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
