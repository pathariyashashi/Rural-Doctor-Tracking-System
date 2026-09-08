import "./Dashboard.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateDoctorLocation, getPatientTracking } from "../../services/doctorAPI";

import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";
import StatCard from "../../components/cards/StatCard";
import RequestTable from "../../components/tables/RequestTable";

import { LogOut } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const doctorId = 1;

const [doctorStatus, setDoctorStatus] = useState("GPS Connecting...");
  const [eta] = useState("12 Minutes");

  const [patientLocation, setPatientLocation] = useState({
    patient_name: "Ramesh Patel",
    village: "Rampur",
    address: "House No.12, Rampur Village",
    disease: "Fever & Body Pain",
    priority: "Emergency",
  });

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  // ================= LOAD PATIENT =================
  useEffect(() => {
    const loadPatientLocation = async () => {
      try {
        const res = await getPatientTracking(doctorId);

        if (res.data.length > 0) {
          setPatientLocation(res.data[0]);
        }
      } catch (err) {
        console.log("Patient Tracking Error:", err);
      }
    };

    loadPatientLocation();
  }, []);

  // ================= LIVE GPS =================
  useEffect(() => {
    if (!navigator.geolocation) return;

    const watchId = navigator.geolocation.watchPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          await updateDoctorLocation(doctorId, latitude, longitude);

          console.log("Doctor Location Updated:", latitude, longitude);

          setDoctorStatus("Live Tracking Active");
        } catch (err) {
          console.log("GPS Update Error:", err);
          setDoctorStatus("Location Update Failed");
        }
      },
      (err) => console.log(err),
      {
        enableHighAccuracy: true,
        maximumAge: 3000,
        timeout: 5000,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        <Navbar />

      

        {/* HERO */}
        <section className="hero">
          <div>
            <h1>Doctor Tracking System</h1>

            <p>
              Manage rural patient requests, live doctor tracking and AI health
              prediction from one dashboard.
            </p>
          </div>

          <button className="visit-btn">Start New Visit</button>
        </section>

        {/* STATS */}
        <section className="stats-grid">
          <StatCard title="Today's Patients" value="24" color="#16A34A" />
          <StatCard title="Pending Requests" value="08" color="#2563EB" />
          <StatCard title="Emergency Cases" value="03" color="#DC2626" />
          <StatCard title="Completed Visits" value="18" color="#F59E0B" />
        </section>

        {/* MAIN GRID */}
        <section className="dashboard-grid">
          

          <div className="tracking-card">
            <h3>📍 Live Doctor GPS Tracking</h3>

            <div className="patient-live-card">
              <h4>📍 Patient Live Location</h4>

              <p>
                <strong>Name:</strong> {patientLocation.patient_name}
              </p>

              <p>
                <strong>Village:</strong> {patientLocation.village}
              </p>

              <p>
                <strong>Address:</strong> {patientLocation.address}
              </p>

              <p>
                <strong>Disease:</strong> {patientLocation.disease}
              </p>

              <span className="emergency-badge">
                {patientLocation.priority}
              </span>
            </div>

            <div className="tracking-info">
              <div>
                <span>Status</span>
                <strong>{doctorStatus}</strong>
              </div>

              <div>
                <span>ETA</span>
                <strong>{eta}</strong>
              </div>

              <div>
                <span>GPS</span>
                <strong>Live Enabled</strong>
              </div>
            </div>

            <button className="visit-btn">
              Share Live Location
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}