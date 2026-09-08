from pydantic import BaseModel
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi import UploadFile, File
import os
from app.database import get_db
from app.models.doctor import Doctor
from app.schemas.doctor import DoctorStatusUpdate,DoctorProfileUpdate
from app.models.visit import Visit
from app.models.patient import Patient
from app.models.user import User 
from app.models.prediction import Prediction
 



UPLOAD_FOLDER = "uploads/doctors"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

router = APIRouter(
    prefix="/doctor",
    tags=["Doctor"]
)

class DoctorLocationUpdate(BaseModel):
    latitude: float
    longitude: float

@router.put("/status/{doctor_id}")
def update_doctor_status(
    doctor_id: int,
    data: DoctorStatusUpdate,
    db: Session = Depends(get_db)
):
    doctor = (
        db.query(Doctor)
        .filter(Doctor.id == doctor_id)
        .first()
    )

    if not doctor:
        raise HTTPException(
            status_code=404,
            detail="Doctor not found"
        )

    doctor.status = data.status
    doctor.current_area = data.current_area

    db.commit()
    db.refresh(doctor)

    return {
        "message": "Doctor status updated",
        "doctor_id": doctor.id,
        "status": doctor.status,
        "current_area": doctor.current_area
    }


@router.get("/{doctor_id}")
def get_doctor(
    doctor_id: int,
    db: Session = Depends(get_db)
):
    doctor = (
        db.query(Doctor)
        .filter(Doctor.id == doctor_id)
        .first()
    )

    if not doctor:
        raise HTTPException(
            status_code=404,
            detail="Doctor not found"
        )

    return {
    "doctor_id": doctor.id,
    "status": doctor.status,
    "current_area": doctor.current_area,
    "latitude": doctor.latitude,
    "longitude": doctor.longitude,
}
    
    
@router.get("/requests/{doctor_id}")
def get_doctor_requests(
    doctor_id: int,
    db: Session = Depends(get_db)
):
    requests = (
        db.query(Visit, Patient, User)
        .join(Patient, Visit.patient_id == Patient.id)
        .join(User, Patient.user_id == User.id)
        .filter(Visit.doctor_id == doctor_id)
        .order_by(Visit.requested_at.desc())
        .all()
    )

    response = []

    for visit, patient, user in requests:
        response.append({
            "visit_id": visit.id,
            "patient_id": visit.patient_id,

            "patient_name": user.name,
            "patient_phone": user.phone,

            "village": visit.area,
            "area": visit.area,
            "address": visit.address,

            "disease": visit.problem,
            "problem": visit.problem,

            "status": visit.status.capitalize(),

            #  Patient GPS Location
            "latitude": visit.latitude,
            "longitude": visit.longitude,

            "requested_at": visit.requested_at,
        })

    return response
    
@router.put("/request/{visit_id}/{action}")
def update_visit_request(
    visit_id: int,
    action: str,
    db: Session = Depends(get_db)
):
    visit = (
        db.query(Visit)
        .filter(Visit.id == visit_id)
        .first()
    )

    if not visit:
        raise HTTPException(
            status_code=404,
            detail="Visit request not found"
        )

    if action not in ["accept", "reject"]:
        raise HTTPException(
            status_code=400,
            detail="Action must be accept or reject"
        )

    if action == "accept":
        visit.status = "accepted"
    else:
        visit.status = "rejected"

    db.commit()
    db.refresh(visit)

    return {
    "message": f"Visit request {action}ed successfully",
    "visit_id": visit.id,
    "status": visit.status.capitalize()
}     
    
@router.delete("/request/{visit_id}")
def delete_visit_request(
    visit_id: int,
    db: Session = Depends(get_db)
):
    visit = db.query(Visit).filter(Visit.id == visit_id).first()

    if not visit:
        raise HTTPException(status_code=404, detail="Request not found")

    db.delete(visit)
    db.commit()

    return {
        "message": "Request deleted successfully",
        "visit_id": visit_id
    }    
    
