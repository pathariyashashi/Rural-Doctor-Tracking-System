import api from "./api";

// LOGIN
export const loginUser = (data) =>
  api.post("/auth/login", data);

// PATIENT REGISTER
export const registerPatient = (data) =>
  api.post("/auth/register/patient", data);

// DOCTOR REGISTER
export const registerDoctor = (data) =>
  api.post("/auth/register/doctor", data);