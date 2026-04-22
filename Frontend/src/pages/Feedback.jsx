import { useState } from "react";
import { MACHINES } from "../data/genData";

export default function Feedback({ goBack, goHome }) {
  // Stores the form input values
  const [machineId, setMachineId] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  // Controls the success message after submission
  const [submitted, setSubmitted] = useState(false);

  // Handles form submission and simple validation
  function handleSubmit(e) {
    e.preventDefault();

    // Require all fields before allowing submission
    if (!machineId || !subject || !message) {
      alert("Please fill out all fields.");
      return;
    }

    // Temporary placeholder for future backend/database submission
    console.log({
      machineId,
      subject,
      message,
    });

    // Reset form after successful submission
    setMachineId("");
    setSubject("");
    setMessage("");
    setSubmitted(true);
  }

  return (
    <div style={pageLayout}>
      <div style={pageContent}>
        {/* Navigation buttons */}
        <div style={navRow}>
          <button onClick={goBack} style={navBtn}>
            ← Back
          </button>
          <button onClick={goHome} style={navBtn}>
            Home
          </button>
        </div>

        {/* Feedback form container */}
        <div style={formCard}>
          {/* Page heading */}
          <div style={headerSection}>
            <h1 style={titleStyle}>Submit Feedback</h1>
            <p style={subtitleStyle}>
              Let us know about any issues with vending machines.
            </p>
          </div>

          {/* Success message after submission */}
          {submitted && (
            <div style={successMessage}>
              Feedback submitted successfully!
            </div>
          )}

          {/* Feedback form */}
          <form onSubmit={handleSubmit} style={formStyle}>
            <div>
              <label style={labelStyle}>Machine</label>
              <select
                value={machineId}
                onChange={(e) => setMachineId(e.target.value)}
                style={inputStyle}
              >
                <option value="">Select a machine...</option>
                {MACHINES.map((machine) => (
                  <option key={machine.id} value={machine.id}>
                    {machine.id} - {machine.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={labelStyle}>Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Brief description..."
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe the issue..."
                rows={4}
                style={{ ...inputStyle, resize: "none" }}
              />
            </div>

            <button
              type="submit"
              style={submitBtn}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#1e293b")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#0f172a")}
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ---------- Layout styles ---------- */

const pageLayout = {
  padding: "32px 36px",
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  marginLeft: "230px",
};

const pageContent = {
  width: "100%",
  maxWidth: 500,
};

const navRow = {
  display: "flex",
  gap: 10,
  marginBottom: 20,
};

const formCard = {
  width: "100%",
  background: "#fff",
  borderRadius: 12,
  boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
  padding: "28px",
};

const headerSection = {
  marginBottom: 24,
  textAlign: "center",
};

const titleStyle = {
  margin: 0,
  fontSize: 28,
  fontWeight: 800,
  color: "#111827",
};

const subtitleStyle = {
  marginTop: 6,
  color: "#6b7280",
  fontSize: 14,
};

const successMessage = {
  background: "#ecfdf3",
  color: "#16a34a",
  padding: "10px 14px",
  borderRadius: 8,
  marginBottom: 16,
  fontSize: 13,
  textAlign: "center",
};

const formStyle = {
  display: "grid",
  gap: 16,
};

/* ---------- Reusable control styles ---------- */

const navBtn = {
  padding: "6px 12px",
  borderRadius: 8,
  border: "1px solid #e5e7eb",
  background: "#fff",
  color: "#374151",
  fontSize: 12,
  fontWeight: 600,
  cursor: "pointer",
};

const labelStyle = {
  display: "block",
  marginBottom: 6,
  fontSize: 12,
  fontWeight: 700,
  color: "#9ca3af",
  textTransform: "uppercase",
  letterSpacing: "0.07em",
};

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid #e5e7eb",
  fontSize: 14,
  outline: "none",
};

const submitBtn = {
  marginTop: 8,
  padding: "10px",
  borderRadius: 8,
  border: "none",
  background: "#0f172a",
  color: "#fff",
  fontWeight: 600,
  cursor: "pointer",
  transition: "background 0.15s",
};