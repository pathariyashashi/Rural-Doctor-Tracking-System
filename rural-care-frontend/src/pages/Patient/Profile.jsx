import "./Profile.css";
import { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { ArrowLeft, Phone, MapPin, Calendar, Droplet, User, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getPatientDashboard } from "../../services/patientAPI";

export default function PatientProfile() {
  const { dark } = useTheme();
  const navigate = useNavigate();

  const [patient, setPatient] = useState({});

  useEffect(() => {
    const loadPatient = async () => {
      try {
        const data = await getPatientDashboard(1);
        setPatient(data.patient);
      } catch (err) {
        console.log(err);
      }
    };

    loadPatient();
  }, []);

  return (
    <div className={dark ? "patient-profile dark" : "patient-profile"}>

      {/* Back */}
      <button className="back-btn" onClick={() => navigate("/patient")}>
        <ArrowLeft size={18}/> Back Dashboard
      </button>

      <div className="profile-hero">

  <div className="profile-left">

    <img
      src={
        patient.photo
          ? `http://127.0.0.1:8000${patient.photo}`
          : "https://i.pravatar.cc/200?img=32"
      }
      alt="patient"
      className="profile-photo"
    />

    <div className="profile-user">
      <h1>{patient.name || "Rahul Kumar"}</h1>
      <p>Patient ID : #{patient.id || "0001"}</p>

      <div className="profile-tags">
        <span>Active Patient</span>
        <span>{patient.village || "Rampur"}</span>
      </div>
    </div>

  </div>

  <button className="edit-profile-btn">
    ✏️ Edit Profile
  </button>

</div>

<div className="profile-grid">

  <div className="profile-box">
    <span>👤 Age</span>
    <h3>{patient.age || 25} Years</h3>
  </div>

  <div className="profile-box">
    <span>📞 Phone</span>
    <h3>{patient.phone || "9876543210"}</h3>
  </div>

  <div className="profile-box">
    <span>🩸 Blood Group</span>
    <h3>{patient.blood_group || "O+"}</h3>
  </div>

  <div className="profile-box">
    <span>⚖️ Weight</span>
    <h3>{patient.weight || "62 KG"}</h3>
  </div>

</div>
      {/* Details */}
      <div className="details-grid">

        <div className="detail-box">
          <User size={24}/>
          <h4>Age</h4>
          <p>{patient.age || 25} Years</p>
        </div>

        <div className="detail-box">
          <Phone size={24}/>
          <h4>Phone</h4>
          <p>{patient.phone || "+91 98XXXXXXX"}</p>
        </div>

        <div className="detail-box">
          <MapPin size={24}/>
          <h4>Village</h4>
          <p>{patient.village || "Rampur"}</p>
        </div>

        <div className="detail-box">
          <Calendar size={24}/>
          <h4>Gender</h4>
          <p>{patient.gender || "Male"}</p>
        </div>

      </div>

      {/* Health Info */}
      <div className="health-card">

        <h3>Health Information</h3>

        <div className="health-row">
          <span>Blood Group</span>
          <strong>{patient.blood_group || "O+"}</strong>
        </div>

        <div className="health-row">
          <span>Weight</span>
          <strong>{patient.weight || "62 KG"}</strong>
        </div>

        <div className="health-row">
          <span>Height</span>
          <strong>{patient.height || "170 CM"}</strong>
        </div>

        <div className="health-row">
          <span>Allergy</span>
          <strong>{patient.allergy || "No Allergy"}</strong>
        </div>

      </div>

      {/* Emergency */}
      <div className="emergency-card">

        <h3>Emergency Contact</h3>

        <div className="health-row">
          <span>Name</span>
          <strong>{patient.emergency_name || "Ramesh Kumar"}</strong>
        </div>

        <div className="health-row">
          <span>Phone</span>
          <strong>{patient.emergency_phone || "+91 98XXXXXXX"}</strong>
        </div>

        <button className="call-emergency">
          <Phone size={18}/>
          Call Emergency Contact
        </button>

      </div>

    </div>
  );
}