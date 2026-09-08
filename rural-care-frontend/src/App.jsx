import { Routes, Route } from "react-router-dom";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

import DoctorDashboard from "./pages/Doctor/Dashboard";
import PatientDashboard from "./pages/Patient/Dashboard";
import LiveTracking from "./pages/Tracking/LiveTracking";
import AIPrediction from "./pages/AI/AIPrediction";
import DoctorProfile from "./pages/Doctor/Profile";
import DoctorTracking from "./pages/Patient/DoctorTracking";
import Settings from "./pages/Doctor/Settings/Settings";
import HealthKnowledge from "./pages/Patient/HealthKnowledge";
import PatientProfile from "./pages/Patient/Profile";
import PatientRequests from "./pages/Doctor/PatientRequests";


function App() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Doctor */}
      <Route path="/doctor" element={<DoctorDashboard />} />
      <Route path="/doctor/ai" element={<AIPrediction />} />
      <Route path="/doctor/profile" element={<DoctorProfile />} />
      <Route path="/patient/tracking" element={<DoctorTracking />} />
      <Route path="/doctor/settings" element={<Settings />} />
      <Route path="/doctor/requests" element={<PatientRequests />} />
      {/* Patient */}
      <Route path="/patient" element={<PatientDashboard />} />
      <Route path="/patient/profile" element={<PatientProfile />} />
      <Route path="/doctor/tracking" element={<LiveTracking />} />
      <Route path="/patient/knowledge" element={<HealthKnowledge />} />
    </Routes>
  );
}

export default App;