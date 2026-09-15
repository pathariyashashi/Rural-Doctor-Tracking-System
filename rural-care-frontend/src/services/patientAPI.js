import api from "./api";

export const getPatientDashboard = (patientId) =>
  api.get(`/patient/dashboard/${patientId}`);

export const requestHomeVisit = (patientId, doctorId, data) =>
  api.post(`/patient/home-visit/${patientId}/${doctorId}`, data);

export const getDoctorForPatient = (doctorId) =>
  api.get(`/patient/doctor/${doctorId}`);

export const getVisitStatus = (visitId) =>
  api.get(`/patient/visit-status/${visitId}`);