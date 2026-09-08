import "./HealthKnowledge.css";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import healthKnowledge from "../../data/healthKnowledge";

import {
  Search,
  Moon,
  Sun,
  AlertTriangle,
  HeartPulse,
  Apple,
  Baby,
  Pill,
  ShieldAlert,
  Droplets,
  Phone,
  MapPin,
  BookOpen,
  Activity,
} from "lucide-react";

export default function HealthKnowledge() {
  const { dark, setDark } = useTheme();
  const [search, setSearch] = useState("");

  const filteredDiseases = healthKnowledge.filter((item) => {
    const text = search.toLowerCase();
    return (
      item.title.toLowerCase().includes(text) ||
      item.category.toLowerCase().includes(text)
    );
  });

  return (
    <div className={dark ? "knowledge-page dark" : "knowledge-page"}>
      {/* ================= HEADER ================= */}

      <div className="knowledge-header">
        <div>
          <h2>🏥 Health Knowledge Center</h2>
          <p>गाँव के लोगों के लिए आसान भाषा में स्वास्थ्य जानकारी</p>
        </div>

        <button className="theme-btn" onClick={() => setDark(!dark)}>
          {dark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* ================= HERO ================= */}

      <section className="hero-banner">
        <div className="hero-content">
          <span className="hero-badge">Rural Doctor Care</span>

          <h1>स्वस्थ गाँव • सुरक्षित परिवार</h1>

          <p>
            बीमारी पहचानें, बचाव जानें, सही खाना खाएँ और समय पर डॉक्टर से मिलें।
          </p>

          <button className="hero-btn">
            <BookOpen size={18} />
            स्वास्थ्य सीखें
          </button>
        </div>

        <div className="hero-icon">
          <HeartPulse size={120} />
        </div>
      </section>

      {/* ================= SEARCH ================= */}

      <div className="search-box">
        <Search size={20} />

        <input
          type="text"
          placeholder="डेंगू, बुखार, BP, शुगर खोजें..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* ================= CATEGORY ================= */}

      <section>
        <h3 className="section-title">📚 स्वास्थ्य श्रेणियाँ</h3>

        <div className="category-grid">
          {[
            ["🤒", "बुखार"],
            ["🦟", "बरसात की बीमारी"],
            ["😷", "सर्दी-जुकाम"],
            ["❤️", "दिल और BP"],
            ["🍬", "डायबिटीज"],
            ["👶", "महिला एवं बच्चे"],
            ["🥗", "पौष्टिक भोजन"],
            ["💊", "दवाइयाँ"],
          ].map((cat, index) => (
            <div className="category-card" key={index}>
              <span>{cat[0]}</span>
              <h4>{cat[1]}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* ================= EMERGENCY ================= */}

      <section>
        <h3 className="section-title">
          <AlertTriangle color="#DC2626" />
          आपातकालीन प्राथमिक उपचार
        </h3>

        <div className="emergency-grid">
          <div className="emergency-card red">
            <h4>🐍 साँप काटने पर</h4>

            <ul>
              <li>घबराएँ नहीं।</li>
              <li>मरीज को शांत रखें।</li>
              <li>जहर चूसने की कोशिश न करें।</li>
              <li>तुरंत PHC या अस्पताल जाएँ।</li>
            </ul>
          </div>

          <div className="emergency-card orange">
            <h4>🔥 जलने पर</h4>

            <ul>
              <li>15 मिनट ठंडे पानी से धोएँ।</li>
              <li>टूथपेस्ट या तेल न लगाएँ।</li>
              <li>साफ कपड़े से ढकें।</li>
            </ul>
          </div>

          <div className="emergency-card blue">
            <h4>🩸 खून बहने पर</h4>

            <ul>
              <li>साफ कपड़े से दबाएँ।</li>
              <li>घाव ऊपर रखें।</li>
              <li>ज्यादा खून बहे तो अस्पताल जाएँ।</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= DISEASES ================= */}

      <section>
        <h3 className="section-title">
          <Activity color="#2563EB" />
          आम बीमारियाँ
        </h3>

        <div className="disease-grid">
          {filteredDiseases.map((item) => (
            <div className="disease-card" key={item.id}>
              <img
                src={item.image}
                alt={item.title}
                className="disease-image"
              />

              <div className="disease-body">
                <span className="disease-category">{item.category}</span>

                <h3>
                  {item.emoji} {item.title}
                </h3>

                <div className="disease-section">
                  <h4>लक्षण</h4>

                  <ul>
                    {item.symptoms.map((symptom, index) => (
                      <li key={index}>{symptom}</li>
                    ))}
                  </ul>
                </div>

                <div className="disease-section">
                  <h4>बचाव</h4>

                  <ul>
                    {item.prevention.map((pre, index) => (
                      <li key={index}>{pre}</li>
                    ))}
                  </ul>
                </div>

                <div className="warning-box">
                  <ShieldAlert size={18} />

                  <p>{item.emergency}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= NUTRITION ================= */}

      <section>
        <h3 className="section-title">
          <Apple color="#EA580C" />
          क्या खाएँ?
        </h3>

        <div className="nutrition-grid">
          <div className="nutrition-card">
            <Apple size={36} color="#EA580C" />

            <h4>खून की कमी</h4>

            <p>पालक • चुकंदर • गुड़ • चना</p>
          </div>

          <div className="nutrition-card">
            <Droplets size={36} color="#2563EB" />

            <h4>बुखार में</h4>

            <p>ORS • नारियल पानी • खिचड़ी</p>
          </div>

          <div className="nutrition-card">
            <HeartPulse size={36} color="#DC2626" />

            <h4>कमजोरी</h4>

            <p>दूध • दाल • अंडा • मूंगफली</p>
          </div>

          <div className="nutrition-card">
            <Apple size={36} color="#EA580C" />

            <h4>बच्चों की ताकत</h4>

            <p>केला • दूध • फल • दाल</p>
          </div>
        </div>
      </section>

      {/* ================= WOMEN ================= */}

      <section>
        <h3 className="section-title">
          <Baby color="#2563EB" />
          महिला एवं बच्चों की देखभाल
        </h3>

        <div className="women-card">
          <div className="info-box">
            <Baby size={34} color="#2563EB" />

            <div>
              <h4>गर्भावस्था</h4>

              <p>
                समय पर जांच, आयरन गोली, TT टीका और पौष्टिक भोजन जरूर लें।
              </p>
            </div>
          </div>

          <div className="info-box">
            <Pill size={34} color="#EA580C" />

            <div>
              <h4>टीकाकरण</h4>

              <p>
                BCG, Polio, DPT, Hepatitis B, Measles समय पर लगवाएँ।
              </p>
            </div>
          </div>

          <div className="info-box">
            <HeartPulse size={34} color="#DC2626" />

            <div>
              <h4>नवजात शिशु</h4>

              <p>
                जन्म के बाद 6 महीने तक केवल माँ का दूध दें।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MEDICINE ================= */}

      <section>
        <h3 className="section-title">
          <Pill color="#2563EB" />
          सामान्य दवाइयों की जानकारी
        </h3>

        <div className="medicine-grid">
          {[
            ["💊", "Paracetamol", "बुखार और दर्द में डॉक्टर की सलाह अनुसार लें।"],
            ["🧃", "ORS", "दस्त और शरीर में पानी की कमी होने पर उपयोग करें।"],
            ["🟠", "Zinc Tablet", "दस्त के दौरान डॉक्टर की सलाह से लें।"],
            ["🩹", "First Aid", "घाव को साफ पानी से धोकर पट्टी करें।"],
          ].map((med, index) => (
            <div className="medicine-card" key={index}>
              <div className="medicine-icon">{med[0]}</div>

              <h4>{med[1]}</h4>

              <p>{med[2]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= DAILY TIPS ================= */}

      <section className="tips-card">
        <h3>📌 रोज़ के स्वास्थ्य सुझाव</h3>

        <div className="tips-grid">
          {[
            "💧 रोज़ 8–10 गिलास साफ पानी पिएँ।",
            "🧼 खाना खाने से पहले हाथ धोएँ।",
            "🦟 मच्छरदानी का उपयोग करें।",
            "🚶 रोज़ 30 मिनट पैदल चलें।",
            "🥗 मौसमी फल और हरी सब्जियाँ खाएँ।",
            "❤️ BP और शुगर की समय-समय पर जांच करवाएँ।",
          ].map((tip, index) => (
            <div className="tip-item" key={index}>
              {tip}
            </div>
          ))}
        </div>
      </section>

      {/* ================= HELP ================= */}

      <section className="help-card">
        <h3>🚑 जरूरत पड़ने पर तुरंत संपर्क करें</h3>

        <div className="help-grid">
          <div className="help-item">
            <Phone color="#2563EB" />
            <div>
              <h4>108 एम्बुलेंस</h4>
              <p>Emergency Medical Service</p>
            </div>
          </div>

          <div className="help-item">
            <MapPin color="#EA580C" />
            <div>
              <h4>नजदीकी PHC</h4>
              <p>प्राथमिक स्वास्थ्य केंद्र जाएँ।</p>
            </div>
          </div>

          <div className="help-item">
            <HeartPulse color="#DC2626" />
            <div>
              <h4>Rural Doctor Care</h4>
              <p>अपने डॉक्टर से तुरंत संपर्क करें।</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}