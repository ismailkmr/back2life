import React, { useState } from "react";
import {
  Users,
  Award,
  Calendar,
  Clock,
  Search,
  Trash2,
  UserPlus,
  RefreshCw,
  Database,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

export default function DashboardPage({
  records = [],
  syncStatus = "synced",
  lastSynced,
  onDeleteRecord,
  onNavigateAdd,
  onSyncServer,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRecords = records.filter(
    (r) =>
      r.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.phone?.includes(searchTerm) ||
      r.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.membership?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Dynamic statistics
  const totalMembers = records.length;
  const annualMembers = records.filter((r) => r.membership?.includes("12 Months")).length;
  const shortTermMembers = records.filter((r) => r.membership?.includes("1 Month") || r.membership?.includes("3 Months")).length;

  // Membership plan breakdown count
  const planCounts = {
    "1 Month": records.filter((r) => r.membership === "1 Month").length,
    "3 Months": records.filter((r) => r.membership === "3 Months").length,
    "6 Months": records.filter((r) => r.membership === "6 Months").length,
    "12 Months": records.filter((r) => r.membership === "12 Months" || r.membership === "Annual").length,
  };

  const maxPlanCount = Math.max(...Object.values(planCounts), 1);

  return (
    <div style={{ padding: "20px 24px" }}>
      <style>{`
        .dashboard-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
          gap: 16px;
          flex-wrap: wrap;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }

        .main-dashboard-grid {
          display: grid;
          grid-template-columns: 1.8fr 1fr;
          gap: 20px;
        }

        @media (max-width: 1024px) {
          .main-dashboard-grid {
            grid-template-columns: 1fr;
          }
        }

        .table-responsive-container {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        .member-table {
          min-width: 580px;
        }
      `}</style>

      {/* Header */}
      <div className="dashboard-header">
        <div>
          <span style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "#A6821E", fontWeight: 600 }}>
            Gym Dashboard Overview
          </span>
          <h1 style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 500, fontSize: "clamp(20px, 4vw, 28px)", color: "#2E2A1D", margin: "4px 0 0" }}>
            Back 2 Life Gym Management
          </h1>
        </div>

        <div className="header-actions">
          {/* Sync Status Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "7px 12px",
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 600,
              background: syncStatus === "synced" ? "#EAF3E4" : syncStatus === "syncing" ? "#FBEFDD" : "#FEE2E2",
              color: syncStatus === "synced" ? "#3B6E2E" : syncStatus === "syncing" ? "#A6741A" : "#9B1C1C",
              border: `1px solid ${syncStatus === "synced" ? "#C6E1B9" : syncStatus === "syncing" ? "#F5D7A1" : "#F8B4B4"}`,
            }}
          >
            {syncStatus === "synced" && <ShieldCheck size={15} />}
            {syncStatus === "syncing" && <RefreshCw size={15} className="spin" />}
            {syncStatus === "offline" && <AlertTriangle size={15} />}
            <span>
              {syncStatus === "synced"
                ? `Synced (${lastSynced || "Now"})`
                : syncStatus === "syncing"
                ? "Syncing..."
                : "Saved in LocalStorage"}
            </span>
          </div>

          <button
            onClick={onSyncServer}
            title="Manual Sync"
            style={{
              background: "#FFFFFF",
              border: "1px solid #E4DEC9",
              borderRadius: 8,
              padding: "8px 12px",
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 13,
              cursor: "pointer",
              color: "#5C5540",
            }}
          >
            <RefreshCw size={14} /> Refresh API
          </button>

          <button
            onClick={onNavigateAdd}
            style={{
              background: "#A6821E",
              color: "#FFFFFF",
              border: "none",
              borderRadius: 8,
              padding: "9px 16px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 13.5,
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(166,130,30,0.2)",
            }}
          >
            <UserPlus size={16} /> New Member
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div style={{ background: "#FFFFFF", border: "1px solid #E4DEC9", borderRadius: 12, padding: "18px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ fontSize: 12, color: "#8A8266", textTransform: "uppercase", letterSpacing: "0.04em", fontWeight: 600 }}>
              Total Members
            </span>
            <Users size={18} color="#A6821E" />
          </div>
          <div style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 500, fontSize: 30, color: "#2E2A1D" }}>
            {totalMembers}
          </div>
          <div style={{ fontSize: 12, color: "#9A8F6E", marginTop: 4 }}>Stored in LocalStorage & API</div>
        </div>

        <div style={{ background: "#FFFFFF", border: "1px solid #E4DEC9", borderRadius: 12, padding: "18px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ fontSize: 12, color: "#8A8266", textTransform: "uppercase", letterSpacing: "0.04em", fontWeight: 600 }}>
              Annual Plans
            </span>
            <Award size={18} color="#A6821E" />
          </div>
          <div style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 500, fontSize: 30, color: "#2E2A1D" }}>
            {annualMembers}
          </div>
          <div style={{ fontSize: 12, color: "#9A8F6E", marginTop: 4 }}>12-Month Subscriptions</div>
        </div>

        <div style={{ background: "#FFFFFF", border: "1px solid #E4DEC9", borderRadius: 12, padding: "18px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ fontSize: 12, color: "#8A8266", textTransform: "uppercase", letterSpacing: "0.04em", fontWeight: 600 }}>
              Short-term Plans
            </span>
            <Clock size={18} color="#A6821E" />
          </div>
          <div style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 500, fontSize: 30, color: "#2E2A1D" }}>
            {shortTermMembers}
          </div>
          <div style={{ fontSize: 12, color: "#9A8F6E", marginTop: 4 }}>1 to 3 Month Plans</div>
        </div>

        <div style={{ background: "#FFFFFF", border: "1px solid #E4DEC9", borderRadius: 12, padding: "18px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ fontSize: 12, color: "#8A8266", textTransform: "uppercase", letterSpacing: "0.04em", fontWeight: 600 }}>
              Storage Mode
            </span>
            <Database size={18} color="#A6821E" />
          </div>
          <div style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 500, fontSize: 20, color: "#2E2A1D", marginTop: 6 }}>
            Dual Sync
          </div>
          <div style={{ fontSize: 12, color: "#3B6E2E", fontWeight: 600, marginTop: 6 }}>
            LocalStorage + Node.js API
          </div>
        </div>
      </div>

      {/* Main Grid: Member Directory + Plan Breakdown */}
      <div className="main-dashboard-grid">
        {/* Member Directory */}
        <div style={{ background: "#FFFFFF", border: "1px solid #E4DEC9", borderRadius: 14, padding: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18, flexWrap: "wrap", gap: 12 }}>
            <h2 style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 500, fontSize: 18, color: "#2E2A1D", margin: 0 }}>
              Gym Members Directory ({filteredRecords.length})
            </h2>

            <div style={{ position: "relative", width: "100%", maxWidth: 220 }}>
              <Search size={15} color="#A39C82" style={{ position: "absolute", left: 11, top: 10 }} />
              <input
                placeholder="Search member..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  background: "#F9F8F3",
                  border: "1px solid #E4DEC9",
                  borderRadius: 8,
                  padding: "8px 12px 8px 32px",
                  fontSize: 13,
                  color: "#2E2A1D",
                  outline: "none",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          {filteredRecords.length === 0 ? (
            <div style={{ padding: "40px 0", textAlign: "center", color: "#8A8266" }}>
              No gym members found. Click "New Member" to register one!
            </div>
          ) : (
            <div className="table-responsive-container">
              <div className="member-table">
                <div style={{ display: "grid", gridTemplateColumns: "90px 1.4fr 1fr 1fr 80px 50px", padding: "0 4px 10px", borderBottom: "1px solid #EFEAD9" }}>
                  {["Member ID", "Name", "Phone", "Plan", "Joined", "Action"].map((h) => (
                    <span key={h} style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.04em", color: "#9A8F6E", fontWeight: 600 }}>
                      {h}
                    </span>
                  ))}
                </div>

                {filteredRecords.map((rec) => (
                  <div
                    key={rec.id}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "90px 1.4fr 1fr 1fr 80px 50px",
                      padding: "12px 4px",
                      borderBottom: "1px solid #F6F1E4",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontFamily: "monospace", fontSize: 12, color: "#A6821E", fontWeight: 600 }}>{rec.id}</span>
                    <div>
                      <div style={{ fontSize: 13.5, color: "#2E2A1D", fontWeight: 600 }}>{rec.name}</div>
                      <div style={{ fontSize: 11.5, color: "#9A8F6E" }}>{rec.email || rec.gender}</div>
                    </div>
                    <span style={{ fontSize: 13, color: "#5C5540" }}>{rec.phone}</span>
                    <span
                      style={{
                        fontSize: 11.5,
                        fontWeight: 600,
                        padding: "3px 10px",
                        borderRadius: 12,
                        width: "fit-content",
                        background: "#F6F1E4",
                        color: "#A6821E",
                      }}
                    >
                      {rec.membership || "Monthly"}
                    </span>
                    <span style={{ fontSize: 12, color: "#9A8F6E" }}>{rec.joiningDate || "Recent"}</span>
                    <button
                      onClick={() => onDeleteRecord && onDeleteRecord(rec.id)}
                      title="Delete member"
                      style={{
                        background: "none",
                        border: "none",
                        color: "#B3552F",
                        cursor: "pointer",
                        padding: 4,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Membership Breakdown Card */}
        <div style={{ background: "#FFFFFF", border: "1px solid #E4DEC9", borderRadius: 14, padding: "20px" }}>
          <h2 style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 500, fontSize: 18, color: "#2E2A1D", margin: "0 0 20px" }}>
            Plans Distribution
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {Object.entries(planCounts).map(([planName, count]) => (
              <div key={planName}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 13, color: "#5C5540", fontWeight: 500 }}>{planName}</span>
                  <span style={{ fontSize: 12.5, color: "#A6821E", fontWeight: 600 }}>{count} members</span>
                </div>
                <div style={{ background: "#F6F1E4", borderRadius: 20, height: 10, overflow: "hidden" }}>
                  <div
                    style={{
                      width: `${(count / maxPlanCount) * 100}%`,
                      height: "100%",
                      background: "linear-gradient(90deg, #A6821E 0%, #D4AF37 100%)",
                      borderRadius: 20,
                      transition: "width 0.4s ease",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 32,
              padding: "16px",
              background: "#FDFBF7",
              border: "1px dashed #D8D2BE",
              borderRadius: 10,
              fontSize: 12.5,
              color: "#7A7156",
            }}
          >
            <strong style={{ color: "#2E2A1D", display: "block", marginBottom: 4 }}>💡 LocalStorage Persistence</strong>
            All changes are stored directly in your browser's <code style={{ background: "#EFEAD9", padding: "2px 4px", borderRadius: 4 }}>localStorage</code> and synchronized with the Node.js Express backend API (`http://localhost:5000/api/records`).
          </div>
        </div>
      </div>
    </div>
  );
}