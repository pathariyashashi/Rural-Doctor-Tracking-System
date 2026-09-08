import "./StatCard.css";

export default function StatCard({ title, value, color }) {
  return (
    <div className="stat-card">
      <div className="top">
        <span className="dot" style={{ background: color }}></span>
        <small>{title}</small>
      </div>

      <h2>{value}</h2>
    </div>
  );
}