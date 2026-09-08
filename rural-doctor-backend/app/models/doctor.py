from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship

from app.database import Base


class Doctor(Base):
    __tablename__ = "doctors"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"), unique=True)

    specialization = Column(String, default="MBBS")
    experience = Column(String, default="0 Years")
    village = Column(String, default="")
    phone = Column(String, default="")
    email = Column(String, default="")
    status = Column(String, default="Available")

    photo = Column(String, default="")

    latitude = Column(Float, default=0.0)
    longitude = Column(Float, default=0.0)

    current_area = Column(String, default="")

    user = relationship("User")