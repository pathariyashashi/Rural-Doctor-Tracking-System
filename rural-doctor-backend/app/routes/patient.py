from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime

from app.database import get_db
from app.models.doctor import Doctor
from app.models.patient import Patient
from app.models.visit import Visit
from app.models.user import User
from app.schemas.visit import VisitRequest

router = APIRouter(
    prefix="/patient",
    tags=["Patient"]
)


# ================= DOCTOR INFO FOR PATIENT =================
@router.get("/doctor/{doctor_id}")
def get_doctor_for_patient(
    doctor_id: int,
    db: Session = Depends(get_db)
):
    doctor = db.query(Doctor).filter(Doctor.id == doctor_id).first()

    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")

    return {
        "doctor_id": doctor.id,
        "status": doctor.status,
        "current_area": doctor.current_area,
        "latitude": doctor.latitude,
        "longitude": doctor.longitude,
    }


# ================= HOME VISIT REQUEST + PATIENT GPS =================
@router.post("/home-visit/{patient_id}/{doctor_id}")
def request_home_visit(
    patient_id: int,
    doctor_id: int,
    data: VisitRequest,
    db: Session = Depends(get_db)
):
    patient = db.query(Patient).filter(Patient.id == patient_id).first()

    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")

    doctor = db.query(Doctor).filter(Doctor.id == doctor_id).first()

    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")

    # Save patient request + GPS location
    visit = Visit(
        patient_id=patient.id,
        doctor_id=doctor.id,
        area=data.area,
        address=data.address,
        problem=data.problem,

        latitude=data.latitude,
        longitude=data.longitude,

        status="Pending",
        requested_at=datetime.utcnow(),
    )

    db.add(visit)
    db.commit()
    db.refresh(visit)

    return {
        "message": "Home visit request sent successfully",
        "visit_id": visit.id,
        "doctor_id": doctor.id,
        "patient_latitude": visit.latitude,
        "patient_longitude": visit.longitude,
        "status": visit.status,
    }


# ================= VISIT STATUS =================
@router.get("/visit-status/{visit_id}")
def get_visit_status(
    visit_id: int,
    db: Session = Depends(get_db)
):
    result = (
        db.query(Visit, Doctor, User)
        .join(Doctor, Visit.doctor_id == Doctor.id)
        .join(User, Doctor.user_id == User.id)
        .filter(Visit.id == visit_id)
        .first()
    )

    if not result:
        raise HTTPException(status_code=404, detail="Visit request not found")

    visit, doctor, user = result

    return {
        "visit_id": visit.id,
        "status": visit.status,

        "doctor": {
            "doctor_id": doctor.id,
            "name": user.name,
            "phone": user.phone,
            "area": doctor.current_area,
            "latitude": doctor.latitude,
            "longitude": doctor.longitude,
        },

        "patient": {
            "area": visit.area,
            "address": visit.address,
            "latitude": visit.latitude,
            "longitude": visit.longitude,
        },

        "problem": visit.problem,
    }


# ================= PATIENT DASHBOARD =================
@router.get("/dashboard/{patient_id}")
def patient_dashboard(
    patient_id: int,
    db: Session = Depends(get_db)
):
    patient = db.query(Patient).filter(Patient.id == patient_id).first()

    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")

    doctor = db.query(Doctor).first()

    visits = (
        db.query(Visit)
        .filter(Visit.patient_id == patient_id)
        .order_by(Visit.id.desc())
        .all()
    )

    return {
     "patient": {
        "id": patient.id,
        "name": patient.name,
        "age": patient.age,
        "village": patient.village,
        "phone": patient.phone,
        "gender": patient.gender,
        "blood_group": patient.blood_group,
        "weight": patient.weight,
        "height": patient.height,
    },

    "doctor": {
        "name": doctor.user.name if doctor else "Dr. Rajesh Kumar",
        "phone": doctor.phone if doctor else "9876543210",
        "status": doctor.status if doctor else "Available",
        "specialization": doctor.specialization if doctor else "MBBS",
    },

    "visits": [
        {
            "id": v.id,
            "problem": v.problem,
            "status": v.status,
            "date": str(v.requested_at.date()),
        }
        for v in visits
    ],
}