import api from "./api";

// Patient Dashboard
export const getDoctorForPatient = async (doctorId) => {
  return await api.get(`/patient/doctor/${doctorId}`);
};

// Home Visit
// ✅ FINAL
export const requestHomeVisit = (patientId, doctorId, data) =>
  api.post(`/patient/home-visit/${patientId}/${doctorId}`, data);

// Visit Status
export const getVisitStatus = async (visitId) => {
  return await api.get(`/patient/visit-status/${visitId}`);
};

export const getPatientDashboard = async (patientId = 1) => {
  const res = await api.get(`/patient/dashboard/${patientId}`);
  return res.data;
};