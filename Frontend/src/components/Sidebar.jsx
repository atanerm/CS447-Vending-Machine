// UMBC logo
import logo from "../assets/plogo.png";
// Machine dummy data — used to show the count badge on the Machines nav item
import { MACHINES } from "../data/genData";

// MUI icons for each nav item
import DashboardIcon from "@mui/icons-material/Dashboard";
import StorageIcon from "@mui/icons-material/Storage";
import InventoryIcon from "@mui/icons-material/Inventory";
import FeedbackIcon from "@mui/icons-material/Feedback";

// Each entry maps a page id to its label and icon component
const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: DashboardIcon },
  { id: "machines", label: "Machines", icon: StorageIcon },
  { id: "products", label: "Products", icon: InventoryIcon },
  { id: "feedback", label: "Feedback", icon: FeedbackIcon },
];

// activePage: id of the currently active page, used to highlight the right nav item
// onNavigate: callback returened with the item id when the user clicks a nav button
export default function Sidebar({ activePage, onNavigate }) {
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
          const isActive = activePage === item.id;

          // MUI icon components must be stored in a capitalized variable to be used as JSX
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
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
              // Note: these handlers set color to the same value on both enter and leave,
              // so they have no visible effect see 
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = "#1e293b";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = "#1e293b";
                }
              }}
            >
              {/* Icon fades slightly when inactive */}
              <Icon style={{ fontSize: 18, opacity: isActive ? 1 : 0.7 }} />

              <span>{item.label}</span>

              {/* Count badge only shown on the Machines nav item */}
              {item.id === "machines" && (
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