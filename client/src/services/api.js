import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

export const fetchRecordsApi = async () => {
  const response = await api.get("/records");
  return response.data;
};

export const addRecordApi = async (record) => {
  const response = await api.post("/records", record);
  return response.data;
};

export const updateRecordApi = async (id, updatedFields) => {
  const response = await api.put(`/records/${id}`, updatedFields);
  return response.data;
};

export const deleteRecordApi = async (id) => {
  const response = await api.delete(`/records/${id}`);
  return response.data;
};

export const checkHealthApi = async () => {
  const response = await api.get("/health");
  return response.data;
};

export default api;
