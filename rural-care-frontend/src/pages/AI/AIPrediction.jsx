import { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import {
  predictDisease,
  getPredictionHistory,
} from "../../services/doctorAPI";
import "./AIPrediction.css";

import {
  Brain,
  Activity,
  Thermometer,
  HeartPulse,
  Wind,
  AlertTriangle,
  ShieldCheck,
  Moon,
  Sun,
  Pill,
  History,
} from "lucide-react";

export default function AIPrediction() {
  const { dark, setDark } = useTheme();

  // ✅ Empty string so inputs type honge
  const [form, setForm] = useState({
    age: "",
    temperature: "",
    oxygen: "",
    bp: "",
    symptoms: "",
  });

  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // Prediction History Load
  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const res = await getPredictionHistory();
      setHistory(res.data || []);
    } catch (err) {
      console.log("History Error:", err);
      setHistory([]);
    }
  };

  // Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]:
        name === "symptoms"
          ? value
          : value === ""
          ? ""
          : Number(value),
    });
  };

  // AI Prediction
  const predict = async () => {
    if (
      form.age === "" ||
      form.temperature === "" ||
      form.oxygen === "" ||
      form.bp === "" ||
      form.symptoms.trim() === ""
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const res = await predictDisease(form);

      setResult({
        disease: res.data.disease,
        risk: res.data.risk,
        confidence: res.data.confidence,
        recommendation: res.data.recommendation,
        medicines: res.data.medicines || [],
        precautions: res.data.precautions || [],
      });

      loadHistory();
    } catch (err) {
      console.error("Prediction Error:", err);

      alert("Prediction Failed ❌");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={dark ? "ai-page dark" : "ai-page"}>

      {/* Header */}
      <div className="ai-header">
        <div>
          <h2>AI Disease Prediction</h2>
          <p>Predict diseases using patient symptoms and health details.</p>
        </div>

        <button className="theme-btn" onClick={() => setDark(!dark)}>
          {dark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div className="ai-grid">

        {/* LEFT FORM */}
        <div className="form-card">

          <div className="title-row">
            <Brain color="#2563EB" />
            <h3>Patient Health Details</h3>
          </div>

          <label>Patient Age</label>
          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            placeholder="Enter patient age"
          />

          <label>Temperature (°C)</label>
          <input
            type="number"
            step="0.1"
            name="temperature"
            value={form.temperature}
            onChange={handleChange}
            placeholder="38.5"
          />

          <label>Oxygen Level (%)</label>
          <input
            type="number"
            name="oxygen"
            value={form.oxygen}
            onChange={handleChange}
            placeholder="96"
          />

          <label>Blood Pressure</label>
          <input
            type="number"
            name="bp"
            value={form.bp}
            onChange={handleChange}
            placeholder="120"
          />

          <label>Symptoms</label>
          <textarea
            rows="5"
            name="symptoms"
            value={form.symptoms}
            onChange={handleChange}
            placeholder="Example: Fever, Body Pain, Cough, Headache"
          />

          <button className="predict-btn" onClick={predict}>
            {loading ? "Predicting..." : "Predict Disease"}
          </button>

        </div>

        {/* RIGHT RESULT */}
        <div className="result-card">

          <div className="title-row">
            <Activity color="#16A34A" />
            <h3>Prediction Result</h3>
          </div>

          {result ? (
            <>

              {/* Risk */}
              <div
                className={`risk-badge ${
                  result.risk === "High"
                    ? "high"
                    : result.risk === "Medium"
                    ? "medium"
                    : "low"
                }`}
              >
                <AlertTriangle size={18} />
                {result.risk} Risk
              </div>

              <h1>{result.disease}</h1>

              {/* Confidence */}
              <div className="confidence-box">
                <div className="confidence-header">
                  <span>AI Confidence</span>
                  <strong>{result.confidence}%</strong>
                </div>

                <div className="progress">
                  <div
                    className="progress-fill"
                    style={{ width: `${result.confidence}%` }}
                  />
                </div>
              </div>

              {/* Recommendation */}
              <div className="recommend-box">
                <ShieldCheck color="#16A34A" size={22} />

                <div>
                  <h4>Recommendation</h4>
                  <p>{result.recommendation}</p>
                </div>
              </div>

              {/* Medicines */}
              {result.medicines.length > 0 && (
                <div className="medicine-box">

                  <div className="title-row">
                    <Pill color="#EA580C" />
                    <h4>Recommended Medicines</h4>
                  </div>

                  {result.medicines.map((med, index) => (
                    <div className="medicine-item" key={index}>
                      💊 {med}
                    </div>
                  ))}
                </div>
              )}

              {/* Precautions */}
              {result.precautions.length > 0 && (
                <div className="precautions">

                  <div className="title-row">
                    <ShieldCheck color="#22C55E" />
                    <h4>Precautions</h4>
                  </div>

                  <ul>
                    {result.precautions.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          ) : (
            <div className="empty-result">
              <Brain size={70} color="#64748B" />
              <h3>No Prediction Yet</h3>
              <p>Fill patient details and click Predict Disease.</p>
            </div>
          )}

        </div>

      </div>

      {/* Prediction History */}
      <div className="history-card">

        <div className="title-row">
          <History color="#2563EB" />
          <h3>Prediction History</h3>
        </div>

        {history.length === 0 ? (
          <p>No Prediction History Found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Age</th>
                <th>Symptoms</th>
                <th>Disease</th>
                <th>Risk</th>
              </tr>
            </thead>

            <tbody>
              {history.map((item, index) => (
                <tr key={index}>
                  <td>{item.age}</td>
                  <td>{item.symptoms}</td>
                  <td>{item.disease}</td>
                  <td>
                    <span
                      className={`history-risk ${
                        item.risk === "High"
                          ? "high"
                          : item.risk === "Medium"
                          ? "medium"
                          : "low"
                      }`}
                    >
                      {item.risk}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Health Tips */}
      <div className="tips-card">

        <h3>Quick Health Tips</h3>

        <div className="tips-grid">

          <div className="tip-box">
            <Thermometer color="#EF4444" />
            <p>High fever above 39°C needs immediate medical attention.</p>
          </div>

          <div className="tip-box">
            <HeartPulse color="#2563EB" />
            <p>Normal Blood Pressure is around 120/80 mmHg.</p>
          </div>

          <div className="tip-box">
            <Wind color="#16A34A" />
            <p>Oxygen below 92% requires immediate consultation.</p>
          </div>

        </div>

      </div>

    </div>
  );
}