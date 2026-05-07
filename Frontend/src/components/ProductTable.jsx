import { useEffect, useState } from "react";
import StatusBadge from "./StatusCard";
import { getProductStatus } from "../utils/statusHelpers";

// Shared table cell style
const td = {
  padding: "15px 18px",
  verticalAlign: "middle",
};

export default function ProductTable({ products = [], onSave, onCancel , user}) {
  const [draftProducts, setDraftProducts] = useState(
    products.map((product) => ({ ...product }))
  );
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setDraftProducts(products.map((product) => ({ ...product })));
    if (isEditing) {
      setIsEditing(false);
    }
  }, [products]);

  const updateQuantity = (name, delta) => {
    setDraftProducts((current) =>
      current.map((product) => {
        if (product.name !== name) return product;

        const nextQuantity = Math.max(
          0,
          Math.min(product.quantity + delta, product.capacity)
        );

        return { ...product, quantity: nextQuantity };
      })
    );
  };

  const handleSave = () => {
    setIsEditing(false);
    onSave?.(draftProducts.map((product) => ({ ...product })));
  };

  const handleCancel = () => {
    setDraftProducts(products.map((product) => ({ ...product })));
    setIsEditing(false);
    onCancel?.();
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div>
          <h2 style={titleStyle}>Products</h2>
          <span style={countStyle}>{products.length} items</span>
        </div>

        {user?.role_name.toLowerCase() !== "student"?(<div style={buttonRow}>
          {!isEditing ? (
            <button style={editBtn} onClick={() => setIsEditing(true)}>
              Edit inventory
            </button>
          ) : (
            <>
              <button style={saveBtn} onClick={handleSave}>
                Save
              </button>
              <button style={cancelBtn} onClick={handleCancel}>
                Cancel
              </button>
            </>
          )}
        </div>):null}
      </div>

      {isEditing && (
        <div style={editingBannerStyle}>
          ✎ Editing mode active — changes are draft until saved
        </div>
      )}

      <table style={tableStyle}>
        <thead>
          <tr style={theadRow}>
            {["Slot", "Product", "Quantity", "Capacity", "Status"].map(
              (heading) => (
                <th key={heading} style={th}>
                  {heading}
                </th>
              )
            )}
          </tr>
        </thead>

        <tbody>
          {draftProducts.map((product, idx) => {
            const status = getProductStatus(product.quantity, product.capacity);

            return (
              <tr
                key={product.name}
                style={{
                  borderBottom:
                    idx < draftProducts.length - 1
                      ? "1px solid #f8fafc"
                      : "none",
                  transition: "background 0.1s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#fafafa")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <td style={td}>
                  <span style={mutedTextStyle}>{idx + 1}</span>
                </td>

                <td style={td}>
                  <span style={productNameStyle}>{product.name}</span>
                </td>

                <td style={td}>
                  {isEditing ? (
                    <div style={quantityControl}>
                      <button
                        style={circleBtn}
                        onClick={() => updateQuantity(product.name, -1)}
                        disabled={product.quantity <= 0}
                      >
                        −
                      </button>
                      <span style={quantityValue}>{product.quantity}</span>
                      <button
                        style={circleBtn}
                        onClick={() => updateQuantity(product.name, 1)}
                        disabled={product.quantity >= product.capacity}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <span style={valueTextStyle}>{product.quantity}</span>
                  )}
                </td>

                <td style={td}>
                  <span style={mutedTextStyle}>{product.capacity}</span>
                </td>

                <td style={td}>
                  <StatusBadge status={status} />
                </td>
              </tr>
            );
          })}

          {draftProducts.length === 0 && (
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

const editingBannerStyle = {
  padding: "12px 20px",
  background: "#fef3c7",
  borderBottom: "1px solid #fde68a",
  fontSize: 13,
  fontWeight: 600,
  color: "#92400e",
};

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

const buttonRow = {
  display: "flex",
  gap: 10,
};

const editBtn = {
  background: "#10b981",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  padding: "10px 16px",
  cursor: "pointer",
  fontWeight: 700,
};

const saveBtn = {
  ...editBtn,
};

const cancelBtn = {
  background: "#ef4444",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  padding: "10px 16px",
  cursor: "pointer",
  fontWeight: 700,
};

const circleBtn = {
  width: 32,
  height: 32,
  borderRadius: "50%",
  border: "1px solid #d1d5db",
  background: "#f8fafc",
  color: "#111827",
  fontSize: 18,
  fontWeight: 700,
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
};

const quantityControl = {
  display: "inline-flex",
  alignItems: "center",
  gap: 10,
};

const quantityValue = {
  minWidth: 28,
  textAlign: "center",
  fontWeight: 700,
  color: "#111827",
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

const productNameStyle = {
  fontWeight: 600,
  color: "#111827",
  fontSize: 14,
};

const mutedTextStyle = {
  color: "#6b7280",
  fontSize: 13,
};