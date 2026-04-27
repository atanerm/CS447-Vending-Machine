// UMBC logo
import logo from "../assets/plogo.png";
import { MACHINES } from "../data/genData";

// Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import StorageIcon from "@mui/icons-material/Storage";
import InventoryIcon from "@mui/icons-material/Inventory";
import FeedbackIcon from "@mui/icons-material/Feedback";
import LogoutIcon from "@mui/icons-material/Logout";

import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function Sidebar({ setUser }) {
  const NAV_ITEMS = [
    { path: "/dashboard", label: "Dashboard", icon: DashboardIcon },
    { path: "/machines", label: "Machines", icon: StorageIcon },
    { path: "/products", label: "Products", icon: InventoryIcon },
    { path: "/feedback", label: "Feedback", icon: FeedbackIcon },
  ];

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await axios.post("http://localhost:5000/api/auth/logout");
    setUser(null);
    navigate("/login");
  };

  return (
    <aside
      style={{
        width: 230,
        background: "#ffb81c",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        paddingBottom: "20px",
        position: "fixed",
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "26px 22px 10px",
          borderBottom: "1px solid #1e293b",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src={logo}
          alt="UMBC logo"
          style={{ width: 150, height: 40, marginBottom: 6 }}
        />
        <p style={{ fontSize: 15, fontWeight: 600, margin: 0 }}>
          Vending Machine Tracking
        </p>
      </div>

      {/* NAV (top section) */}
      <nav style={{ padding: "20px 10px", flex: 1 }}>
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              style={{
                width: "95%",
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                background: isActive ? "#1e293b" : "transparent",
                color: isActive ? "#fff" : "#1e293b",
                fontWeight: isActive ? 600 : 400,
                marginBottom: 4,
                textAlign: "left",
              }}
            >
              <Icon style={{ fontSize: 18, opacity: isActive ? 1 : 0.7 }} />
              <span>{item.label}</span>

              {/* Machine count badge */}
              {item.path === "/machines" && (
                <span
                  style={{
                    marginLeft: "auto",
                    background: "#1e293b",
                    color: "#fff",
                    fontSize: 10,
                    padding: "2px 6px",
                    borderRadius: 999,
                  }}
                >
                  {MACHINES.length}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* SIGN OUT*/}
      <div style={{ padding: "10px" }}>
      <button
        onClick={handleLogout}
        style={{
          width: "95%",
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "12px",
          borderRadius: 8,
          border: "none",
          cursor: "pointer",
          background: "#df1212", 
          color: "white",
          fontWeight: "600",
          textAlign: "left",
          transition: "0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#b91c1c")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#dc2626")}
      >
        <LogoutIcon style={{ fontSize: 18 }} />
        <span>Sign Out</span>
      </button>
    </div>
    </aside>
  );
}