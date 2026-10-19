import React, { useState } from "react";
import { User, Phone, Mail, Calendar, MapPin, Award, CheckCircle, Database } from "lucide-react";

export default function AdmissionForm({ onAddRecord, onCancel }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    age: "",
    gender: "Male",
    address: "",
    membership: "3 Months",
    joiningDate: new Date().toISOString().split("T")[0],
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    setLoading(true);
    setFeedback(null);

    try {
      if (onAddRecord) {
        const result = await onAddRecord(form);
        setFeedback({
          type: "success",
          message: result?.message || "Member registered! Saved in LocalStorage & synced with API.",
        });
      }

      setForm({
        name: "",
        phone: "",
        email: "",
        age: "",
        gender: "Male",
        address: "",
        membership: "3 Months",
        joiningDate: new Date().toISOString().split("T")[0],
      });
    } catch (err) {
      setFeedback({
        type: "error",
        message: err.message || "Failed to save record",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: "#FFFFFF",
        border: "1px solid #E4DEC9",
        borderRadius: 16,
        padding: "clamp(20px, 4vw, 32px)",
        boxShadow: "0 4px 20px rgba(46,42,29,0.05)",
        maxWidth: 720,
        margin: "0 auto",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <style>{`
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px 20px;
        }

        @media (max-width: 600px) {
          .form-grid {
            grid-template-columns: 1fr;
          }

          .full-width-mobile {
            grid-column: span 1 !important;
          }
        }
      `}</style>

      <div style={{ marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <span style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "#A6821E", fontWeight: 600 }}>
            New Admission
          </span>
          <h2 style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: 24, fontWeight: 500, color: "#2E2A1D", margin: "4px 0 0" }}>
            Register Gym Member
          </h2>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#F6F1E4", padding: "6px 12px", borderRadius: 20, fontSize: 12, color: "#8A8266" }}>
          <Database size={14} color="#A6821E" />
          <span>Saves to LocalStorage & API</span>
        </div>
      </div>

      {feedback && (
        <div
          style={{
            padding: "12px 16px",
            borderRadius: 8,
            marginBottom: 20,
            fontSize: 13,
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: feedback.type === "success" ? "#EAF3E4" : "#FDE8E8",
            color: feedback.type === "success" ? "#3B6E2E" : "#9B1C1C",
            border: `1px solid ${feedback.type === "success" ? "#C6E1B9" : "#F8B4B4"}`,
          }}
        >
          <CheckCircle size={16} />
          {feedback.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="form-grid">
        {/* Full Name */}
        <div style={{ gridColumn: "span 2" }} className="full-width-mobile">
          <label style={{ display: "block", fontSize: 12, color: "#7A7156", fontWeight: 600, marginBottom: 6 }}>
            FULL NAME *
          </label>
          <div style={{ position: "relative" }}>
            <User size={16} color="#A39C82" style={{ position: "absolute", left: 12, top: 12 }} />
            <input
              name="name"
              placeholder="e.g. Ismail Thacher"
              value={form.name}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px 12px 10px 38px",
                borderRadius: 8,
                border: "1px solid #D8D2BE",
                fontSize: 14,
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label style={{ display: "block", fontSize: 12, color: "#7A7156", fontWeight: 600, marginBottom: 6 }}>
            PHONE NUMBER *
          </label>
          <div style={{ position: "relative" }}>
            <Phone size={16} color="#A39C82" style={{ position: "absolute", left: 12, top: 12 }} />
            <input
              name="phone"
              placeholder="e.g. +91 9645124005"
              value={form.phone}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px 12px 10px 38px",
                borderRadius: 8,
                border: "1px solid #D8D2BE",
                fontSize: 14,
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label style={{ display: "block", fontSize: 12, color: "#7A7156", fontWeight: 600, marginBottom: 6 }}>
            EMAIL ADDRESS
          </label>
          <div style={{ position: "relative" }}>
            <Mail size={16} color="#A39C82" style={{ position: "absolute", left: 12, top: 12 }} />
            <input
              name="email"
              type="email"
              placeholder="member@email.com"
              value={form.email}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px 12px 10px 38px",
                borderRadius: 8,
                border: "1px solid #D8D2BE",
                fontSize: 14,
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>
        </div>

        {/* Age */}
        <div>
          <label style={{ display: "block", fontSize: 12, color: "#7A7156", fontWeight: 600, marginBottom: 6 }}>
            AGE
          </label>
          <input
            name="age"
            type="number"
            placeholder="e.g. 26"
            value={form.age}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 8,
              border: "1px solid #D8D2BE",
              fontSize: 14,
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Gender */}
        <div>
          <label style={{ display: "block", fontSize: 12, color: "#7A7156", fontWeight: 600, marginBottom: 6 }}>
            GENDER
          </label>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 8,
              border: "1px solid #D8D2BE",
              fontSize: 14,
              outline: "none",
              background: "#FFFFFF",
              boxSizing: "border-box",
            }}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Membership Plan */}
        <div>
          <label style={{ display: "block", fontSize: 12, color: "#7A7156", fontWeight: 600, marginBottom: 6 }}>
            MEMBERSHIP DURATION
          </label>
          <div style={{ position: "relative" }}>
            <Award size={16} color="#A39C82" style={{ position: "absolute", left: 12, top: 12 }} />
            <select
              name="membership"
              value={form.membership}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px 12px 10px 38px",
                borderRadius: 8,
                border: "1px solid #D8D2BE",
                fontSize: 14,
                outline: "none",
                background: "#FFFFFF",
                boxSizing: "border-box",
              }}
            >
              <option value="1 Month">1 Month Membership</option>
              <option value="3 Months">3 Months Membership</option>
              <option value="6 Months">6 Months Membership</option>
              <option value="12 Months">12 Months (Annual)</option>
            </select>
          </div>
        </div>

        {/* Joining Date */}
        <div>
          <label style={{ display: "block", fontSize: 12, color: "#7A7156", fontWeight: 600, marginBottom: 6 }}>
            JOINING DATE
          </label>
          <div style={{ position: "relative" }}>
            <Calendar size={16} color="#A39C82" style={{ position: "absolute", left: 12, top: 12 }} />
            <input
              type="date"
              name="joiningDate"
              value={form.joiningDate}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px 12px 10px 38px",
                borderRadius: 8,
                border: "1px solid #D8D2BE",
                fontSize: 14,
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>
        </div>

        {/* Address */}
        <div style={{ gridColumn: "span 2" }} className="full-width-mobile">
          <label style={{ display: "block", fontSize: 12, color: "#7A7156", fontWeight: 600, marginBottom: 6 }}>
            ADDRESS
          </label>
          <div style={{ position: "relative" }}>
            <MapPin size={16} color="#A39C82" style={{ position: "absolute", left: 12, top: 12 }} />
            <textarea
              name="address"
              placeholder="City, Street or Full Address"
              rows={2}
              value={form.address}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px 12px 10px 38px",
                borderRadius: 8,
                border: "1px solid #D8D2BE",
                fontSize: 14,
                outline: "none",
                fontFamily: "inherit",
                boxSizing: "border-box",
              }}
            />
          </div>
        </div>

        {/* Submit & Cancel Buttons */}
        <div style={{ gridColumn: "span 2", display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 10 }} className="full-width-mobile">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              style={{
                padding: "10px 20px",
                borderRadius: 8,
                border: "1px solid #D8D2BE",
                background: "#FFFFFF",
                color: "#5C5540",
                fontSize: 14,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "10px 24px",
              borderRadius: 8,
              border: "none",
              background: "#A6821E",
              color: "#FFFFFF",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
              boxShadow: "0 2px 8px rgba(166,130,30,0.25)",
            }}
          >
            {loading ? "Registering..." : "Submit Admission"}
          </button>
        </div>
      </form>
    </div>
  );
}