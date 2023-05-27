import datetime
from fastapi import HTTPException, Request, Body, Header
import jwt

from .db import methods as db_methods
from .config import JWT_SECRET, JWT_ALGORITHM, JWT_SUPERUSER_TOKEN
from . import db


def secure(payload: dict) -> str:
    token = jwt.encode(payload, JWT_SECRET, JWT_ALGORITHM)
    return token


def decode_token(token: str) -> dict:
    payload = jwt.decode(token, JWT_SECRET, JWT_ALGORITHM)
    return payload


def is_valid_token(token: str) -> bool:
    payload = decode_token(token)
    if payload['exp'] < datetime.datetime.now():
        return False

    return db.user_exists(payload['user_id'])


def auth(request: Request):
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=403, detail="Not authorized")

    if _is_superuser(token):
        return

    payload = decode_token(token)
    if payload['exp'] < datetime.datetime.now().timestamp():
        raise HTTPException(status_code=403, detail="Token expired")

    if db.user_exists(payload['user_id']):
        raise HTTPException(status_code=403, detail="Invalid token")


def is_superuser(request: Request):
    if not _is_superuser(request.cookies.get("access_token")):
        raise HTTPException(status_code=403, detail="Not superuser")


def _is_superuser(token: str) -> bool:
    payload = decode_token(token)
    user_id = payload['user_id']
    userslist = db_methods.fetch_user_by_user_id_db(user_id)
    if userslist:
        return userslist[0][2]
    else:
        return False
