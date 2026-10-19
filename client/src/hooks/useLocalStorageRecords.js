import { useState, useEffect, useCallback } from "react";
import {
  fetchRecordsApi,
  addRecordApi,
  deleteRecordApi,
  updateRecordApi,
} from "../services/api";

const STORAGE_KEY = "back2life_gym_records";
const LAST_SYNC_KEY = "back2life_gym_last_sync";

const INITIAL_SEED_DATA = [
  {
    id: "MEM-1001",
    name: "Ismail Thacher",
    phone: "09645124005",
    email: "ismail.tk18@gmail.com",
    age: "26",
    gender: "Male",
    address: "Calicut, Kerala",
    membership: "12 Months",
    joiningDate: "2026-01-15",
    createdAt: "2026-01-15T10:00:00.000Z",
  },
  {
    id: "MEM-1002",
    name: "Bilal Ahmad",
    phone: "9876543210",
    email: "bilal@gym.com",
    age: "24",
    gender: "Male",
    address: "Kochi, Kerala",
    membership: "6 Months",
    joiningDate: "2026-02-01",
    createdAt: "2026-02-01T09:30:00.000Z",
  },
  {
    id: "MEM-1003",
    name: "Fathima VP",
    phone: "9123456780",
    email: "fathima@gym.com",
    age: "22",
    gender: "Female",
    address: "Malappuram, Kerala",
    membership: "3 Months",
    joiningDate: "2026-02-05",
    createdAt: "2026-02-05T11:15:00.000Z",
  },
];

export function useLocalStorageRecords() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncStatus, setSyncStatus] = useState("syncing"); // 'synced' | 'local_only' | 'syncing' | 'offline'
  const [lastSynced, setLastSynced] = useState(null);
  const [error, setError] = useState(null);

  // Helper to save state & localstorage simultaneously
  const updateLocal = (newRecords) => {
    setRecords(newRecords);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newRecords));
    } catch (e) {
      console.error("LocalStorage write error:", e);
    }
  };

  // Sync data with backend Node.js REST API
  const fetchAndSync = useCallback(async () => {
    setSyncStatus("syncing");
    try {
      const response = await fetchRecordsApi();
      if (response && response.success && Array.isArray(response.data)) {
        updateLocal(response.data);
        const now = new Date().toLocaleTimeString();
        setLastSynced(now);
        localStorage.setItem(LAST_SYNC_KEY, now);
        setSyncStatus("synced");
        setError(null);
      } else {
        throw new Error("Invalid response structure from server");
      }
    } catch (err) {
      console.warn("Backend API unreachable, utilizing LocalStorage fallback:", err.message);
      setError("Backend server offline. Displaying local data.");
      
      // Fallback to localstorage
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          setRecords(JSON.parse(stored));
        } catch (parseErr) {
          setRecords(INITIAL_SEED_DATA);
        }
      } else {
        // Seed initial data if first time
        updateLocal(INITIAL_SEED_DATA);
      }
      setSyncStatus("offline");
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    // Read localstorage immediately for instant UI render
    const stored = localStorage.getItem(STORAGE_KEY);
    const lastSyncTime = localStorage.getItem(LAST_SYNC_KEY);
    if (stored) {
      try {
        setRecords(JSON.parse(stored));
      } catch (e) {
        console.error("Error reading initial localStorage:", e);
      }
    }
    if (lastSyncTime) setLastSynced(lastSyncTime);

    // Fetch live from server
    fetchAndSync();
  }, [fetchAndSync]);

  // Add new record (optimistic local save + server call)
  const addRecord = async (formData) => {
    const tempId = `MEM-${Date.now().toString().slice(-6)}`;
    const newRecord = {
      id: tempId,
      ...formData,
      createdAt: new Date().toISOString(),
    };

    // 1. Save to LocalStorage & State immediately
    const updatedList = [newRecord, ...records];
    updateLocal(updatedList);

    // 2. Send to backend server
    try {
      const serverRes = await addRecordApi(formData);
      if (serverRes && serverRes.success && serverRes.data) {
        updateLocal(serverRes.data);
        setSyncStatus("synced");
        setLastSynced(new Date().toLocaleTimeString());
      }
      return { success: true, message: "Saved to LocalStorage and Synced to Server!" };
    } catch (err) {
      console.warn("Server save failed, kept in LocalStorage:", err);
      setSyncStatus("local_only");
      return {
        success: true,
        message: "Saved to LocalStorage (Server offline)",
      };
    }
  };

  // Delete record by ID
  const deleteRecord = async (id) => {
    const updatedList = records.filter((r) => r.id !== id);
    updateLocal(updatedList);

    try {
      const res = await deleteRecordApi(id);
      if (res && res.success && res.data) {
        updateLocal(res.data);
      }
      setSyncStatus("synced");
    } catch (err) {
      console.warn("Delete API call failed, removed from local storage:", err);
      setSyncStatus("local_only");
    }
  };

  // Update existing record by ID
  const updateRecord = async (id, updatedFields) => {
    const updatedList = records.map((r) => (r.id === id ? { ...r, ...updatedFields } : r));
    updateLocal(updatedList);

    try {
      await updateRecordApi(id, updatedFields);
      setSyncStatus("synced");
    } catch (err) {
      console.warn("Update API call failed, updated in local storage:", err);
      setSyncStatus("local_only");
    }
  };

  // Clear localstorage
  const clearLocalStorage = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(LAST_SYNC_KEY);
    setRecords([]);
    setSyncStatus("local_only");
  };

  return {
    records,
    loading,
    syncStatus,
    lastSynced,
    error,
    addRecord,
    deleteRecord,
    updateRecord,
    syncWithServer: fetchAndSync,
    clearLocalStorage,
  };
}
