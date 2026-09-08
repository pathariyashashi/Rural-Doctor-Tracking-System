import "./Dashboard.css";
import { useEffect, useState } from "react";
import { UserCircle2 } from "lucide-react";
import {
  requestHomeVisit,
  getDoctorForPatient,
  getPatientDashboard,
} from "../../services/patientAPI";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { LogOut } from "lucide-react";
import {
  Moon,
  Sun,
  HeartPulse,
  MapPin,
  Phone,
  Clock,
  Brain,
  BookOpen,
  Navigation,
  Bell,
  Activity,
  ShieldCheck,
} from "lucide-react";

export default function PatientDashboard() {
  const navigate = useNavigate();
  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  navigate("/");
};
  const { dark, setDark } = useTheme();

  const patientId = 1;
  const doctorId = 1;

  const [requestSent, setRequestSent] = useState(false);

  const [patient, setPatient] = useState({});
  const [doctor, setDoctor] = useState({});
  const [visits, setVisits] = useState([]);

  const [doctorLocation, setDoctorLocation] = useState({
    latitude: 0,
    longitude: 0,
    status: "On The Way",
  });

  // ================= LOAD DASHBOARD =================
  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getPatientDashboard(patientId);

      if (data.patient) setPatient(data.patient);
      if (data.doctor) setDoctor(data.doctor);
      if (data.visits) setVisits(data.visits);
    } catch (error) {
      console.log("Dashboard Load Error:", error);
    }
  };

  // ================= LIVE DOCTOR LOCATION =================
 

  // ================= HOME VISIT REQUEST =================
  const handleHomeVisit = () => {
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      try {
        await requestHomeVisit(patientId, doctorId, {
          area: "Rampur",
          address: "Rampur Village, House No.12",
          problem: "Fever & Body Pain",
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        setRequestSent(true);
        alert("Home Visit + Location Sent Successfully ");
      } catch (err) {
        console.log(err);
        alert("Request Failed ");
      }
    },
    () => {
      alert("Please Allow Location First ");
    },
    {
      enableHighAccuracy: true,
    }
  );
};

 useEffect(() => {
    const fetchDoctorLocation = async () => {
      try {
        const res = await getDoctorForPatient(doctorId);

        setDoctorLocation({
          latitude: res.data.latitude || 0,
          longitude: res.data.longitude || 0,
          status: res.data.status || "On The Way",
        });
      } catch (error) {
        console.log("Doctor Location Error:", error);
      }
    };

    fetchDoctorLocation();

    const interval = setInterval(fetchDoctorLocation, 5000);

    return () => clearInterval(interval);
  }, [doctorId]);

  return (
    <div className={dark ? "patient-dashboard dark" : "patient-dashboard"}>


      
     {/* ================= PREMIUM DYNAMIC NAVBAR ================= */}
<div className="patient-navbar">

  {/* Left */}
  <div className="navbar-left">
    <div className="logo-circle">
      <HeartPulse size={28} />
    </div>

    <div className="navbar-text">
      <h2>Rural Doctor Care</h2>
      <p>Welcome, {patient.name || "Patient"}</p>
    </div>
  </div>

  {/* Center Menu */}
  <div className="navbar-center">

    <button onClick={() => navigate("/doctor/ai")}>
      <Brain size={18} />
      <span>AI Prediction</span>
    </button>

    <button onClick={() => navigate("/patient/knowledge")}>
      <BookOpen size={18} />
      <span>Health Knowledge</span>
    </button>

    <button onClick={() => navigate("/patient/tracking")}>
      <Navigation size={18} />
      <span>Live Tracking</span>
    </button>

  </div>

  {/* Right */}
  <div className="navbar-right">

    <div className="doctor-status">
      <span className="status-dot"></span>
      {doctor.status || "Doctor Online"}
    </div>

    <button className="icon-btn">
      <Bell size={20} />
    </button>

    <button
      className="icon-btn"
      onClick={() => setDark(!dark)}
    >
      {dark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
    <button
  className="profile-btn"
  onClick={() => navigate("/patient/profile")}
  title="Patient Profile"
>
  {patient.photo ? (
    <img
      src={`http://127.0.0.1:8000${patient.photo}`}
      alt="profile"
      className="profile-avatar-nav"
    />
  ) : (
    <UserCircle2 size={28} />
  )}
</button>

 <button
    className="logout-btn-small"
    onClick={handleLogout}
    title="Logout"
  >
    <LogOut size={16} />
  </button>

  </div>

</div>


      {/* HERO */}
      <div className="hero-card">
        <div>
          <span className="hero-tag">LIVE HEALTH CARE</span>

          <h1>Hello {patient.name || "Patient"} </h1>

          <p>
            Your assigned doctor is available for today's home visit. Track your
            doctor live location and request emergency home visits.
          </p>

          <button
            className="request-btn"
            onClick={handleHomeVisit}
            disabled={requestSent}
          >
            {requestSent ? "Request Sent ✓" : "Request Home Visit"}
          </button>
        </div>

        <HeartPulse size={75} color="white" />
      </div>

      {/* QUICK FEATURES */}
      <div className="feature-grid">
        <div
          className="feature-card ai-card"
          onClick={() => navigate("/doctor/ai")}
        >
          <Brain size={38} />
          <h3>AI Disease Prediction</h3>
          <p>Enter symptoms and predict disease using AI.</p>
        </div>

        <div
          className="feature-card knowledge-card"
          onClick={() => navigate("/patient/knowledge")}
        >
          <BookOpen size={38} />
          <h3>Health Knowledge</h3>
          <p>Learn diseases, medicines, nutrition and first aid.</p>
        </div>

        <div
          className="feature-card tracking-card"
          onClick={() => navigate("/patient/tracking")}
        >
          <Navigation size={38} />
          <h3>Live Doctor Tracking</h3>
          <p>Track your doctor's GPS location in real time.</p>
        </div>
      </div>

      {/* STATUS */}
      <div className="status-grid">
        <div className="status-card">
          <MapPin color="#2563EB" size={32} />
          <h4>Doctor Location</h4>
          <h2>{patient.village || "Rampur"}</h2>
        </div>

        <div className="status-card">
          <Clock color="#EA580C" size={32} />
          <h4>Arrival Status</h4>
          <h2>{doctorLocation.status}</h2>
        </div>

        <div className="status-card">
          <Navigation color="#2563EB" size={32} />
          <h4>GPS Latitude</h4>
          <h2>{doctorLocation.latitude.toFixed(4)}</h2>
        </div>

        <div className="status-card">
          <Phone color="#2563EB" size={32} />
          <h4>Doctor Phone</h4>
          <h2>{doctor.phone || "+91 9876543210"}</h2>
        </div>
      </div>

      {/* DOCTOR CARD */}
      <div className="doctor-card">
        <div className="doctor-left">
          <img
            src={
              doctor.photo
                ? `http://127.0.0.1:8000${doctor.photo}`
                : "https://i.pravatar.cc/120?img=12"
            }
            alt="doctor"
          />

          <div>
            <h3>{doctor.name || "Dr. Rajesh Kumar"}</h3>

            <p>{doctor.specialization || "MBBS • Community Health Officer"}</p>

            <span className="available">
              {doctor.status || "Available Now"}
            </span>

            <p className="experience">
              {doctor.experience || "10+ Years Rural Healthcare Experience"}
            </p>
          </div>
        </div>

        <a href={`tel:${doctor.phone}`} className="call-btn">
          <Phone size={18} />
          Call Doctor
        </a>
      </div>

     
      {/* TODAY VISIT */}
      <div className="visit-card">
        <h2>Today's Home Visit</h2>

        {visits.length > 0 ? (
          visits.slice(0, 1).map((visit) => (
            <div key={visit.id}>
              <div className="visit-row">
                <span>Problem</span>
                <strong>{visit.problem}</strong>
              </div>

              <div className="visit-row">
                <span>Village</span>
                <strong>{patient.village}</strong>
              </div>

              <div className="visit-row">
                <span>Date</span>
                <strong>{visit.date}</strong>
              </div>

              <div className="visit-row">
                <span>Status</span>
                <span className="pending">{visit.status}</span>
              </div>
            </div>
          ))
        ) : (
          <p>No visit scheduled.</p>
        )}
      </div>

      {/* HEALTH SUMMARY */}
      <div className="health-summary">
        <h2>Your Health Summary</h2>

        <div className="health-grid">
          <div className="health-box">
            <Activity color="#2563EB" />
            <p>Blood Pressure</p>
            <h3>120/80</h3>
          </div>

          <div className="health-box">
            <HeartPulse color="#DC2626" />
            <p>Heart Rate</p>
            <h3>78 BPM</h3>
          </div>

          <div className="health-box">
            <ShieldCheck color="#2563EB" />
            <p>Oxygen Level</p>
            <h3>98%</h3>
          </div>

          <div className="health-box">
            <Clock color="#EA580C" />
            <p>Temperature</p>
            <h3>99.1°F</h3>
          </div>
        </div>
      </div>

      {/* HEALTH TIPS */}
      <div className="tips-card">
        <div className="tips-header">
          <Bell color="#EA580C" />
          <h2>Today's Health Tips</h2>
        </div>

        <ul>
          <li>💧 Drink 8–10 glasses of clean water.</li>
          <li>🥗 Eat seasonal fruits and nutritious food.</li>
          <li>🧼 Wash hands before meals.</li>
          <li>🦟 Use mosquito nets during rainy season.</li>
        </ul>
      </div>
    </div>
  );
}