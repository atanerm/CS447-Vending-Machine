import { useMemo, useState } from "react";
import { MACHINES } from "../data/genData";
import StatusBadge from "../components/StatusCard";
import SummaryCard from "../components/SummaryCard";
import { getProductStatus } from "../utils/statusHelpers";


export default function Products({ goBack, goHome }) {
  // Tracks currently selected product
  const [selectedProduct, setSelectedProduct] = useState("");

  /**
   * Builds a unique, sorted list of all product names
   */
  const productOptions = useMemo(() => {
    const names = new Set();

    MACHINES.forEach((machine) => {
      machine.products.forEach((p) => names.add(p.name));
    });

    return Array.from(names).sort();
  }, []);

  /**
   * Builds rows showing where the selected product appears
   */
  const productRows = useMemo(() => {
    if (!selectedProduct) return [];

    return MACHINES.map((machine) => {
      const found = machine.products.find(
        (p) => p.name === selectedProduct
      );

      if (!found) return null;

      return {
        machineId: machine.id,
        machineName: machine.name,
        location: machine.location,
        category: found.category,
        quantity: found.quantity,
        capacity: found.capacity,
        status: getProductStatus(found.quantity, found.capacity),
      };
    }).filter(Boolean); // removes nulls
  }, [selectedProduct]);

  /**
   * Computes summary counts (low, out, good)
   */
  const summary = useMemo(() => {
    let low = 0, out = 0, good = 0;

    productRows.forEach((row) => {
      if (row.status === "Low") low++;
      else if (row.status === "Out") out++;
      else good++;
    });

    return {
      totalMachines: productRows.length,
      low,
      out,
      good,
    };
  }, [productRows]);

  return (
    <div style={{ padding: "32px 36px", flex: 1, overflowY: "auto", marginLeft: "230px"}}>

      {/* Navigation buttons */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <button onClick={goBack} style={navBtn}>← Back</button>
        <button onClick={goHome} style={navBtn}>Home</button>
      </div>

      {/* Page header */}
      <div style={{ marginBottom: 28, textAlign: "center" }}>
        <h1 style={titleStyle}>Products</h1>
        <p style={subtitleStyle}>
          View product availability across all vending machines.
        </p>
      </div>

      {/* Product selector */}
      <div style={cardStyle}>
        <label style={labelStyle}>Select Product</label>

        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          style={inputStyle}
        >
          <option value="">Choose a product...</option>
          {productOptions.map((product) => (
            <option key={product} value={product}>
              {product}
            </option>
          ))}
        </select>
      </div>

      {/* Empty state */}
      {!selectedProduct ? (
        <div style={emptyStateStyle}>
          Select a product to view where it appears across machines.
        </div>
      ) : (
        <>
          {/* Summary cards */}
          <div style={{ display: "flex", gap: 14, marginBottom: 20, flexWrap: "wrap" }}>
            <SummaryCard label="Machines Carrying" value={summary.totalMachines} accent="#3b82f6" sub="Containing this product" />
            <SummaryCard label="Low Stock" value={summary.low} accent="#f59e0b" sub="Need restocking soon" />
            <SummaryCard label="Out of Stock" value={summary.out} accent="#ef4444" sub="Unavailable right now" />
            <SummaryCard label="Running Good" value={summary.good} accent="#22c55e" sub="Healthy stock levels" />
          </div>

          {/* Product info */}
          <div style={cardStyle}>
            <h2 style={sectionTitle}>Product Information</h2>

            <div style={infoGrid}>
              <DetailItem label="Product Name" value={selectedProduct} />
              <DetailItem label="Category" value={productRows[0]?.category || "-"} />
              <DetailItem label="Machines Found" value={summary.totalMachines} />
            </div>
          </div>

          {/* Availability table */}
          <div style={tableContainer}>
            <div style={tableHeader}>
              <h2 style={sectionTitle}>Product Availability</h2>
              <span style={tableCount}>{productRows.length} machines</span>
            </div>

            <table style={tableStyle}>
              <thead>
                <tr style={{ background: "#f8fafc" }}>
                  {["Machine", "Location", "Quantity", "Capacity", "Status"].map((h) => (
                    <th key={h} style={th}>{h}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {productRows.map((row, idx) => (
                  <tr
                    key={`${row.machineId}-${selectedProduct}`}
                    style={{
                      borderBottom: idx < productRows.length - 1 ? "1px solid #f8fafc" : "none",
                    }}
                  >
                    <td style={td}>
                      <strong>{row.machineName}</strong>
                      <div style={machineIdStyle}>{row.machineId}</div>
                    </td>

                    <td style={td}>{row.location}</td>
                    <td style={td}><strong>{row.quantity}</strong></td>
                    <td style={td}>{row.capacity}</td>
                    <td style={td}><StatusBadge status={row.status} /></td>
                  </tr>
                ))}

                {productRows.length === 0 && (
                  <tr>
                    <td colSpan={5} style={emptyRow}>
                      This product was not found in any machine.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

/* ---------- Small reusable components ---------- */

function DetailItem({ label, value }) {
  return (
    <div>
      <p style={detailLabel}>{label}</p>
      <p style={detailValue}>{value}</p>
    </div>
  );
}

/* ---------- Styles ---------- */

const titleStyle = { fontSize: 32, fontWeight: 800 };
const subtitleStyle = { color: "#6b7280", fontSize: 14 };

const cardStyle = {
  background: "#fff",
  borderRadius: 12,
  boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
  padding: "16px 20px",
  marginBottom: 20,
};

const emptyStateStyle = { ...cardStyle, padding: "36px", textAlign: "center" };

const labelStyle = { fontSize: 12, fontWeight: 700, marginBottom: 8 };

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid #e5e7eb",
};

const sectionTitle = { fontSize: 15, fontWeight: 700 };

const infoGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 16,
};

const tableContainer = {
  background: "#fff",
  borderRadius: 12,
  boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
  overflow: "hidden",
};

const tableHeader = {
  padding: "16px 20px",
  display: "flex",
  justifyContent: "space-between",
};

const tableCount = { fontSize: 12 };

const tableStyle = { width: "100%", borderCollapse: "collapse" };

const th = {
  padding: "10px 18px",
  textAlign: "left",
  fontSize: 11,
  fontWeight: 700,
};

const td = { padding: "15px 18px" };

const machineIdStyle = { fontSize: 12, color: "#9ca3af" };

const emptyRow = { padding: "36px", textAlign: "center" };

const detailLabel = { fontSize: 11, fontWeight: 700 };
const detailValue = { fontWeight: 600 };

const navBtn = {
  padding: "6px 12px",
  borderRadius: 8,
  border: "1px solid #e5e7eb",
  background: "#fff",
  cursor: "pointer",
};