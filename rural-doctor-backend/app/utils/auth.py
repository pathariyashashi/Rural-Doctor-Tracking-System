from datetime import datetime, timedelta
from jose import jwt
from passlib.context import CryptContext

# Password Hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = "rural_doctor_secret_key_2026"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # 1 Day

# Hash Password
def hash_password(password: str):
    return pwd_context.hash(password)

# Verify Password
def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)

# JWT Token
def create_access_token(data: dict):
    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode.update({"exp": expire})

    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)