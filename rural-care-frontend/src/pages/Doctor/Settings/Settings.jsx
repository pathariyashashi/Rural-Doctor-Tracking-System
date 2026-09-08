import "./Settings.css";
import { useState } from "react";
import { useTheme } from "../../../context/ThemeContext";
import {
  Moon,
  Sun,
  Bell,
  MapPin,
  Globe,
  ShieldCheck,
  Smartphone,
  LogOut,
  Save,
  Ambulance,
} from "lucide-react";

export default function Settings() {
  const { dark, setDark } = useTheme();

  const [notification, setNotification] = useState(true);
  const [gps, setGps] = useState(true);
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [language, setLanguage] = useState("English");

  const handleSave = () => {
    alert("Settings Saved Successfully ✅");
  };

  return (
    <div className={dark ? "settings-page dark" : "settings-page"}>

      {/* Header */}
      <div className="settings-header">
        <div>
          <h2>⚙ Doctor Settings</h2>
          <p>Manage your Rural Doctor Tracking preferences</p>
        </div>

        <button className="theme-btn" onClick={() => setDark(!dark)}>
          {dark ? <Sun size={20}/> : <Moon size={20}/>}
        </button>
      </div>

      {/* Appearance */}
      <div className="settings-card">
        <h3>Appearance</h3>

        <div className="setting-row">
          <div className="setting-left">
            {dark ? <Moon/> : <Sun/>}
            <div>
              <h4>Dark Theme</h4>
              <p>Switch between light and dark mode.</p>
            </div>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              checked={dark}
              onChange={() => setDark(!dark)}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      {/* Notifications */}
      <div className="settings-card">
        <h3>Notifications</h3>

        <div className="setting-row">
          <div className="setting-left">
            <Bell/>
            <div>
              <h4>Patient Request Notifications</h4>
              <p>Receive new patient request alerts instantly.</p>
            </div>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              checked={notification}
              onChange={() => setNotification(!notification)}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      {/* GPS */}
      <div className="settings-card">
        <h3>Live GPS Tracking</h3>

        <div className="setting-row">
          <div className="setting-left">
            <MapPin/>
            <div>
              <h4>Share Live Location</h4>
              <p>Allow patients to track your live GPS location.</p>
            </div>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              checked={gps}
              onChange={() => setGps(!gps)}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      {/* Language */}
      <div className="settings-card">
        <h3>Language</h3>

        <div className="setting-row">
          <div className="setting-left">
            <Globe/>
            <div>
              <h4>App Language</h4>
              <p>Select your preferred language.</p>
            </div>
          </div>

          <select
            className="language-select"
            value={language}
            onChange={(e)=>setLanguage(e.target.value)}
          >
            <option>English</option>
            <option>Hindi</option>
          </select>
        </div>
      </div>

      {/* Emergency */}
      <div className="settings-card emergency-card">
        <h3>Emergency Mode</h3>

        <div className="setting-row">
          <div className="setting-left">
            <Ambulance color="#EF4444"/>
            <div>
              <h4>Enable Emergency Visits</h4>
              <p>High priority emergency patients appear first.</p>
            </div>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              checked={emergencyMode}
              onChange={() => setEmergencyMode(!emergencyMode)}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      {/* Device */}
      <div className="settings-card">
        <h3>Device Information</h3>

        <div className="device-grid">
          <div className="device-box">
            <Smartphone color="#2563EB"/>
            <p>Device</p>
            <strong>Doctor Mobile App</strong>
          </div>

          <div className="device-box">
            <ShieldCheck color="#16A34A"/>
            <p>Version</p>
            <strong>1.0.0</strong>
          </div>

          <div className="device-box">
            <MapPin color="#EA580C"/>
            <p>GPS Status</p>
            <strong>{gps ? "Enabled" : "Disabled"}</strong>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="button-group">
        <button className="save-btn" onClick={handleSave}>
          <Save size={18}/>
          Save Settings
        </button>

        <button className="logout-btn">
          <LogOut size={18}/>
          Logout
        </button>
      </div>

    </div>
  );
}