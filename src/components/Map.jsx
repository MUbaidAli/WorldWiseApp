import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../Context/CitiesContextProvider";
import { useGeolocation } from "../utils/useGeolocation";
import Button from "./Button";
import { useLatLngPosition } from "../utils/useLatLng";
function Map() {
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const { cities } = useCities();
  const { getPos, getPosition, isLoading: isPosLoading } = useGeolocation();
  const [lat, lng] = useLatLngPosition();

  // console.log(getPos);
  // console.log(lat, lng, "------------------------", getPos);

  useEffect(() => {
    if (lat && lng) {
      setMapPosition([lat, lng]);
    }
  }, [lat, lng]);

  useEffect(() => {
    if (getPos) {
      setMapPosition([getPos.latitude, getPos.longitude]);
    }
  }, [getPos]);

  // console.log(mapPosition, "mapPos");

  return (
    <div className={styles.mapContainer}>
      {!getPos && (
        <Button type={"position"} onClick={getPosition}>
          {" "}
          {isPosLoading ? "Loading..." : "Use Your Position"}
        </Button>
      )}

      <MapContainer
        center={mapPosition}
        zoom={12}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((item) => (
          <Marker
            position={[item.position.lat, item.position.lng]}
            key={item.id}
          >
            <Popup>
              <span>{item.emoji}</span>
              <span>{item.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;
