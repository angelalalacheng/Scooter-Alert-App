import { useEffect, useState } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import request from "../api/request";
import { ENDPOINTS } from "../api/endpoints";

const init_Location = {
  lat: 33.64698,
  lng: -117.84257,
};

const mapStyles = {
  height: "400px",
  width: "100vw",
  marginTop: "0.5rem",
};

const icon = L.icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const GPS = ({ park }) => {
  const [location, setLocation] = useState(init_Location);

  const fetchLocation = async () => {
    try {
      const data = await request(ENDPOINTS.GET_LOCATION, "GET");

      setLocation({
        lat: data.latitude,
        lng: data.longitude,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const MapUpdater = ({ location }) => {
    const map = useMap();

    useEffect(() => {
      map.flyTo(location, map.getZoom(), {
        animate: true,
        duration: 1.0,
      });
    }, [location, map]);

    return null;
  };

  useEffect(() => {
    let intervalId;

    if (park) {
      intervalId = setInterval(() => {
        fetchLocation();
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [park]);

  return (
    <div>
      <h2 style={{ margin: 0 }}>GPS Location</h2>
      <div>
        <MapContainer center={location} zoom={13} style={mapStyles}>
          <MapUpdater location={location} />
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={location} icon={icon}>
            <Popup>Your Scooter</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};
export default GPS;
