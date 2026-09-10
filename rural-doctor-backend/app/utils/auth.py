from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta

SECRET_KEY = "RuralDoctorSecret2026"
ALGORITHM = "HS256"

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

# -------- Password Hash --------

def hash_password(password: str):
    password = password.strip()[:72]   # bcrypt max 72 bytes
    return pwd_context.hash(password)

# -------- Password Verify --------

def verify_password(plain_password: str, hashed_password: str):
    plain_password = plain_password.strip()[:72]
    return pwd_context.verify(plain_password, hashed_password)

# -------- JWT Token --------

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(days=1)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)