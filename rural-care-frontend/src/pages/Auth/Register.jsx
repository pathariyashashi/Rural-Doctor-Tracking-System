import "./Register.css";
import { useState } from "react";
import { registerUser } from "../../services/authAPI";
import { useNavigate } from "react-router-dom";

export default function Register()  {
  const navigate = useNavigate();
  const [form, setForm] = useState({
  name: "",
  email: "",
  phone: "",
  village: "",
  password: "",
});
const [role, setRole] = useState("patient");

  return (
    <div className="register-page">
      <div className="register-card">
        <h2>
  {role === "doctor"
    ? "Doctor Registration"
    : "Patient Registration"}
</h2>

<div className="role-selector">

  <div
    className={role === "doctor" ? "role-card active" : "role-card"}
    onClick={() => setRole("doctor")}
  >
    <span className="role-icon">🩺</span>
    <h4>Doctor</h4>
    <p>Community Health Officer</p>
  </div>

  <div
    className={role === "patient" ? "role-card active" : "role-card"}
    onClick={() => setRole("patient")}
  >
    <span className="role-icon">👤</span>
    <h4>Patient</h4>
    <p>Home Visit & AI Prediction</p>
  </div>

</div>

        <input
  placeholder="Full Name"
  value={form.name}
  onChange={(e) => setForm({ ...form, name: e.target.value })}
/>

<input
  placeholder="Email Address"
  value={form.email}
  onChange={(e) => setForm({ ...form, email: e.target.value })}
/>

<input
  type="tel"
  placeholder="Phone Number"
  value={form.phone}
  maxLength={10}
  onChange={(e) => {
    const value = e.target.value.replace(/\D/g, "");
    setForm({ ...form, phone: value });
  }}
/>

<input
  placeholder="Village Name"
  value={form.village}
  onChange={(e) => setForm({ ...form, village: e.target.value })}
/>

<input
  type="password"
  placeholder="Password"
  value={form.password}
  onChange={(e) => setForm({ ...form, password: e.target.value })}
/>

        <button
  onClick={async () => {
    if (!/^[6-9]\d{9}$/.test(form.phone)) {
  alert("Enter a valid 10-digit Indian mobile number");
  return;
}

    try {
      await registerUser({
        ...form,
        role, // doctor ya patient automatically
      });

      alert(
        `${role === "doctor" ? "Doctor" : "Patient"} Registered Successfully ✅`
      );

      navigate("/");
    } catch (err) {
      alert(err.response?.data?.detail || "Registration Failed ❌");
    }
  }}
>
  Register as {role === "doctor" ? "Doctor" : "Patient"}
</button>

        <span onClick={() => navigate("/")}>
  Already have a {role === "doctor" ? "Doctor" : "Patient"} account? Login
</span>
      </div>
    </div>
  );
}