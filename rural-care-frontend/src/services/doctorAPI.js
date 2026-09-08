import api from "./api";


// Doctor Details
export const getDoctor = (doctorId) =>
  api.get(`/doctor/${doctorId}`);

// Patient Requests
export const getDoctorRequests = (doctorId) =>
  api.get(`/doctor/requests/${doctorId}`);

// Live Tracking (Doctor -> Patient)
export const getPatientTracking = (doctorId) =>
  api.get(`/doctor/requests/${doctorId}`);

// Accept Request
export const acceptRequest = (visitId) =>
  api.put(`/doctor/request/${visitId}/accept`);

// Reject Request
export const rejectRequest = (visitId) =>
  api.put(`/doctor/request/${visitId}/reject`);

// Doctor Status
export const updateDoctorStatus = (doctorId, status) =>
  api.put(`/doctor/status/${doctorId}`, { status });

// Doctor GPS Location
export const updateDoctorLocation = (doctorId, latitude, longitude) =>
  api.put(`/doctor/location/${doctorId}`, {
    latitude,
    longitude,
  });

// ================= Doctor Profile =================


// AI Prediction
export const predictDisease = (data) =>
  api.post("/doctor/ai/predict", data);

// Prediction History
export const getPredictionHistory = () =>
  api.get("/doctor/ai/history");

// ===== Doctor Profile APIs =====

export const getDoctorProfile = (doctorId = 1) =>
  api.get(`/doctor/profile/${doctorId}`);

export const updateDoctorProfile = (doctorId = 1, data) =>
  api.put(`/doctor/profile/${doctorId}`, data);

export const uploadDoctorPhoto = (doctorId = 1, file) => {
  const formData = new FormData();
  formData.append("photo", file);

  return api.post(`/doctor/profile/photo/${doctorId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// ================= HOME VISIT =================
export const requestHomeVisit = (patientId, doctorId, data) =>
  api.post(`/patient/request-home-visit/${patientId}/${doctorId}`, data);

// ================= DOCTOR LOCATION =================
export const getDoctorForPatient = (doctorId) =>
  api.get(`/doctor/${doctorId}`);

// ================= PATIENT DASHBOARD =================
export const getPatientDashboard = (patientId) =>
  api.get(`/patient/dashboard/${patientId}`);

// ================= LIVE TRACKING =================
export const getDoctorTracking = (doctorId) =>
  api.get(`/patient/tracking/${doctorId}`);

// Delete Patient Request
export const deleteRequest = (visitId) =>
  api.delete(`/doctor/request/${visitId}`);