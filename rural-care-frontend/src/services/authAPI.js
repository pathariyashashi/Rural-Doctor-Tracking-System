import api from "./api";

// Login
export const loginUser = (data) =>
  api.post("/auth/login", data);

// Common Register API (Backend uses role field)
export const registerUser = (data) =>
  api.post("/auth/register", data);