@router.put("/location/{doctor_id}")
def update_doctor_location(
    doctor_id: int,
    data: DoctorLocationUpdate,
    db: Session = Depends(get_db)
):
    doctor = (
        db.query(Doctor)
        .filter(Doctor.id == doctor_id)
        .first()
    )

    if not doctor:
        raise HTTPException(
            status_code=404,
            detail="Doctor not found"
        )

    doctor.latitude = data.latitude
    doctor.longitude = data.longitude

    db.commit()
    db.refresh(doctor)

    return {
        "message": "Doctor location updated",
        "doctor_id": doctor.id,
        "latitude": doctor.latitude,
        "longitude": doctor.longitude
    }    
    
# Get Doctor Profile
@router.get("/profile/{doctor_id}")
def get_profile(doctor_id: int):
    return {
        "name": "Dr. Rajesh Kumar",
        "phone": "+91 9876543210",
        "email": "rajesh@gmail.com",
        "specialization": "MBBS",
        "village": "Rampur PHC",
        "experience": "10 Years",
        "status": "Available"
    }

# Update Doctor Profile
@router.put("/profile/{doctor_id}")
def update_profile(doctor_id: int, profile: dict):
    return {
        "message": "Profile Updated Successfully",
        "data": profile
    }    
# ===========================
# AI Disease Prediction API
# ===========================

class PredictionRequest(BaseModel):
    age: int
    temperature: float
    oxygen: float
    bp: float
    symptoms: str


# Temporary History Storage
prediction_history = []


@router.post("/ai/predict")
def predict_disease(
    data: PredictionRequest,
    db: Session = Depends(get_db)
):
    symptoms = data.symptoms.lower()

    disease = "Healthy"
    risk = "Low"
    confidence = 98
    recommendation = "You appear healthy."

    if "fever" in symptoms and "body pain" in symptoms:
        disease = "Dengue"
        risk = "High"
        confidence = 94
        recommendation = "Visit nearest PHC immediately."

    elif "fever" in symptoms and "cough" in symptoms:
        disease = "Viral Fever"
        risk = "Medium"
        confidence = 88
        recommendation = "Take rest and drink fluids."

    elif "cold" in symptoms or "sneezing" in symptoms:
        disease = "Common Cold"
        risk = "Low"
        confidence = 84
        recommendation = "Take warm fluids."

    # ✅ Save Prediction in PostgreSQL
    prediction = Prediction(
        age=data.age,
        temperature=data.temperature,
        oxygen=data.oxygen,
        bp=data.bp,
        symptoms=data.symptoms,
        disease=disease,
        risk=risk,
        confidence=confidence,
    )

    db.add(prediction)
    db.commit()
    db.refresh(prediction)

    return {
        "id": prediction.id,
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
            "Drink plenty of water.",
            "Take complete bed rest.",
            "Avoid self-medication."
        ]
    }


@router.get("/ai/history")
def get_prediction_history(db: Session = Depends(get_db)):
    predictions = (
        db.query(Prediction)
        .order_by(Prediction.id.desc())
        .all()
    )

    return [
        {
            "id": p.id,
            "age": p.age,
            "symptoms": p.symptoms,
            "disease": p.disease,
            "risk": p.risk,
            "confidence": p.confidence,
        }
        for p in predictions
    ]   
    

# ---------------- UPDATE PROFILE ----------------

@router.put("/profile/{doctor_id}")
def update_doctor_profile(
    doctor_id: int,
    profile: DoctorProfileUpdate,
    db: Session = Depends(get_db)
):
    doctor = db.query(Doctor).filter(Doctor.id == doctor_id).first()

    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")

    doctor.specialization = profile.specialization
    doctor.experience = profile.experience
    doctor.village = profile.village
    doctor.phone = profile.phone
    doctor.email = profile.email
    doctor.status = profile.status

    db.commit()
    db.refresh(doctor)

    return {
        "message": "Profile Updated Successfully",
        "doctor": doctor
    }


# ---------------- PHOTO UPLOAD ----------------

@router.post("/profile/photo/{doctor_id}")
async def upload_photo(
    doctor_id: int,
    photo: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    doctor = db.query(Doctor).filter(Doctor.id == doctor_id).first()

    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")

    filename = f"doctor_{doctor_id}.jpg"
    filepath = os.path.join(UPLOAD_FOLDER, filename)

    with open(filepath, "wb") as buffer:
        buffer.write(await photo.read())

    doctor.photo = f"/uploads/doctors/{filename}"

    db.commit()

    return {
        "message": "Photo Uploaded",
        "photo": doctor.photo
    }    
    
    