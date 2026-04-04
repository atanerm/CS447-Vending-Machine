import { useState } from "react";
import StatusBadge from "./StatusCard";

// Shared cell padding style reused across all <td> elements
const td = { padding: "15px 18px", verticalAlign: "middle" };

export default function MachineTable({ machines, onView }) {
  const [filter, setFilter] = useState("All");

  // If "All" is selected, show every machine; otherwise filter by status
  const filtered =
    filter === "All" ? machines : machines.filter((m) => m.status === filter);

  return (
    <div style={{
      background: "#fff", borderRadius: 12,
      boxShadow: "0 1px 3px rgba(0,0,0,0.07)", overflow: "hidden",
    }}>
      {/* Header bar: title on the left, filter buttons on the right */}
      <div style={{
        padding: "16px 20px", borderBottom: "1px solid #f1f5f9",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#111827" }}>
          All Machines
        </h2>

        {/* Filter toggle buttons highlights the active filter */}
        <div style={{ gap: 4, display: "flex" }}>
          {["All", "Good", "Low", "Out"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: "4px 12px", borderRadius: 7, border: "1px solid",
                borderColor: filter === f ? "#3b82f6" : "#e5e7eb",
                background: filter === f ? "#eff6ff" : "#fff",
                color: filter === f ? "#2563eb" : "#6b7280",
                fontSize: 12, fontWeight: 600, cursor: "pointer",
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Machine table */}
      <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "auto" }}>
        <thead>
          <tr style={{ background: "#f8fafc" }}>
            {/* Last header is intentionally blank — sits above the View button column */}
            {["Machine ID", "Name", "Location", "Status", " "].map((h) => (
              <th key={h} style={{
                padding: "10px 18px",
                textAlign: "left",
                fontSize: 11, fontWeight: 700, color: "#9ca3af",
                textTransform: "uppercase", letterSpacing: "0.07em",
                borderBottom: "1px solid #f1f5f9",
              }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.map((machine, idx) => (
            <tr
              key={machine.id}
              // Only add a bottom border if this isn't the last row
              style={{ borderBottom: idx < filtered.length - 1 ? "1px solid #f8fafc" : "none", transition: "background 0.1s" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#fafafa")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              {/* Machine ID */}
              <td style={td}>
                <span style={{ fontFamily: "monospace", fontSize: 12, color: "#6b7280" }}>
                  {machine.id}
                </span>
              </td>
              <td style={td}>
                <span style={{ fontWeight: 600, color: "#111827", fontSize: 14 }}>
                  {machine.name}
                </span>
              </td>
              <td style={td}>
                <span style={{ color: "#6b7280", fontSize: 13 }}>{machine.location}</span>
              </td>
              {/* StatusBadge handles its own color/label logic based on status string */}
              <td style={td}>
                <StatusBadge status={machine.status} />
              </td>
              <td style={{ ...td, textAlign: "right" }}>
                <button
                  onClick={() => onView(machine)}
                  style={{
                    padding: "6px 14px", borderRadius: 7,
                    background: "#0f172a", color: "#fff",
                    border: "none", fontSize: 12, fontWeight: 600, cursor: "pointer",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#1e293b")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#0f172a")}
                >
                  View
                </button>
              </td>
            </tr>
          ))}

          {/* Empty state: shown when no machines match the active filter */}
          {filtered.length === 0 && (
            <tr>
              <td colSpan={5} style={{ padding: "36px", textAlign: "center", color: "#9ca3af", fontSize: 14 }}>
                No machines match this filter.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}