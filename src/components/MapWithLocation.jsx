import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function MapWithLocation() {
  const [location, setLocation] = useState({ lat: 20.5937, lng: 78.9629 }); // default India center
  const [hasLocation, setHasLocation] = useState(false);

  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setHasLocation(true);
      },
      (error) => {
        alert("Unable to retrieve your location: " + error.message);
      }
    );
  }, []);

  return (
    <MapContainer
      center={location}
      zoom={hasLocation ? 13 : 5}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {hasLocation && (
        <Marker position={location}>
          <Popup>Your Current Location</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}

export default MapWithLocation;
