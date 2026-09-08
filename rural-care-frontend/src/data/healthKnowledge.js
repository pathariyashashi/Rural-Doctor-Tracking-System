// ===============================
// Rural Doctor Care - Health Knowledge Data
// ===============================


const dengue =
  "https://images.openai.com/static-rsc-4/AKQrOfMUsAKhVMQsOjd0Xx4H4Q.png";

const malaria =
  "https://images.openai.com/static-rsc-4/pMrcbQK1mMZkm2SMVk5Naaok.png";

const viral =
  "https://images.openai.com/static-rsc-4/2MCKJwr0vVrc0mPibq5I9J2Vzg.png";

const bp =
  "https://images.openai.com/static-rsc-4/TvZP6NIXpTxFSZgkTQdsCw5w.png";

const diabetes =
  "https://images.openai.com/static-rsc-4/4bA5JqG0T4y7nYQ2L2R5Gk0.png";

const cough =
  "https://images.openai.com/static-rsc-4/oM5Q7V2d9bJk4mL1eR8tHn3.png";

const typhoid =
  "https://images.openai.com/static-rsc-4/6TjYp9L3sV8nK2xQ4aF1Wm5.png";

const pregnancy =
  "https://images.openai.com/static-rsc-4/g7NwP4Qh2LxV9JcM5bT8Rk1.png";

const dehydration =
  "https://images.openai.com/static-rsc-4/k2QvH8Lm5RjP1XnC7dS4Tz9.png";

const snakebite =
  "https://images.openai.com/static-rsc-4/m8RkJ3Qp6TvN1XcL5dH2Wz7.png";
const healthKnowledge = [
  {
    id: 1,
    category: "बरसात की बीमारी",
    title: "डेंगू (Dengue)",
    image: dengue,
    emoji: "🦟",
    symptoms: [
      "तेज बुखार",
      "सिर दर्द",
      "बदन दर्द",
      "आँखों के पीछे दर्द",
      "प्लेटलेट कम होना"
    ],
    prevention: [
      "मच्छरदानी का उपयोग करें",
      "घर के आसपास पानी जमा न होने दें",
      "पूरी बाँह के कपड़े पहनें",
      "कूलर और टंकी साफ रखें"
    ],
    emergency:
      "खून आना, लगातार उल्टी या तेज कमजोरी होने पर तुरंत अस्पताल जाएँ।"
  },

  {
    id: 2,
    category: "बरसात की बीमारी",
    title: "मलेरिया (Malaria)",
    image: malaria,
    emoji: "🦟",
    symptoms: [
      "ठंड लगना",
      "बार-बार बुखार",
      "पसीना आना",
      "कमजोरी"
    ],
    prevention: [
      "मच्छरदानी लगाएँ",
      "साफ पानी रखें",
      "घर के आसपास पानी जमा न होने दें"
    ],
    emergency: "बार-बार तेज बुखार आए तो तुरंत जांच करवाएँ।"
  },

  {
    id: 3,
    category: "बुखार",
    title: "वायरल फीवर",
    image: viral,
    emoji: "🤒",
    symptoms: [
      "बुखार",
      "कमजोरी",
      "शरीर दर्द",
      "गले में दर्द"
    ],
    prevention: [
      "आराम करें",
      "गर्म पानी पिएँ",
      "हल्का भोजन करें"
    ],
    emergency: "3 दिन से ज्यादा बुखार रहे तो डॉक्टर से मिलें।"
  },

  {
    id: 4,
    category: "दिल और BP",
    title: "हाई ब्लड प्रेशर",
    image: bp,
    emoji: "❤️",
    symptoms: [
      "सिर दर्द",
      "चक्कर",
      "धुंधला दिखना",
      "नाक से खून आना"
    ],
    prevention: [
      "कम नमक खाएँ",
      "रोज BP चेक करें",
      "तनाव कम रखें"
    ],
    emergency: "सीने में दर्द या सांस फूलने पर तुरंत अस्पताल जाएँ।"
  },

  {
    id: 5,
    category: "शुगर",
    title: "डायबिटीज (Diabetes)",
    image: diabetes,
    emoji: "🍬",
    symptoms: [
      "बार-बार प्यास लगना",
      "बार-बार पेशाब",
      "थकान",
      "वजन कम होना"
    ],
    prevention: [
      "मीठा कम खाएँ",
      "रोज पैदल चलें",
      "शुगर की जांच करवाएँ"
    ],
    emergency: "शुगर बहुत बढ़ जाए या बेहोशी आए तो अस्पताल जाएँ।"
  },

  {
    id: 6,
    category: "सर्दी-जुकाम",
    title: "खाँसी और जुकाम",
    image: cough,
    emoji: "😷",
    symptoms: [
      "नाक बहना",
      "छींक",
      "गले में दर्द",
      "हल्का बुखार"
    ],
    prevention: [
      "हाथ धोएँ",
      "गर्म पानी पिएँ",
      "भीड़ से बचें"
    ],
    emergency: "सांस लेने में दिक्कत हो तो तुरंत डॉक्टर से मिलें।"
  },

  {
    id: 7,
    category: "पेट की बीमारी",
    title: "टाइफाइड (Typhoid)",
    image: typhoid,
    emoji: "🤢",
    symptoms: [
      "लगातार बुखार",
      "पेट दर्द",
      "कमजोरी",
      "भूख कम लगना"
    ],
    prevention: [
      "उबला पानी पिएँ",
      "साफ भोजन करें",
      "हाथ धोकर खाना खाएँ"
    ],
    emergency: "लगातार तेज बुखार हो तो जांच करवाएँ।"
  },

  {
    id: 8,
    category: "महिला स्वास्थ्य",
    title: "गर्भावस्था देखभाल",
    image: pregnancy,
    emoji: "🤰",
    symptoms: [
      "नियमित जांच जरूरी",
      "आयरन की गोली लें",
      "टीकाकरण करवाएँ"
    ],
    prevention: [
      "हरी सब्जियाँ खाएँ",
      "दूध और फल लें",
      "समय पर ANC जांच करवाएँ"
    ],
    emergency: "खून आना या पेट में तेज दर्द हो तो तुरंत अस्पताल जाएँ।"
  },

  {
    id: 9,
    category: "गर्मी की बीमारी",
    title: "डिहाइड्रेशन (Dehydration)",
    image: dehydration,
    emoji: "🥵",
    symptoms: [
      "मुंह सूखना",
      "चक्कर आना",
      "कम पेशाब आना"
    ],
    prevention: [
      "ORS पिएँ",
      "नारियल पानी पिएँ",
      "धूप से बचें"
    ],
    emergency: "बेहोशी या ज्यादा कमजोरी हो तो अस्पताल जाएँ।"
  },

  {
    id: 10,
    category: "आपातकालीन",
    title: "साँप काटने पर क्या करें?",
    image: snakebite,
    emoji: "🐍",
    symptoms: [
      "काटने की जगह दर्द",
      "सूजन",
      "चक्कर",
      "सांस लेने में परेशानी"
    ],
    prevention: [
      "घबराएँ नहीं",
      "जहर चूसने की कोशिश न करें",
      "मरीज को शांत रखें"
    ],
    emergency: "तुरंत नजदीकी PHC या अस्पताल जाएँ।"
  }
];

export default healthKnowledge;