from app.models.prediction import Prediction

def predict_disease(data, db):
    symptoms = data.symptoms.lower()

    disease = "Viral Fever"
    risk = "Low"
    recommendation = "Take rest and drink water."

    if data.temperature >= 102:
        disease = "High Fever / Infection"
        risk = "High"
        recommendation = "Visit doctor immediately."

    elif data.oxygen <= 92:
        disease = "Respiratory Infection"
        risk = "Critical"
        recommendation = "Immediate medical attention required."

    elif "body pain" in symptoms and "fever" in symptoms:
        disease = "Dengue Suspected"
        risk = "High"
        recommendation = "CBC and Platelet test recommended."

    elif "chills" in symptoms and "fever" in symptoms:
        disease = "Malaria Suspected"
        risk = "High"
        recommendation = "Blood smear test recommended."

    prediction = Prediction(
        age=data.age,
        temperature=data.temperature,
        oxygen=data.oxygen,
        bp=data.bp,
        symptoms=data.symptoms,
        disease=disease,
        risk=risk,
        recommendation=recommendation,
    )

    db.add(prediction)
    db.commit()

    return {
        "disease": disease,
        "risk": risk,
        "recommendation": recommendation,
    }