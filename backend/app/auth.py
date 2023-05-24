import jwt

from config import JWT_SECRET, JWT_ALGORITHM, JWT_SUPERUSER_TOKEN
from fastapi import HTTPException, Request


def secure(token):
    encoded_token = jwt.encode(token, JWT_SECRET, JWT_ALGORITHM)
    return encoded_token


def auth(req: Request):
    if "login" not in req.headers or "password" not in req.headers:
        raise HTTPException(status_code=403, detail="Login and/or password data was not sent")
    login_and_password = {
        "login": req.headers.get("login"), 
        "password": req.headers.get("password")
    }
    if secure(login_and_password) != JWT_SUPERUSER_TOKEN:
        raise HTTPException(status_code=403, detail="Submitted data does not match SuperUser authorization")
