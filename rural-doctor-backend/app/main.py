from fastapi import FastAPI
from sqlalchemy import text
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.database import engine, Base
from app.models import User, Doctor, Patient, Visit
from app.models.prediction import Prediction

from app.routes.auth import router as auth_router
from app.routes.doctor import router as doctor_router
from app.routes.patient import router as patient_router
from app.routes.ai_prediction import router as ai_router

app = FastAPI(
    title="Rural Doctor Home Visit API",
    description="Backend API for Rural Doctor Home Visit Management",
    version="1.0.0",
)

# Upload folder
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# ===================== CORS (FINAL FIX) =====================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://rural-doctor.vercel.app",  # Vercel frontend
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# ===========================================================

# Create Tables
Base.metadata.create_all(bind=engine)

# Routers
app.include_router(auth_router)
app.include_router(doctor_router)
app.include_router(patient_router)
app.include_router(ai_router)


@app.get("/")
def root():
    return {"message": "Rural Doctor API is running 🚑"}


@app.get("/health")
def health_check():
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))

        return {
            "status": "healthy",
            "database": "connected",
        }

    except Exception as e:
        return {
            "status": "unhealthy",
            "database": "disconnected",
            "error": str(e),
        }
