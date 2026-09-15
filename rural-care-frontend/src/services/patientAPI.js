import api from "./api";

// ================= PATIENT DASHBOARD =================
export const getPatientDashboard = async (patientId) => {
  const res = await api.get(`/patient/dashboard/${patientId}`);
  return res.data;
};

// ================= HOME VISIT REQUEST =================
export const requestHomeVisit = (patientId, doctorId, data) =>
  api.post(`/patient/request-home-visit/${patientId}/${doctorId}`, data);

// ================= DOCTOR LIVE LOCATION =================
export const getDoctorForPatient = async (doctorId) => {
  if (!doctorId) return null; // doctorId null ho to API call hi mat karo

  const res = await api.get(`/patient/doctor-location/${doctorId}`);
  return res.data;
};

// ================= VISIT STATUS =================
export const getVisitStatus = async (visitId) => {
  const res = await api.get(`/patient/visit-status/${visitId}`);
  return res.data;
};