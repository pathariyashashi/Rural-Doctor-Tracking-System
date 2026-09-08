from fastapi import FastAPI
from sqlalchemy import text

from app.database import engine, Base
from app.models import User, Doctor, Patient, Visit
from app.routes.auth import router as auth_router
from app.routes.doctor import router as doctor_router
from app.routes.patient import router as patient_router
from fastapi.middleware.cors import CORSMiddleware
from app.routes.ai_prediction import router as ai_router
from app.models.prediction import Prediction
from fastapi.staticfiles import StaticFiles



app = FastAPI(
    title="Rural Doctor Home Visit API",
    description="Backend API for rural doctor home visit management",
    version="1.0.0"
)

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://rural-doctor.vercel.app",
    ],
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)
app.include_router(auth_router)
app.include_router(doctor_router)
app.include_router(patient_router)
app.include_router(ai_router)
@app.get("/")
def root():
    return {
        "message": "Rural Doctor API is running"
    }


@app.get("/health")
def health_check():
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))

        return {
            "status": "healthy",
            "database": "connected"
        }

    except Exception as e:
        return {
            "status": "unhealthy",
            "database": "disconnected",
            "error": str(e)
        }
