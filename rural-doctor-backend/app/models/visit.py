from datetime import datetime
from sqlalchemy import Column, Integer, String,DateTime, Text, ForeignKey, Float

from app.database import Base


class Visit(Base):
    __tablename__ = "visits"

    id = Column(Integer, primary_key=True, index=True)

    patient_id = Column(
        Integer,
        ForeignKey("patients.id"),
        nullable=False
    )

    doctor_id = Column(
        Integer,
        ForeignKey("doctors.id"),
        nullable=False
    )

    area = Column(
        String(150),
        nullable=False
    )

    address = Column(
        String(255),
        nullable=False
    )

    problem = Column(
        Text,
        nullable=False
    )

    status = Column(
        String(30),
        default="pending",
        nullable=False
    )
    
    requested_at = Column(
    DateTime,
    default=datetime.utcnow,
    nullable=False
)
    
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)