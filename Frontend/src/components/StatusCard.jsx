// Maps each status string to its color scheme
const STATUS_CONFIG = {
  Good: { color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0", dot: "#22c55e" },
  Low:  { color: "#d97706", bg: "#fffbeb", border: "#fde68a", dot: "#f59e0b" },
  Out:  { color: "#dc2626", bg: "#fef2f2", border: "#fecaca", dot: "#ef4444" },
};

// Falls back to "Good" styles if an unrecognized status is passed in
export default function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG["Good"];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "4px 12px", borderRadius: 999,
      background: cfg.bg, border: `1px solid ${cfg.border}`,
      color: cfg.color, fontSize: 12, fontWeight: 600,
    }}>
      {/* Colored dot indicator */}
      <span style={{ width: 7, height: 7, borderRadius: "50%", background: cfg.dot }} />
      {status}
    </span>
  );
}