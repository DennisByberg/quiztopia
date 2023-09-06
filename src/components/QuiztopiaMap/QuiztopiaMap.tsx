import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useEffect, useState, useRef } from "react";
import mapboxgl, { LngLat, Map as MapGl } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./QuiztopiaMap.scss";
import { zoomInOnNewLocation } from "../../helpers/zoomInOnNewLocation";
import { markCurrentLocationOnMap } from "../../helpers/markCurrentLocationOnMap";
import { addMarkerAndQuestionToMap } from "../../helpers/addMarkerAndQuestionToMap";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN as string;

function QuiztopiaMap({ userQuizzes }: IQuiztopiaMapProps) {
  const mapContainer = useRef(null);
  const mapGL = useRef<MapGl | null>(null);
  const mapMarker = useRef<mapboxgl.Marker | null>(null);

  const [lat, setLat] = useState<number>(57.6);
  const [lng, setLng] = useState<number>(12);
  const [zoom, setZoom] = useState<number>(7);

  const loggedInUser = useSelector(
    (state: RootState) => state.user.loggedInUser
  );
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is not logged in, if the user is not logged in, redirect them to the home page to make them sign in.
    if (!loggedInUser) {
      navigate("/");
    }

    if (mapGL.current || !mapContainer.current) return;

    // Create a new MapboxGL map and set its initial properties.
    mapGL.current = new MapGl({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    // Add a "move" event listener to the map to track map movement.
    mapGL.current?.on("move", () => {
      const position: LngLat = mapGL.current?.getCenter() || new LngLat(0, 0);
      setLat(Number(position.lat.toFixed(4)));
      setLng(Number(position.lng.toFixed(4)));
      setZoom(mapGL.current?.getZoom() || 0);
    });

    markCurrentLocationOnMap(mapGL.current, mapMarker.current);
  }, [lat, lng, zoom]);

  useEffect(() => {
    userQuizzes.forEach((userQuiz: IUserQuizzes) => {
      if (mapGL.current === null) return;

      addMarkerAndQuestionToMap(
        mapMarker.current,
        mapGL.current,
        userQuiz.question,
        userQuiz.answer,
        userQuiz.location.latitude,
        userQuiz.location.longitude
      );

      zoomInOnNewLocation(
        mapGL.current,
        userQuiz.location.latitude,
        userQuiz.location.longitude
      );
    });
  }, [userQuizzes]);

  return (
    <section className="quiztopia-map">
      <div ref={mapContainer} className="quiztopia-map__container" />
      <p>
        Center position: {lat} lat, {lng} lng
      </p>
    </section>
  );
}
export default QuiztopiaMap;
