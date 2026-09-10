from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User
from app.models.patient import Patient
from app.models.doctor import Doctor
from app.schemas.auth import RegisterRequest, LoginRequest
from app.utils.auth import hash_password, verify_password, create_access_token

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

# ================= REGISTER =================

@router.post("/register")
def register(data: RegisterRequest, db: Session = Depends(get_db)):

    # Check Email
    existing_email = db.query(User).filter(User.email == data.email).first()
    if existing_email:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Check Phone
    existing_phone = db.query(User).filter(User.phone == data.phone).first()
    if existing_phone:
        raise HTTPException(status_code=400, detail="Phone already registered")

    # Create User
    new_user = User(
        name=data.name,
        email=data.email,
        phone=data.phone,
        village=data.village,
        role=data.role,
        password=hash_password(data.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Create Patient Profile
    if data.role == "patient":
        patient = Patient(
            user_id=new_user.id,
            name=data.name,
            age=25,
            village=data.village
        )
        db.add(patient)

    # Create Doctor Profile
    elif data.role == "doctor":
        doctor = Doctor(
            user_id=new_user.id,
            phone=data.phone,
            village=data.village,
            specialization="MBBS",
            status="Available",
            current_area=data.village
        )
        db.add(doctor)

    db.commit()

    return {
        "message": f"{data.role.capitalize()} registered successfully",
        "user": {
            "id": new_user.id,
            "name": new_user.name,
            "role": new_user.role
        }
    }


# ================= LOGIN =================

@router.post("/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):

    user = db.query(User).filter(User.phone == data.phone).first()

    if not user:
        raise HTTPException(status_code=401, detail="Phone number not registered")

    if not verify_password(data.password, user.password):
        raise HTTPException(status_code=401, detail="Incorrect password")

    if user.role != data.role:
        raise HTTPException(
            status_code=401,
            detail=f"This account is registered as {user.role}"
        )

    token = create_access_token({
        "user_id": user.id,
        "role": user.role
    })

    return {
        "access_token": token,
        "user": {
            "id": user.id,
            "name": user.name,
            "role": user.role,
            "phone": user.phone
        }
    }