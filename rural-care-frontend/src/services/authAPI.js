import api from "./api";

export const loginUser = (data) =>
  api.post("/auth/login", data);

export const registerPatient = (data) =>
  api.post("/auth/register/patient", data);

export const registerDoctor = (data) =>
  api.post("/auth/register/doctor", data);