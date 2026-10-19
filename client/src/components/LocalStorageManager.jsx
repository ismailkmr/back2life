import React, { useState } from "react";
import { Database, Trash2, RefreshCw, Copy, Check, Server } from "lucide-react";

export default function LocalStorageManager({ records, syncStatus, lastSynced, onSync, onClear }) {
  const [copied, setCopied] = useState(false);
  const rawData = JSON.stringify(records, null, 2);
  const dataSizeKB = (new Blob([rawData]).size / 1024).toFixed(2);

  const handleCopy = () => {
    navigator.clipboard.writeText(rawData);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ padding: "20px 24px", maxWidth: 960, margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
      <style>{`
        .console-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
          gap: 16px;
          flex-wrap: wrap;
        }

        .info-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }
      `}</style>

      <div className="console-header">
        <div>
          <span style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "#A6821E", fontWeight: 600 }}>
            Developer & Storage Console
          </span>
          <h2 style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: "clamp(20px, 4vw, 26px)", fontWeight: 500, color: "#2E2A1D", margin: "4px 0 0" }}>
            LocalStorage & REST API Data Sync
          </h2>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button
            onClick={onSync}
            style={{
              padding: "9px 16px",
              borderRadius: 8,
              border: "1px solid #D8D2BE",
              background: "#FFFFFF",
              color: "#2E2A1D",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <RefreshCw size={14} /> Sync with Backend
          </button>
          <button
            onClick={onClear}
            style={{
              padding: "9px 16px",
              borderRadius: 8,
              border: "1px solid #F8B4B4",
              background: "#FDE8E8",
              color: "#9B1C1C",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Trash2 size={14} /> Clear LocalStorage
          </button>
        </div>
      </div>

      {/* Info Grid */}
      <div className="info-cards-grid">
        <div style={{ background: "#FFFFFF", border: "1px solid #E4DEC9", borderRadius: 12, padding: "18px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#8A8266", fontSize: 12, textTransform: "uppercase", fontWeight: 600 }}>
            <Database size={16} color="#A6821E" />
            LocalStorage Key
          </div>
          <div style={{ fontFamily: "monospace", fontSize: 14, fontWeight: 600, color: "#2E2A1D", marginTop: 8, wordBreak: "break-all" }}>
            back2life_gym_records
          </div>
          <div style={{ fontSize: 12, color: "#9A8F6E", marginTop: 4 }}>Size: {dataSizeKB} KB</div>
        </div>

        <div style={{ background: "#FFFFFF", border: "1px solid #E4DEC9", borderRadius: 12, padding: "18px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#8A8266", fontSize: 12, textTransform: "uppercase", fontWeight: 600 }}>
            <Server size={16} color="#A6821E" />
            Node.js REST API
          </div>
          <div style={{ fontFamily: "monospace", fontSize: 14, fontWeight: 600, color: "#2E2A1D", marginTop: 8, wordBreak: "break-all" }}>
            http://localhost:5000/api
          </div>
          <div style={{ fontSize: 12, color: "#3B6E2E", marginTop: 4 }}>Status: {syncStatus}</div>
        </div>

        <div style={{ background: "#FFFFFF", border: "1px solid #E4DEC9", borderRadius: 12, padding: "18px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#8A8266", fontSize: 12, textTransform: "uppercase", fontWeight: 600 }}>
            <RefreshCw size={16} color="#A6821E" />
            Last Successful Sync
          </div>
          <div style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: 18, fontWeight: 500, color: "#2E2A1D", marginTop: 8 }}>
            {lastSynced || "Not yet synced"}
          </div>
          <div style={{ fontSize: 12, color: "#9A8F6E", marginTop: 4 }}>{records.length} records in payload</div>
        </div>
      </div>

      {/* Raw JSON Code Block */}
      <div style={{ background: "#FFFFFF", border: "1px solid #E4DEC9", borderRadius: 14, overflow: "hidden" }}>
        <div style={{ background: "#FDFBF7", borderBottom: "1px solid #E4DEC9", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#2E2A1D", fontFamily: "monospace" }}>
            RAW LOCALSTORAGE PAYLOAD (JSON)
          </span>
          <button
            onClick={handleCopy}
            style={{
              background: "#FFFFFF",
              border: "1px solid #D8D2BE",
              borderRadius: 6,
              padding: "6px 12px",
              fontSize: 12,
              fontWeight: 500,
              color: "#5C5540",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            {copied ? <Check size={14} color="#3B6E2E" /> : <Copy size={14} />}
            {copied ? "Copied!" : "Copy JSON"}
          </button>
        </div>

        <pre
          style={{
            margin: 0,
            padding: "20px",
            background: "#1E1E1E",
            color: "#D4D4D4",
            fontSize: 13,
            lineHeight: "1.5",
            fontFamily: "'JetBrains Mono', monospace",
            maxHeight: 400,
            overflowX: "auto",
            overflowY: "auto",
          }}
        >
          <code>{rawData}</code>
        </pre>
      </div>
    </div>
  );
}
