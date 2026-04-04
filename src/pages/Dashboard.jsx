import { MACHINES } from "../data/genData";
import SummaryCard from "../components/SummaryCard";
import MachineTable from "../components/MachineTable";

export default function Dashboard({ onViewMachine }) {
  const total = MACHINES.length;
  const low   = MACHINES.filter((m) => m.status === "Low").length;
  const out   = MACHINES.filter((m) => m.status === "Out").length;
  const good  = MACHINES.filter((m) => m.status === "Good").length;

  return (
    <div style={{ padding: "32px 36px", flex: 1, overflowY: "auto", }}>
      {/* Page heading */}
      <div style={{ marginBottom: 28, textAlign: "center" }}>
        <h1 style={{margin: 0, fontSize: 32, fontWeight: 800, fontFamily: "Avenir, sans-serif", color: "#111827", letterSpacing: "-0.4px",}}>
          Dashboard
        </h1>
        <p style={{ margin: "5px 0 0", color: "#6b7280", fontFamily: "Avenir, sans-serif", fontSize: 14 }}>
          Overview of all vending machines and stock status.
        </p>
      </div>

      {/* Summary cards */}
      <div style={{ display: "flex", gap: 14, marginBottom: 28, flexWrap: "wrap" }}>
        <SummaryCard label="Total Machines" value={total} accent="#3b82f6" sub="Across all locations" />
        <SummaryCard label="Low Stock"      value={low}   accent="#f59e0b" sub="Need restocking soon" />
        <SummaryCard label="Out of Stock"   value={out}   accent="#ef4444" sub="Immediate attention" />
        <SummaryCard label="Running Good"   value={good}  accent="#22c55e" sub="No action needed" />
      </div>

      {/* Machine table */}
      <MachineTable machines={MACHINES} onView={onViewMachine} />
    </div>
  );
}