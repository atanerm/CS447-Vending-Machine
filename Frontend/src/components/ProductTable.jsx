import StatusBadge from "./StatusCard";
import { getProductStatus } from "../utils/statusHelpers";

// Shared table cell style
const td = {
  padding: "15px 18px",
  verticalAlign: "middle",
};

export default function ProductTable({ products }) {
  return (
    <div style={containerStyle}>
      {/* Header bar */}
      <div style={headerStyle}>
        <h2 style={titleStyle}>Products</h2>

        <span style={countStyle}>
          {products.length} items
        </span>
      </div>

      {/* Product table */}
      <table style={tableStyle}>
        <thead>
          <tr style={theadRow}>
            {["Slot", "Product", "Quantity", "Capacity", "Status"].map((heading) => (
              <th key={heading} style={th}>
                {heading}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {products.map((product, idx) => {
            // Calculates product status from quantity and capacity
            const status = getProductStatus(product.quantity, product.capacity);

            return (
              <tr
                key={product.name}
                style={{
                  borderBottom:
                    idx < products.length - 1 ? "1px solid #f8fafc" : "none",
                  transition: "background 0.1s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#fafafa")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                {/* Slot */}
                <td style={td}>
                  <span style={mutedTextStyle}>{idx + 1}</span>
                </td>

                {/* Product name */}
                <td style={td}>
                  <span style={productNameStyle}>{product.name}</span>
                </td>

                {/* Quantity */}
                <td style={td}>
                  <span style={valueTextStyle}>{product.quantity}</span>
                </td>

                {/* Capacity */}
                <td style={td}>
                  <span style={mutedTextStyle}>{product.capacity}</span>
                </td>

                {/* Status */}
                <td style={td}>
                  <StatusBadge status={status} />
                </td>
              </tr>
            );
          })}

          {/* Empty state */}
          {products.length === 0 && (
            <tr>
              <td colSpan={5} style={emptyRowStyle}>
                No products available for this machine.
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

const countStyle = {
  fontSize: 12,
  fontWeight: 600,
  color: "#6b7280",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  tableLayout: "auto",
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

const productNameStyle = {
  fontWeight: 600,
  color: "#111827",
  fontSize: 14,
};

const mutedTextStyle = {
  color: "#6b7280",
  fontSize: 13,
};

const valueTextStyle = {
  color: "#111827",
  fontSize: 13,
};

const emptyRowStyle = {
  padding: "36px",
  textAlign: "center",
  color: "#9ca3af",
  fontSize: 14,
};