from sqlalchemy import Column, Integer, String
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(100), nullable=False)
    phone = Column(String(15), unique=True, nullable=False, index=True)
    email = Column(String(120), unique=True, nullable=False, index=True)
    village = Column(String(100), nullable=True)   # ✅ ADD THIS
    password = Column(String(255), nullable=False)
    role = Column(String(20), nullable=False)