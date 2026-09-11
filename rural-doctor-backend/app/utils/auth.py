from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta

SECRET_KEY = "RuralDoctorSecret2026"
ALGORITHM = "HS256"

# FINAL FIX
pwd_context = CryptContext(
    schemes=["bcrypt_sha256"],
    deprecated="auto"
)

def hash_password(password: str):
    return pwd_context.hash(password.strip())

def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password.strip(), hashed_password)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(days=1)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)