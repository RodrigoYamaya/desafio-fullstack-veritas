import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(req => {
  console.log("🟡 REQUEST:", req.method?.toUpperCase(), req.url, req.data);
  return req;
});
api.interceptors.response.use(
  res => {
    console.log("🟢 RESPONSE:", res.status, res.data);
    return res;
  },
  err => {
    console.error("🔴 ERROR:", err.response?.status, err.response?.data || err.message);
    return Promise.reject(err);
  }
);

export const getTasks = async () => {
  const response = await api.get("/tasks");
  return response.data;
};

export const createTask = async (task) => {
  const response = await api.post("/tasks", task);
  return response.data;
};

export const updateTask = async (id, updatedTask) => {
  const response = await api.patch(`/tasks/${id}`, updatedTask);
  return response.data;
};

export const deleteTask = async (id) => {
  await api.delete(`/tasks/${id}`);
};

export default api;
