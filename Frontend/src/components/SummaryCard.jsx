// accent top border color, used to visually tell card types (green for Good, red for Out...)
export default function SummaryCard({ label, value, accent, sub }) {
  return (
    <div style={{
      background: "#fff",
      borderRadius: 12,
      padding: "20px 24px",
      borderTop: `4px solid ${accent}`,
      flex: 1,
      minWidth: 160,
    }}>
      {/* Small uppercase label above the main value */}
      <p style={{
        margin: 0, fontSize: 11, fontWeight: 700,
        color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.07em",
      }}>
        {label}
      </p>

      {/* NUmber of values for the summary cards value */}
      <p style={{
        margin: "10px 0 4px", fontSize: 36, fontWeight: 800,
        color: "#111827", lineHeight: 1,
      }}>
        {value}
      </p>

      {/* subtitle */}
      {sub && (
        <p style={{ margin: 0, fontSize: 12, color: "#9ca3af" }}>{sub}</p>
      )}
    </div>
  );
}