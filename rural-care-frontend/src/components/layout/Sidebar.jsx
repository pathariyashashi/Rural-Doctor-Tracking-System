import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  MapPinned,
  BrainCircuit,
  UserRound,
  Settings,
  HeartPulse,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="sidebar">

      {/* Logo */}
      <div className="sidebar-header">
        <HeartPulse size={34} color="#22C55E" />
        <div>
          <h2>Doctor Tracking</h2>
          <p>Rural Care System</p>
        </div>
      </div>

      {/* Menu */}
      <nav className="sidebar-menu">

        <NavLink to="/doctor" end>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/doctor/requests">
          <Users size={20} />
          <span>Patient Requests</span>
        </NavLink>

        <NavLink to="/doctor/tracking">
          <MapPinned size={20} />
          <span>Live Tracking</span>
        </NavLink>

        <NavLink to="/doctor/ai">
          <BrainCircuit size={20} />
          <span>AI Prediction</span>
        </NavLink>

        <NavLink to="/doctor/profile">
          <UserRound size={20} />
          <span>Profile</span>
        </NavLink>

        <NavLink to="/doctor/settings">
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>

      </nav>

      {/* Bottom Card */}
      <div className="sidebar-footer">
        <p> Rural Doctor Tracking</p>
        <small>Version 1.0</small>
      </div>

    </aside>
  );
}