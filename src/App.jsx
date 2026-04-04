import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";

// Temporary standin for pages that we haven't been built yet
function PlaceholderPage({ title }) {
  return (
    <div style={{
      display: "flex", minHeight: "100vh", width: "100%",
      flexDirection: "column",
      alignItems: "center", justifyContent: "center", color: "#9ca3af",
    }}>
      <h2 style={{ margin: "14px 0 6px", color: "#374151", fontSize: 20, fontWeight: 700 }}>{title}</h2>
      <p style={{ fontSize: 13 }}>Coming soon.</p>
    </div>
  );
}

export default function App() {
  // Tracks which page is currently displayed
  const [activePage, setActivePage] = useState("dashboard");

  // Moves to the Machines page when a machine is clicked from the Dashboard
  const handleViewMachine = () => {
    setActivePage("machines");
  };

  // Returns the correct page component based on the active route
  const renderPage = () => {
    switch (activePage) {
      case "dashboard": return <Dashboard onViewMachine={handleViewMachine} />;
      case "machines":  return <PlaceholderPage title="Machines Page" />;
      case "products":  return <PlaceholderPage title="Products Page" />;
      case "activity":  return <PlaceholderPage title="Activity Page" />;
      case "feedback":  return <PlaceholderPage title="Feedback Page" />;
      // Fallback to Dashboard for any unrecognized page id
      default:          return <Dashboard onViewMachine={handleViewMachine} />;
    }
  };

  return (
    <>
      {/* Global style reset and font import */}
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f8fafc; font-family: 'DM Sans', sans-serif; }
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');
      `}</style>

      {/* Full-height layout: sidebar on the left, page content on the right */}
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar activePage={activePage} onNavigate={setActivePage} />
        <main style={{ flex: 1, display: "flex", background: "#f8fafc" }}>
          {renderPage()}
        </main>
      </div>
    </>
  );
}