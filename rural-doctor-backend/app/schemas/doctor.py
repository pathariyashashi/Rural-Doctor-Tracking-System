from pydantic import BaseModel


# ---------------- Doctor Status Update ----------------
class DoctorStatusUpdate(BaseModel):
    status: str
    current_area: str


# ---------------- Doctor Profile Update ----------------
class DoctorProfileUpdate(BaseModel):
    specialization: str
    experience: str
    village: str
    phone: str
    email: str
    status: str


# ---------------- Doctor Profile Response ----------------
class DoctorProfileResponse(BaseModel):
    id: int
    specialization: str
    experience: str
    village: str
    phone: str
    email: str
    status: str
    photo: str | None = ""

    class Config:
        from_attributes = True