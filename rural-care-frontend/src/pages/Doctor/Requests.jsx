import "./Requests.css";
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function Requests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    api.get("/doctor/requests/1")
      .then((res) => setRequests(res.data))
      .catch(() => setRequests([]));
  }, []);

  return (
    <div className="request-page">
      <h2>Patient Requests</h2>

      <table>
        <thead>
          <tr>
            <th>Patient</th>
            <th>Disease</th>
            <th>Village</th>
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
                <button className="accept">Accept</button>
                <button className="reject">Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}