import { useEffect, useState } from "react";
import "./RequestTable.css";
import { Trash2 } from "lucide-react";

import {
  getDoctorRequests,
  acceptRequest,
  rejectRequest,
  deleteRequest,
} from "../../services/doctorAPI";


export default function RequestTable() {
  const [requests, setRequests] = useState([]);
  const doctorId = 1;

  // Load Requests
  const loadRequests = async () => {
    try {
      const res = await getDoctorRequests(doctorId);
      setRequests(res.data);
    } catch (error) {
      console.error("Error loading requests:", error);
      setRequests([]);
    }
  };

  // Auto Refresh Every 5 Seconds
  useEffect(() => {
    loadRequests();

    const interval = setInterval(() => {
      loadRequests();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Accept Request
  const handleAccept = async (visitId) => {
    try {
      await acceptRequest(visitId);

      setRequests((prev) =>
        prev.map((item) =>
          item.visit_id === visitId
            ? { ...item, status: "Accepted" }
            : item
        )
      );
    } catch (error) {
      console.error("Accept Error:", error);
      alert("Request accept nahi hui.");
    }
  };

  // Reject Request
  const handleReject = async (visitId) => {
    try {
      await rejectRequest(visitId);

      setRequests((prev) =>
        prev.map((item) =>
          item.visit_id === visitId
            ? { ...item, status: "Rejected" }
            : item
        )
      );
    } catch (error) {
      console.error("Reject Error:", error);
      alert("Request reject nahi hui.");
    }
  };
  const handleDelete = async (visitId) => {
  const confirmDelete = window.confirm(
    "Delete this patient request permanently?"
  );

  if (!confirmDelete) return;

  try {
    await deleteRequest(visitId);

    setRequests((prev) =>
      prev.filter((item) => item.visit_id !== visitId)
    );

    alert("Request Deleted Successfully ");
  } catch (error) {
    console.error(error);
    alert("Delete Failed ");
  }
};

  // 📍 Accept Patient Location
  const handleLocation = (item) => {
    if (!item.latitude || !item.longitude) {
      alert("Patient ne abhi location allow nahi ki hai.");
      return;
    }

    alert(
      ` Live Patient Location Enabled

Patient : ${item.patient_name}
Village : ${item.village}

Latitude : ${item.latitude}
Longitude : ${item.longitude}`
    );
  };

  return (
    <div className="request-card">
      <div className="request-header">
        <h2>Patient Requests</h2>
        <span>{requests.length} Requests</span>
      </div>

      <table>
        <thead>
          <tr>
            <th>Patient</th>
            <th>Disease</th>
            <th>Village</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((item) => (
            <tr key={item.visit_id}>
              <td>{item.patient_name}</td>
              <td>{item.disease}</td>
              <td>{item.village}</td>

              <td>
                <span className={`status ${item.status.toLowerCase()}`}>
                  {item.status}
                </span>
              </td>

              <td className="action-btns">

  {item.status !== "Accepted" && item.status !== "Rejected" && (
    <>
      <button
        className="accept"
        onClick={() => handleAccept(item.visit_id)}
      >
        Accept
      </button>

      <button
        className="reject"
        onClick={() => handleReject(item.visit_id)}
      >
        Reject
      </button>
    </>
  )}

  {item.status === "Accepted" && (
    <>
      <span className="accepted-text">Accepted</span>

      <button
        className="location-btn"
        onClick={() => handleLocation(item)}
      >
         Location
      </button>
    </>
  )}

  {item.status === "Rejected" && (
    <span className="rejected-text">Rejected</span>
  )}

  {/* 🗑 Delete button always visible */}
  <button
    className="delete-btn"
    onClick={() => handleDelete(item.visit_id)}
    title="Delete Request"
  >
    <Trash2 size={16} />
  </button>

</td>
            </tr>
          ))}

          {requests.length === 0 && (
            <tr>
              <td colSpan="5" className="empty">
                No Patient Requests Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}