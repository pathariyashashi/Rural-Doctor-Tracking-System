import "./Navbar.css";
import { Search, Bell, Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";



export default function Navbar() {
  const { dark, setDark } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
};
  return (
    <header className="navbar">
      <div className="search-box">
        <Search size={18} />
        <input type="text" placeholder="Search patient..." />
      </div>

      <div className="nav-right">
        <button
          className="theme-btn"
          onClick={() => setDark(!dark)}
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <Bell size={20} className="bell-icon" />

        <img
          src="https://i.pravatar.cc/45?img=12"
          alt="Doctor"
          className="profile-img"
        />
        <div className="nav-right">
  {/* Existing Profile Icon */}

  <button className="logout-btn-small" onClick={handleLogout}>
    <LogOut size={16} />
  </button>
</div>
      </div>
      
    </header>
  );
}