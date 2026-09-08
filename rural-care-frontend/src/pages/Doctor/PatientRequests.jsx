import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";
import RequestTable from "../../components/tables/RequestTable";
import "./Dashboard.css";

export default function PatientRequests() {
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        <Navbar />

        <section className="hero">
          <div>
            <h1>📍 Patient Requests</h1>
            <p>Accept or reject home visit requests and access patient live location.</p>
          </div>
        </section>

        <RequestTable />
      </main>
    </div>
  );
}