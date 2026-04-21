import { useState } from "react";
import StatusBadge from "./StatusCard";
import { getMachineStatus } from "../utils/statusHelpers";

// Shared table cell style
const td = { padding: "15px 18px", verticalAlign: "middle" };

export default function MachineTable({ machines, onView }) {
  // Tracks selected filter (All, Good, Low, Out)
  const [filter, setFilter] = useState("All");

  /**
   * Filters machines based on overall status
   * "All" shows everything
   */
  const filtered =
    filter === "All"
      ? machines
      : machines.filter((machine) => getMachineStatus(machine) === filter);

  return (
    <div style={containerStyle}>
      {/* Header: title + filter buttons */}
      <div style={headerStyle}>
        <h2 style={titleStyle}>All Machines</h2>

        {/* Filter buttons */}
        <div style={filterRow}>
          {["All", "Good", "Low", "Out"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                ...filterBtn,
                borderColor: filter === f ? "#3b82f6" : "#e5e7eb",
                background: filter === f ? "#eff6ff" : "#fff",
                color: filter === f ? "#2563eb" : "#6b7280",
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Machine table */}
      <table style={tableStyle}>
        <thead>
          <tr style={theadRow}>
            {["Machine ID", "Name", "Location", "Status", " "].map((h) => (
              <th key={h} style={th}>
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {filtered.map((machine, idx) => (
            <tr
              key={machine.id}
              style={{
                borderBottom:
                  idx < filtered.length - 1 ? "1px solid #f8fafc" : "none",
                transition: "background 0.1s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#fafafa")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              {/* Machine ID */}
              <td style={td}>
                <span style={machineIdStyle}>{machine.id}</span>
              </td>

              {/* Machine Name */}
              <td style={td}>
                <span style={machineNameStyle}>{machine.name}</span>
              </td>

              {/* Location */}
              <td style={td}>
                <span style={locationStyle}>{machine.location}</span>
              </td>

              {/* Status (calculated dynamically) */}
              <td style={td}>
                <StatusBadge status={getMachineStatus(machine)} />
              </td>

              {/* View button */}
              <td style={{ ...td, textAlign: "right" }}>
                <button
                  onClick={() => onView(machine)}
                  style={viewBtn}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#1e293b")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#0f172a")
                  }
                >
                  View
                </button>
              </td>
            </tr>
          ))}

          {/* Empty state */}
          {filtered.length === 0 && (
            <tr>
              <td colSpan={5} style={emptyRow}>
                No machines match this filter.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- Styles ---------- */

const containerStyle = {
  background: "#fff",
  borderRadius: 12,
  boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
  overflow: "hidden",
};

const headerStyle = {
  padding: "16px 20px",
  borderBottom: "1px solid #f1f5f9",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const titleStyle = {
  margin: 0,
  fontSize: 15,
  fontWeight: 700,
  color: "#111827",
};

const filterRow = {
  display: "flex",
  gap: 4,
};

const filterBtn = {
  padding: "4px 12px",
  borderRadius: 7,
  border: "1px solid",
  fontSize: 12,
  fontWeight: 600,
  cursor: "pointer",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
};

const theadRow = {
  background: "#f8fafc",
};

const th = {
  padding: "10px 18px",
  textAlign: "left",
  fontSize: 11,
  fontWeight: 700,
  color: "#9ca3af",
  textTransform: "uppercase",
  letterSpacing: "0.07em",
  borderBottom: "1px solid #f1f5f9",
};

const machineIdStyle = {
  fontFamily: "monospace",
  fontSize: 12,
  color: "#6b7280",
};

const machineNameStyle = {
  fontWeight: 600,
  color: "#111827",
  fontSize: 14,
};

const locationStyle = {
  color: "#6b7280",
  fontSize: 13,
};

const viewBtn = {
  padding: "6px 14px",
  borderRadius: 7,
  background: "#0f172a",
  color: "#fff",
  border: "none",
  fontSize: 12,
  fontWeight: 600,
  cursor: "pointer",
  transition: "background 0.15s",
};

const emptyRow = {
  padding: "36px",
  textAlign: "center",
  color: "#9ca3af",
  fontSize: 14,
};