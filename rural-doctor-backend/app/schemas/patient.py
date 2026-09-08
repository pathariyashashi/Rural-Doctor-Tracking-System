from pydantic import BaseModel


class VisitRequest(BaseModel):
    area: str
    address: str
    problem: str

    latitude: float
    longitude: float