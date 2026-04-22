import { MACHINES } from "../data/genData";
import SummaryCard from "../components/SummaryCard";
import MachineTable from "../components/MachineTable";
import { getMachineStatus } from "../utils/statusHelpers";

export default function Dashboard({ onViewMachine }) {
  // Summary counts shown in the cards
  const total = MACHINES.length;
  const low = MACHINES.filter((machine) => getMachineStatus(machine) === "Low").length;
  const out = MACHINES.filter((machine) => getMachineStatus(machine) === "Out").length;
  const good = MACHINES.filter((machine) => getMachineStatus(machine) === "Good").length;

  return (
    <div style={pageLayout}>
      {/* Page heading */}
      <div style={headerSection}>
        <h1 style={titleStyle}>Dashboard</h1>
        <p style={subtitleStyle}>
          Overview of all vending machines and stock status.
        </p>
      </div>

      {/* Summary cards */}
      <div style={cardRow}>
        <SummaryCard
          label="Total Machines"
          value={total}
          accent="#3b82f6"
          sub="Across all locations"
        />
        <SummaryCard
          label="Low Stock"
          value={low}
          accent="#f59e0b"
          sub="Need restocking soon"
        />
        <SummaryCard
          label="Out of Stock"
          value={out}
          accent="#ef4444"
          sub="Immediate attention"
        />
        <SummaryCard
          label="Running Good"
          value={good}
          accent="#22c55e"
          sub="No action needed"
        />
      </div>

      {/* Machine table */}
      <MachineTable machines={MACHINES} onView={onViewMachine} />
    </div>
  );
}

/* ---------- Layout styles ---------- */

const pageLayout = {
  padding: "32px 36px",
  flex: 1,
  overflowY: "auto",
  marginLeft: "230px",
};

const headerSection = {
  marginBottom: 28,
  textAlign: "center",
};

const titleStyle = {
  margin: 0,
  fontSize: 32,
  fontWeight: 800,
  fontFamily: "Avenir, sans-serif",
  color: "#111827",
  letterSpacing: "-0.4px",
};

const subtitleStyle = {
  margin: "5px 0 0",
  color: "#6b7280",
  fontFamily: "Avenir, sans-serif",
  fontSize: 14,
};

const cardRow = {
  display: "flex",
  gap: 14,
  marginBottom: 28,
  flexWrap: "wrap",
};