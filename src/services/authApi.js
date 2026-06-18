import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// LOGIN
export const loginUser = (data) => API.post("/login", data);

// FORGOT PASSWORD
export const forgotPassword = (data) => API.post("/forgot-password", data);

// RESET PASSWORD
export const resetPassword = (data) => API.post("/reset-password", data);

// CHANGE PASSWORD
export const changePassword = (data, token) =>
  API.post("/change-password", data, {
    headers: { Authorization: `Bearer ${token}` },
  });