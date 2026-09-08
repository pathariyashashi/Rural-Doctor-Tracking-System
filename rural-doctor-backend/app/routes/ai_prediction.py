from pydantic import BaseModel
from fastapi import APIRouter

router = APIRouter(prefix="/ai", tags=["AI Prediction"])

class PredictionRequest(BaseModel):
    age: int
    temperature: float
    oxygen: float
    bp: float
    symptoms: str


@router.post("/predict")
def predict_disease(data: PredictionRequest):
    symptoms = data.symptoms.lower()

    disease = "Healthy"
    risk = "Low"
    confidence = 98
    recommendation = "You appear healthy. Maintain a balanced diet and stay hydrated."

    if "fever" in symptoms and "body pain" in symptoms:
        disease = "Dengue"
        risk = "High"
        confidence = 94
        recommendation = "Visit the nearest Primary Health Centre immediately."

    elif "cough" in symptoms and "fever" in symptoms:
        disease = "Viral Fever"
        risk = "Medium"
        confidence = 88
        recommendation = "Take rest, drink fluids, and consult a doctor if fever persists."

    elif "cold" in symptoms or "sneezing" in symptoms:
        disease = "Common Cold"
        risk = "Low"
        confidence = 84
        recommendation = "Take rest and drink warm fluids."
    
    prediction_history.append({
    "age": data.age,
    "symptoms": data.symptoms,
    "disease": disease,
    "risk": risk,
    "confidence": confidence
})
    return {
    "disease": disease,
    "risk": risk,
    "confidence": confidence,
    "recommendation": recommendation,

    "medicines": [
        "Paracetamol 650mg",
        "ORS Solution",
        "Vitamin C Tablet"
    ],

    "precautions": [
        "Drink 3-4 litres of water daily.",
        "Take complete bed rest.",
        "Eat light and nutritious food.",
        "Visit PHC immediately if fever increases."
    ]
}
prediction_history = []

@router.get("/history")
def get_prediction_history():
    return prediction_history    