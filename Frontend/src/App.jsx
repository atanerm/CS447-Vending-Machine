import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Machines from "./pages/MachinePage";
import Products from "./pages/Products";
import Feedback from "./pages/Feedback";

export default function App() {
  // Tracks the page currently being shown
  const [activePage, setActivePage] = useState("dashboard");

  // Stores the previous page for simple back navigation
  const [previousPage, setPreviousPage] = useState(null);

  // Stores the machine selected from the dashboard or machines page
  const [selectedMachine, setSelectedMachine] = useState(null);

  // General page navigation
  function navigateTo(page) {
    setPreviousPage(activePage);
    setActivePage(page);
  }

  // Sends the user back to the dashboard
  function goHome() {
    setPreviousPage(activePage);
    setActivePage("dashboard");
  }

  // Returns the user to the previous page
  function goBack() {
    if (previousPage) {
      const temp = activePage;
      setActivePage(previousPage);
      setPreviousPage(temp);
    }
  }

  // Opens the Machines page with the selected machine
  function handleViewMachine(machine) {
    setSelectedMachine(machine);
    setPreviousPage(activePage);
    setActivePage("machines");
  }

  // Chooses which page component to display
  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard onViewMachine={handleViewMachine} />;

      case "machines":
        return (
          <Machines
            selectedMachine={selectedMachine}
            onSelectMachine={setSelectedMachine}
            goBack={goBack}
            goHome={goHome}
          />
        );

      case "products":
        return <Products goBack={goBack} goHome={goHome} />;

      case "feedback":
        return <Feedback goBack={goBack} goHome={goHome} />;

      default:
        return <Dashboard onViewMachine={handleViewMachine} />;
    }
  };

  return (
    <>
      {/* Global reset and font import */}
      <style>{`
        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          background: #f8fafc;
          font-family: 'DM Sans', sans-serif;
        }

        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');
      `}</style>

      {/* Main app layout: sidebar on the left, page content on the right */}
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar
          activePage={activePage}
          onNavigate={(page) => {
            navigateTo(page);

            // Clear selected machine when leaving the Machines page
            if (page !== "machines") {
              setSelectedMachine(null);
            }
          }}
        />

        <main
          style={{
            display: "flex",
            minWidth: 0,
            flex: 1,
            background: "#f8fafc",
          }}
        >
          {renderPage()}
        </main>
      </div>
    </>
  );
}