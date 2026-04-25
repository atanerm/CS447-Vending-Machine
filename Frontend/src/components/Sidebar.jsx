// UMBC logo
import logo from "../assets/plogo.png";
// Machine dummy data — used to show the count badge on the Machines nav item
import { MACHINES } from "../data/genData";

// MUI icons for each nav item
import DashboardIcon from "@mui/icons-material/Dashboard";
import StorageIcon from "@mui/icons-material/Storage";
import InventoryIcon from "@mui/icons-material/Inventory";
import FeedbackIcon from "@mui/icons-material/Feedback";
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

// Each entry maps a page id to its label and icon component
// activePage: id of the currently active page, used to highlight the right nav item
// onNavigate: callback returened with the item id when the user clicks a nav button
export default function Sidebar({setUser}) {
  const NAV_ITEMS = [
  { path: "/dashboard", label: "Dashboard", icon: DashboardIcon },
  { path: "/machines", label: "Machines", icon: StorageIcon },
  { path: "/products", label: "Products", icon: InventoryIcon },
  { path: "/feedback", label: "Feedback", icon: FeedbackIcon },
  { path: "/logout", label: "Sign Out", icon: LogoutIcon}
  ];
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async() =>{
    const res = await axios.post("http://localhost:5000/api/auth/logout");
    setUser(null);
    navigate("/login");
  };
 
  return (
    <aside
      style={{
        width: 230,
        flexShrink: 0,
        background: "#ffb81c",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "0 0 24px",
        position: 'fixed',
        overflow: 'auto',
      }}
    >
      {/* Logo and app title */}
      <div
        style={{
          padding: "26px 22px 10px",
          borderBottom: "1px solid #1e293b",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img
          src={logo}
          alt="UMBC logo"
          style={{
            width: 150,
            height: 40,
            objectFit: "contain",
            marginBottom: 7,
          }}
        />
        <p
          style={{
            margin: 0,
            fontFamily: "Avenir Next, sans-serif",
            fontSize: 15,
            color: "#1e293b",
            fontWeight: 600,
          }}
        >
          Vending Machine Tracking
        </p>
      </div>

      {/* Nav links */}
      <nav style={{ padding: "20px 10px", flex: 1 }}>
        {NAV_ITEMS.map((item) => {
          // Determines whether this button should render in its active state
          const isActive = location.pathname === item.path;

          // MUI icon components must be stored in a capitalized variable to be used as JSX
          const Icon = item.icon;

          return (
            <button
              key={item.path}
              onClick={item.path === "/logout"? handleLogout:() => navigate(item.path)}
              className={item.path === "/logout" ? "button_bottom" : ""}
              style={{
                width: "95%",
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "9px 12px",
                borderRadius: 9,
                border: "none",
                cursor: "pointer",
                // Active item gets a dark filled background; inactive is transparent
                background: isActive ? "#1e293b" : "transparent",
                color: isActive ? "#fff" : "#1e293b",
                fontFamily: "Avenir Next, sans-serif",
                fontSize: 14,
                fontWeight: isActive ? 600 : 400,
                marginBottom: 2,
                textAlign: "left",
                transition: "all 0.15s",
              }}
            >
              {/* Icon fades slightly when inactive */}
              <Icon style={{ fontSize: 18, opacity: isActive ? 1 : 0.7 }} />

              <span>{item.label}</span>

              {/* Count badge only shown on the Machines nav item */}
              {item.path === "machines" && (
                <span
                  style={{
                    marginLeft: "auto",
                    background: "#1e293b",
                    color: "#fff",
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "2px 7px",
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
    </aside>
  );
}
const bottom_button = {
  position: "fixed",
  bottom: "20px",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 1000
};