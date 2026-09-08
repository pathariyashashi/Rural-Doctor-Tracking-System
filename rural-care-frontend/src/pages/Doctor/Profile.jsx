import "./Profile.css";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import {
  getDoctorProfile,
  updateDoctorProfile,
  uploadDoctorPhoto,
} from "../../services/doctorAPI";

import {
  Moon,
  Sun,
  User,
  Phone,
  Mail,
  MapPin,
  Stethoscope,
  Award,
  Calendar,
  Edit,
  Save,
  ShieldCheck,
  Camera,
} from "lucide-react";

export default function Profile() {
  const { dark, setDark } = useTheme();

  const [editMode, setEditMode] = useState(false);

  const [doctor, setDoctor] = useState({
    name: "Dr. Rajesh Kumar",
    phone: "+91 9876543210",
    email: "rajeshdoctor@gmail.com",
    specialization: "MBBS • Community Health Officer",
    village: "Rampur Primary Health Centre",
    experience: "10 Years",
    qualification: "MBBS, Rural Healthcare Specialist",
    status: "Available",
    patients: 325,
    visits: 120,
  });

  const handleChange = (field, value) => {
    setDoctor({ ...doctor, [field]: value });
  };

  const handleSave = () => {
    setEditMode(false);
    alert("Profile Updated Successfully ✅");
  };

  return (
    <div className={dark ? "doctor-profile dark" : "doctor-profile"}>

      {/* NAVBAR */}
      <div className="profile-navbar">
        <div>
          <h2>Doctor Profile</h2>
          <p>Rural Doctor Home Visit Tracking System</p>
        </div>

        <button className="theme-btn" onClick={() => setDark(!dark)}>
          {dark ? <Sun size={20}/> : <Moon size={20}/>}
        </button>
      </div>

      {/* HERO */}
      <div className="profile-hero">

        <div className="profile-image-box">
          <img
            src="https://i.pravatar.cc/180?img=12"
            alt="Doctor"
          />

          <button className="camera-btn">
            <Camera size={18}/>
          </button>
        </div>

        <div className="hero-info">

          {editMode ? (
            <input
              value={doctor.name}
              onChange={(e)=>handleChange("name",e.target.value)}
              className="profile-input name-input"
            />
          ) : (
            <h1>{doctor.name}</h1>
          )}

          {editMode ? (
            <input
              value={doctor.specialization}
              onChange={(e)=>handleChange("specialization",e.target.value)}
              className="profile-input"
            />
          ) : (
            <p>{doctor.specialization}</p>
          )}

          <span className="available-badge">
            <ShieldCheck size={16}/>
            {doctor.status}
          </span>

          <div className="hero-buttons">
            {!editMode ? (
              <button className="edit-btn" onClick={() => setEditMode(true)}>
                <Edit size={18}/>
                Edit Profile
              </button>
            ) : (
              <button className="save-btn" onClick={handleSave}>
                <Save size={18}/>
                Save Changes
              </button>
            )}
          </div>

        </div>

      </div>

      {/* STATS */}
      <div className="profile-stats">

        <div className="stat-box">
          <Award size={30}/>
          <h3>{doctor.experience}</h3>
          <p>Experience</p>
        </div>

        <div className="stat-box">
          <User size={30}/>
          <h3>{doctor.patients}</h3>
          <p>Patients Served</p>
        </div>

        <div className="stat-box">
          <Calendar size={30}/>
          <h3>{doctor.visits}</h3>
          <p>Home Visits</p>
        </div>

        <div className="stat-box">
          <Stethoscope size={30}/>
          <h3>24/7</h3>
          <p>Emergency Support</p>
        </div>

      </div>

      {/* PERSONAL INFO */}
      <div className="info-card">

        <h2>Personal Information</h2>

        <div className="info-grid">

          <div className="info-item">
            <Phone color="#16A34A"/>

            <div className="info-content">
              <span>Phone</span>

              {editMode ? (
                <input
                  value={doctor.phone}
                  onChange={(e)=>handleChange("phone",e.target.value)}
                  className="profile-input"
                />
              ) : (
                <h4>{doctor.phone}</h4>
              )}

            </div>
          </div>

          <div className="info-item">
            <Mail color="#2563EB"/>

            <div className="info-content">
              <span>Email</span>

              {editMode ? (
                <input
                  value={doctor.email}
                  onChange={(e)=>handleChange("email",e.target.value)}
                  className="profile-input"
                />
              ) : (
                <h4>{doctor.email}</h4>
              )}

            </div>
          </div>

          <div className="info-item">
            <MapPin color="#EA580C"/>

            <div className="info-content">
              <span>Primary Health Centre</span>

              {editMode ? (
                <input
                  value={doctor.village}
                  onChange={(e)=>handleChange("village",e.target.value)}
                  className="profile-input"
                />
              ) : (
                <h4>{doctor.village}</h4>
              )}

            </div>
          </div>

          <div className="info-item">
            <Award color="#9333EA"/>

            <div className="info-content">
              <span>Qualification</span>

              {editMode ? (
                <input
                  value={doctor.qualification}
                  onChange={(e)=>handleChange("qualification",e.target.value)}
                  className="profile-input"
                />
              ) : (
                <h4>{doctor.qualification}</h4>
              )}

            </div>
          </div>

        </div>

      </div>

      {/* TODAY ACTIVITY */}

      <div className="activity-card">

        <h2>Today's Activity</h2>

        <div className="activity-row">
          <span>Patients Completed</span>
          <strong>18</strong>
        </div>

        <div className="activity-row">
          <span>Pending Requests</span>
          <strong>5</strong>
        </div>

        <div className="activity-row">
          <span>Emergency Cases</span>
          <strong>3</strong>
        </div>

        <div className="activity-row">
          <span>Status</span>
          <span className="status-live">{doctor.status}</span>
        </div>

      </div>

    </div>
  );
}