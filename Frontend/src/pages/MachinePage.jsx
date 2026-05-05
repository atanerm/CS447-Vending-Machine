import { useEffect, useMemo, useState } from "react";
import { MACHINES } from "../data/genData";
import StatusBadge from "../components/StatusCard";
import ProductTable from "../components/ProductTable";

/**
 * Determines the status of a product based on its quantity
 */
function getProductStatus(quantity, capacity) {
  if (quantity === 0) return "Out";
  if (quantity <= capacity * 0.3) return "Low";
  return "Good";
}

/**
 * Determines overall machine status based on its products
 */
function getMachineStatus(machine) {
  let hasLow = false;

  for (const product of machine.products) {
    const status = getProductStatus(product.quantity, product.capacity);

    if (status === "Out") return "Out";
    if (status === "Low") hasLow = true;
  }

  return hasLow ? "Low" : "Good";
}

export default function Machines({
  selectedMachine,
  onSelectMachine,
  goBack,
  goHome,
}) {
  // Tracks currently selected machine ID (from dropdown or navigation)
  const [currentMachineId, setCurrentMachineId] = useState(
    selectedMachine ? selectedMachine.id : ""
  );

  // Sync dropdown when navigating from dashboard
  useEffect(() => {
    if (selectedMachine) {
      setCurrentMachineId(selectedMachine.id);
    }
  }, [selectedMachine]);

  // Finds the selected machine object from data
  const currentMachine = useMemo(() => {
    return MACHINES.find((m) => m.id === currentMachineId) || null;
  }, [currentMachineId]);

  // Keeps parent state in sync
  useEffect(() => {
    if (currentMachine) {
      onSelectMachine(currentMachine);
    }
  }, [currentMachine, onSelectMachine]);

  /**
   * Computes product summary counts for selected machine
   */
  const productSummary = useMemo(() => {
    if (!currentMachine) return { total: 0, low: 0, out: 0, good: 0 };

    let low = 0, out = 0, good = 0;

    currentMachine.products.forEach((p) => {
      const status = getProductStatus(p.quantity, p.capacity);
      if (status === "Low") low++;
      else if (status === "Out") out++;
      else good++;
    });

    return {
      total: currentMachine.products.length,
      low,
      out,
      good,
    };
  }, [currentMachine]);

  return (
    <div style={{ padding: "32px 36px", flex: 1, overflowY: "auto"}}>

      {/* Navigation buttons */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <button onClick={goBack} style={navBtn}>← Back</button>
        <button onClick={goHome} style={navBtn}>Home</button>
      </div>

      {/* Page header */}
      <div style={{ marginBottom: 28, textAlign: "center" }}>
        <h1 style={titleStyle}>Machines</h1>
        <p style={subtitleStyle}>
          Inspect inventory details for each vending machine.
        </p>
      </div>

      {/* Machine selector */}
      <div style={cardStyle}>
        <label style={labelStyle}>Select Machine</label>

        <select
          value={currentMachineId}
          onChange={(e) => setCurrentMachineId(e.target.value)}
          style={inputStyle}
        >
          <option value="">Choose a machine...</option>
          {MACHINES.map((m) => (
            <option key={m.id} value={m.id}>
              {m.id} - {m.name}
            </option>
          ))}
        </select>
      </div>

      {/* Empty state */}
      {!currentMachine ? (
        <div style={emptyStateStyle}>
          Select a machine to view its inventory details.
        </div>
      ) : (
        <>
          {/* Machine info */}
          <div style={cardStyle}>
            <h2 style={sectionTitle}>Machine Information</h2>

            <div style={infoGrid}>
              <DetailItem label="Machine ID" value={currentMachine.id} />
              <DetailItem label="Name" value={currentMachine.name} />
              <DetailItem label="Location" value={currentMachine.location} />

              <div>
                <p style={detailLabel}>Status</p>
                <StatusBadge status={getMachineStatus(currentMachine)} />
              </div>
            </div>
          </div>

          {/* Summary cards */}
          <div style={{ display: "flex", gap: 14, marginBottom: 20, flexWrap: "wrap" }}>
            <MiniCard label="Total Products" value={productSummary.total} />
            <MiniCard label="Low Items" value={productSummary.low} />
            <MiniCard label="Out of Stock" value={productSummary.out} />
            <MiniCard label="Good Stock" value={productSummary.good} />
          </div>

          {/* Product table */}
          <ProductTable products={currentMachine.products} />
        </>
      )}
    </div>
  );
}

/* ---------- Small reusable UI pieces ---------- */

function DetailItem({ label, value }) {
  return (
    <div>
      <p style={detailLabel}>{label}</p>
      <p style={detailValue}>{value}</p>
    </div>
  );
}

function MiniCard({ label, value }) {
  return (
    <div style={miniCardStyle}>
      <p style={miniLabel}>{label}</p>
      <p style={miniValue}>{value}</p>
    </div>
  );
}

/* ---------- Styles (grouped for readability) ---------- */

const titleStyle = {
  margin: 0,
  fontSize: 32,
  fontWeight: 800,
  fontFamily: "Avenir, sans-serif",
  color: "#111827",
};

const subtitleStyle = {
  margin: "5px 0 0",
  color: "#6b7280",
  fontSize: 14,
};

const cardStyle = {
  background: "#fff",
  borderRadius: 12,
  boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
  padding: "16px 20px",
  marginBottom: 20,
};

const emptyStateStyle = {
  ...cardStyle,
  padding: "36px",
  textAlign: "center",
  color: "#6b7280",
};

const labelStyle = {
  display: "block",
  marginBottom: 8,
  fontSize: 12,
  fontWeight: 700,
  color: "#9ca3af",
};

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid #e5e7eb",
};

const sectionTitle = {
  margin: "0 0 16px",
  fontSize: 15,
  fontWeight: 700,
};

const infoGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  gap: 16,
};

const detailLabel = {
  margin: "0 0 6px",
  color: "#9ca3af",
  fontSize: 11,
  fontWeight: 700,
};

const detailValue = {
  margin: 0,
  fontWeight: 600,
};

const miniCardStyle = {
  background: "#fff",
  borderRadius: 12,
  boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
  padding: "16px 18px",
  minWidth: 180,
  flex: 1,
};

const miniLabel = {
  margin: "0 0 8px",
  fontSize: 11,
  fontWeight: 700,
};

const miniValue = {
  margin: 0,
  fontSize: 24,
  fontWeight: 800,
};

const navBtn = {
  padding: "6px 12px",
  borderRadius: 8,
  border: "1px solid #e5e7eb",
  background: "#fff",
  fontSize: 12,
  fontWeight: 600,
  cursor: "pointer",
};