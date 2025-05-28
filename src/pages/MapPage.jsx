import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function MapPage({ reports }) {
  return (
    <div style={{ height: 400, marginBottom: 30, borderRadius: 8, overflow: "hidden", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
      <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {reports.map((r, i) => (
          <Marker key={i} position={[r.location.latitude, r.location.longitude]}>
            <Popup>
              <strong>Noise Level:</strong> {r.decibels} dB<br />
              <strong>Type:</strong> {r.noiseType}<br />
              <strong>Reported at:</strong> {new Date(r.createdAt).toLocaleString()}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
