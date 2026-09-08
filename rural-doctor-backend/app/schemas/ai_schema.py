from pydantic import BaseModel

class PredictionRequest(BaseModel):
    age: int
    temperature: float
    oxygen: int
    bp: int
    symptoms: str


class PredictionResponse(BaseModel):
    disease: str
    risk: str
    recommendation: str