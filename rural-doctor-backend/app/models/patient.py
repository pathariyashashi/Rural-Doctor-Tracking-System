from sqlalchemy import Column, Integer, String, ForeignKey

from app.database import Base
from datetime import datetime

class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        unique=True,
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
    
    