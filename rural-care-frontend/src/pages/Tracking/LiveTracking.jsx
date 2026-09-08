import "./LiveTracking.css";
import { useTheme } from "../../context/ThemeContext";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import L from "leaflet";

import {
  HeartPulse,
  Phone,
  MapPin,
  Navigation,
  Clock,
  Route,
  Home,
} from "lucide-react";

const doctorIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2785/2785544.png",
  iconSize: [42, 42],
});

const patientIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/3177/3177361.png",
  iconSize: [42, 42],
});

export default function LiveTracking() {
  const { dark } = useTheme();

  // Demo Location (baad me API se aayegi)
  const doctorPosition = [22.7196, 75.8577];
  const patientPosition = [22.7245, 75.8665];

  return (
    <div className={dark ? "tracking-page dark" : "tracking-page"}>
      {/* Header */}
      <div className="tracking-header">
        <div>
          <h2> Live Patient Tracking</h2>
          <p>Track patient location for home visit</p>
        </div>

        <span className="live-badge">LIVE GPS</span>
      </div>

      {/* MAP */}
      <div className="map-card">
        <MapContainer
          center={patientPosition}
          zoom={15}
          className="tracking-map"
        >
          <TileLayer
            attribution="© OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={doctorPosition} icon={doctorIcon}>
            <Popup> Doctor Location</Popup>
          </Marker>

          <Marker position={patientPosition} icon={patientIcon}>
            <Popup>🏡 Patient Home</Popup>
          </Marker>

          <Polyline
            positions={[doctorPosition, patientPosition]}
            color="#2563EB"
            weight={5}
          />
        </MapContainer>
      </div>

      {/* Patient Card */}
      <div className="patient-card">
        <div className="patient-profile">
          <img
            src="https://i.pravatar.cc/120?img=32"
            alt="patient"
          />

          <div>
            <h3>Ramesh Patel</h3>
            <p>54 Years • Fever & Body Pain</p>

            <span className="emergency-tag">Emergency Case</span>
          </div>
        </div>

        <button className="call-btn">
          <Phone size={18} />
          Call Patient
        </button>
      </div>

      {/* Tracking Info */}
      <div className="tracking-grid">
        <div className="track-box">
          <MapPin color="#16A34A" />
          <span>Village</span>
          <strong>Rampur Village</strong>
        </div>

        <div className="track-box">
          <Home color="#0EA5E9" />
          <span>Address</span>
          <strong>House No.12, Rampur</strong>
        </div>

        <div className="track-box">
          <Route color="#2563EB" />
          <span>Distance</span>
          <strong>2.8 KM</strong>
        </div>

        <div className="track-box">
          <Clock color="#EA580C" />
          <span>ETA</span>
          <strong>12 Minutes</strong>
        </div>

        <div className="track-box">
          <Navigation color="#9333EA" />
          <span>Status</span>
          <strong>Waiting For Doctor</strong>
        </div>

        <div className="track-box">
          <Phone color="#059669" />
          <span>Patient Phone</span>
          <strong>+91 9876543210</strong>
        </div>
      </div>

      {/* Navigate Button */}
      <button className="navigate-btn">
        Start Navigation To Patient
      </button>
    </div>
  );
}