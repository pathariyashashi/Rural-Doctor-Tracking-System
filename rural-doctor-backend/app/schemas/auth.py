from pydantic import BaseModel


class RegisterRequest(BaseModel):
    name: str
    email: str
    phone: str
    village: str
    password: str
    role: str

class LoginRequest(BaseModel):
    phone: str
    password: str
    role: str