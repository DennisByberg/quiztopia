import "./QuizTopiaGame.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useEffect, useState, useRef } from "react";
import mapboxgl, { Map as MapGl } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
// import { getPosition } from "../../Data/GetPosition";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN as string;

function QuizTopiaGame() {
  // MAP
  const mapContainer = useRef(null);
  const mapRef = useRef<MapGl | null>(null);
  const [lat, setLat] = useState<number>(57.7);
  const [lng, setLng] = useState<number>(11.89);
  const [zoom, setZoom] = useState<number>(10);

  // OTHER
  const userName = useSelector((state: RootState) => state.user.loggedInUser);
  // const token = useSelector((state: RootState) => state.user.loggedInToken);
  const navigate = useNavigate();
  // const [position, setPosition] = useState<Position | null>(null);

  useEffect(() => {
    if (!userName) {
      navigate("/");
    }
    if (mapRef.current || !mapContainer.current) return;

    mapRef.current = new MapGl({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
    const map: MapGl = mapRef.current;

    map.on("move", () => {
      interface Position {
        lng: number;
        lat: number;
      }
      const position: Position = map.getCenter();
      setLat(Number(position.lat.toFixed(4)));
      setLng(Number(position.lng.toFixed(4)));
      setZoom(map.getZoom());
    });
  }, [lat, lng, zoom]);

  // async function handleGetPostion() {
  //   const pos: Position = await getPosition();
  //   setPosition(pos);
  // }

  return (
    <section className="quiztopia-game">
      <div ref={mapContainer} className="map-container" />
      <p>
        Center position: {lat} lat, {lng} lng
      </p>
    </section>
  );
}
export default QuizTopiaGame;
