from sqlalchemy import Column, Integer, String, Float
from app.database import Base

class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)
    age = Column(Integer)
    temperature = Column(Float)
    oxygen = Column(Float)
    bp = Column(Float)
    symptoms = Column(String)
    disease = Column(String)
    risk = Column(String)
    confidence = Column(Float)