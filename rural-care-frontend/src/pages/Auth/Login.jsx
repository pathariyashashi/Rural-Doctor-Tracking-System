import "./Login.css";
import { useState } from "react";
import { loginUser } from "../../services/authAPI";
import { HeartPulse, UserRound, Stethoscope } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const [loading, setLoading] = useState(false);
  
 const handleLogin = async (role) => {
  try {
    setLoading(true);
    
    if (!/^[6-9]\d{9}$/.test(phone)) {
  alert("Enter a valid registered mobile number");
  return;
}
    const res = await loginUser({
  phone,
  password,
  role,
});

    localStorage.setItem("token", res.data.access_token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    navigate(role === "doctor" ? "/doctor" : "/patient");

  } catch (err) {
    alert(err.response?.data?.detail || "Invalid Email or Password");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="login-page">
      <div className="overlay"></div>

      <div className="login-container">
        <div className="left-panel">
          <div className="logo-box">
            <HeartPulse size={40} color="#16A34A" />
            <h1> Rural Doctor Tracking </h1>
          </div>

          <h2>Doctor Tracking System</h2>

          <p>
            Fast • AI Powered • GPS Tracking • Home Visit Management
          </p>
        </div>

        <div className="right-panel">
          <h2>Welcome Back </h2>

         <input
  type="tel"
  placeholder="Enter Phone Number"
  value={phone}
  maxLength={10}
  onChange={(e) => {
    const value = e.target.value.replace(/\D/g, "");
    setPhone(value);
  }}
/>

<input
  type="password"
  placeholder="Enter Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>
          <button
  className="doctor-btn"
  onClick={() => handleLogin("doctor")}
  disabled={loading}
>
  <Stethoscope size={0} />
  {loading ? "Logging In..." : "Doctor Login"}
</button>

          <button
  className="patient-btn"
  onClick={() => handleLogin("patient")}
  disabled={loading}
>
  <UserRound size={0} />
  {loading ? "Logging In..." : "Patient Login"}
</button>

<p className="create-account" onClick={() => navigate("/register")}>
  Create New Account 
</p>
        </div>
      </div>
    </div>
  );
}