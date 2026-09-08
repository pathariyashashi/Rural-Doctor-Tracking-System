import "./DoctorTracking.css";
import { useTheme } from "../../context/ThemeContext";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import { Phone, Navigation, Clock, Route } from "lucide-react";

const doctorIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2785/2785544.png",
  iconSize: [42, 42],
});

const homeIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [38, 38],
});

export default function DoctorTracking() {
  const { dark } = useTheme();

  // Demo GPS (baad me backend se aayega)
  const doctorPosition = [22.7196, 75.8577];
  const patientHome = [22.7245, 75.8665];

  return (
    <div className={dark ? "doctor-tracking-page dark" : "doctor-tracking-page"}>

      <div className="tracking-header">
        <div>
          <h2> Live Doctor Tracking</h2>
          <p>Your doctor is travelling towards your home.</p>
        </div>

        <span className="live-badge">LIVE GPS</span>
      </div>

      {/* REAL MAP */}
      <div className="map-card">

        <MapContainer
          center={doctorPosition}
          zoom={15}
          scrollWheelZoom={true}
          className="leaflet-map"
        >
          <TileLayer
            attribution="© OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={doctorPosition} icon={doctorIcon}>
            <Popup>🚑 Doctor Rajesh Kumar</Popup>
          </Marker>

          <Marker position={patientHome} icon={homeIcon}>
            <Popup>🏡 Your Home</Popup>
          </Marker>

          <Polyline
            positions={[doctorPosition, patientHome]}
            color="#2563EB"
            weight={5}
          />
        </MapContainer>

      </div>

      {/* STATUS CARD */}
      <div className="doctor-status-card">

        <h3>Dr. Rajesh Kumar</h3>

        <div className="status-grid">

          <div className="status-item">
            <Navigation color="#2563EB"/>
            <div>
              <span>Status</span>
              <strong>On The Way</strong>
            </div>
          </div>

          <div className="status-item">
            <Route color="#16A34A"/>
            <div>
              <span>Distance</span>
              <strong>2.8 KM</strong>
            </div>
          </div>

          <div className="status-item">
            <Clock color="#EA580C"/>
            <div>
              <span>ETA</span>
              <strong>20 Minutes</strong>
            </div>
          </div>

        </div>

        <button className="call-btn">
          <Phone size={18}/>
          Call Doctor
        </button>

      </div>

    </div>
  );
}