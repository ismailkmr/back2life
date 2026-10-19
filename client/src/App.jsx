import React, { useState } from "react";
import {
  LayoutDashboard,
  UserPlus,
  Database,
  Dumbbell,
  RefreshCw,
  Menu,
  X,
  AlertCircle,
} from "lucide-react";
import DashboardPage from "./Dashboard";
import AdmissionForm from "./components/AdmissionForm";
import LocalStorageManager from "./components/LocalStorageManager";
import { useLocalStorageRecords } from "./hooks/useLocalStorageRecords";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const {
    records,
    loading,
    syncStatus,
    lastSynced,
    error,
    addRecord,
    deleteRecord,
    syncWithServer,
    clearLocalStorage,
  } = useLocalStorageRecords();

  const navItems = [
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { key: "admission", label: "New Admission", icon: UserPlus },
    { key: "storage", label: "LocalStorage & API", icon: Database },
  ];

  const handleTabClick = (key) => {
    setActiveTab(key);
    setMobileMenuOpen(false);
  };

  return (
    <div style={{ background: "#EFEAD9", minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        
        * { box-sizing: border-box; }
        
        #root { width: 100% !important; max-width: 100% !important; margin: 0; padding: 0; }

        .spin {
          animation: spin 1.2s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .app-container {
          display: grid;
          grid-template-columns: 250px 1fr;
          min-height: 100vh;
        }

        .mobile-header {
          display: none;
        }

        @media (max-width: 868px) {
          .app-container {
            grid-template-columns: 1fr;
          }

          .desktop-sidebar {
            display: none !important;
          }

          .mobile-header {
            display: flex !important;
            align-items: center;
            justify-content: space-between;
            background: #FFFFFF;
            border-bottom: 1px solid #E4DEC9;
            padding: 14px 20px;
            position: sticky;
            top: 0;
            z-index: 100;
          }

          .mobile-drawer {
            display: flex;
            flex-direction: column;
            background: #FFFFFF;
            border-bottom: 1px solid #E4DEC9;
            padding: 16px 20px;
            gap: 8px;
          }
        }
      `}</style>

      {/* Mobile Top Navigation Header */}
      <div className="mobile-header">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 8,
              background: "#F6F1E4",
              border: "1px solid #E4DEC9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Dumbbell size={18} color="#A6821E" />
          </div>
          <div>
            <div style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 600, fontSize: 16, color: "#2E2A1D" }}>
              Back 2 Life Gym
            </div>
          </div>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            background: "#F6F1E4",
            border: "1px solid #E4DEC9",
            borderRadius: 8,
            padding: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#2E2A1D",
          }}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.key;
            return (
              <button
                key={item.key}
                onClick={() => handleTabClick(item.key)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 14px",
                  borderRadius: 8,
                  border: "none",
                  background: isActive ? "#F6F1E4" : "transparent",
                  color: isActive ? "#A6821E" : "#5C5540",
                  fontSize: 14,
                  fontWeight: isActive ? 600 : 500,
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <Icon size={18} />
                {item.label}
                {item.key === "dashboard" && (
                  <span
                    style={{
                      marginLeft: "auto",
                      background: isActive ? "#A6821E" : "#E4DEC9",
                      color: isActive ? "#FFF" : "#5C5540",
                      fontSize: 11,
                      padding: "2px 7px",
                      borderRadius: 10,
                      fontWeight: 600,
                    }}
                  >
                    {records.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      <div className="app-container">
        {/* Desktop Sidebar */}
        <aside className="desktop-sidebar" style={{ background: "#FFFFFF", borderRight: "1px solid #E4DEC9", padding: "26px 20px", display: "flex", flexDirection: "column" }}>
          {/* Gym Brand Header */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "0 6px", marginBottom: 36 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: "#F6F1E4",
                border: "1px solid #E4DEC9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 6px rgba(46,42,29,0.06)",
              }}
            >
              <Dumbbell size={22} color="#A6821E" />
            </div>
            <div>
              <div style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 600, fontSize: 18, color: "#2E2A1D", lineHeight: 1.1 }}>
                Back 2 Life
              </div>
              <span style={{ fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: "#A6821E", fontWeight: 600 }}>
                Fitness & Gym
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => setActiveTab(item.key)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "11px 14px",
                    borderRadius: 8,
                    border: "none",
                    background: isActive ? "#F6F1E4" : "transparent",
                    color: isActive ? "#A6821E" : "#5C5540",
                    fontSize: 14,
                    fontWeight: isActive ? 600 : 500,
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.15s ease",
                  }}
                >
                  <Icon size={18} />
                  {item.label}
                  {item.key === "dashboard" && (
                    <span
                      style={{
                        marginLeft: "auto",
                        background: isActive ? "#A6821E" : "#E4DEC9",
                        color: isActive ? "#FFF" : "#5C5540",
                        fontSize: 11,
                        padding: "2px 7px",
                        borderRadius: 10,
                        fontWeight: 600,
                      }}
                    >
                      {records.length}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* LocalStorage Status Widget at bottom of sidebar */}
          <div style={{ marginTop: "auto", paddingTop: 20, borderTop: "1px solid #EFEAD9" }}>
            <div style={{ background: "#FDFBF7", border: "1px solid #E4DEC9", borderRadius: 10, padding: "14px", fontSize: 12 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ color: "#7A7156", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                  <Database size={13} color="#A6821E" /> Storage Sync
                </span>
                <span
                  style={{
                    fontSize: 10.5,
                    padding: "2px 6px",
                    borderRadius: 10,
                    fontWeight: 600,
                    background: syncStatus === "synced" ? "#EAF3E4" : "#FEE2E2",
                    color: syncStatus === "synced" ? "#3B6E2E" : "#9B1C1C",
                  }}
                >
                  {syncStatus === "synced" ? "SYNCED" : "LOCAL"}
                </span>
              </div>
              <p style={{ color: "#8A8266", margin: "4px 0 0", fontSize: 11, lineHeight: 1.4 }}>
                {records.length} members stored in <code style={{ background: "#EFEAD9", padding: "1px 3px" }}>localStorage</code>.
              </p>
            </div>
          </div>
        </aside>

        {/* Main Workspace Area */}
        <main>
          {error && (
            <div
              style={{
                background: "#FEF2F2",
                borderBottom: "1px solid #F8B4B4",
                padding: "10px 20px",
                fontSize: 13,
                color: "#9B1C1C",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <AlertCircle size={16} />
              <span>{error} Operating in LocalStorage offline mode.</span>
            </div>
          )}

          {activeTab === "dashboard" && (
            <DashboardPage
              records={records}
              syncStatus={syncStatus}
              lastSynced={lastSynced}
              onDeleteRecord={deleteRecord}
              onNavigateAdd={() => setActiveTab("admission")}
              onSyncServer={syncWithServer}
            />
          )}

          {activeTab === "admission" && (
            <div style={{ padding: "20px 16px" }}>
              <AdmissionForm
                onAddRecord={async (formData) => {
                  const res = await addRecord(formData);
                  return res;
                }}
                onCancel={() => setActiveTab("dashboard")}
              />
            </div>
          )}

          {activeTab === "storage" && (
            <LocalStorageManager
              records={records}
              syncStatus={syncStatus}
              lastSynced={lastSynced}
              onSync={syncWithServer}
              onClear={clearLocalStorage}
            />
          )}
        </main>
      </div>
    </div>
  );
}