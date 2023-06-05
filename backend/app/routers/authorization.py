import datetime

from fastapi import (
    APIRouter,
    Depends,
    Body,
    Cookie,
    Response,
    Request
)
import jwt
import logging

from ..auth import secure, is_superuser, auth, decode_token
from ..schemas import ErrorResponse, OKResponse, ErrorCode
from ..schemas import UserLoginSchema
from .. import db

router = APIRouter(
    prefix='/auth'
)


@router.post('/login', tags=['auth'], response_model=OKResponse | ErrorResponse)
async def login(response: Response, user: UserLoginSchema = Body()):
    user_id = await db.get_user_id(user)
    if user_id is None:
        return ErrorResponse(message="Invalid user login and/or password", error_code=ErrorCode.NOT_FOUND)

    token = secure({'user_id': user_id, 'exp': datetime.datetime.now() + datetime.timedelta(days=1)})
    response.set_cookie(key="access_token", value=token)
    return OKResponse(message="Authorization completed successfully")


@router.delete('/logout', tags=['auth'], response_model=OKResponse | ErrorResponse)
def logout(response: Response):
    response.delete_cookie(key='access_token')
    return OKResponse(message="Logout successful")


@router.post('/create_user', tags=['auth'], response_model=OKResponse | ErrorResponse,
             dependencies=[Depends(is_superuser)])
async def create_user(response: Response, user: UserLoginSchema = Body()):
    await db.create_user(user)
    user_id = await db.get_user_id(user)
    token = secure({'user_id': user_id, 'exp': datetime.datetime.now() + datetime.timedelta(days=1)})
    response.set_cookie(key="access_token", value=token)
    return OKResponse(message="User created successfully")


@router.get('/is_auth', tags=['auth'], response_model=OKResponse | ErrorResponse, dependencies=[Depends(auth)])
async def is_auth(req: Request):
    return OKResponse()


@router.post('/resecure', tags=['auth'], response_model=OKResponse | ErrorResponse, dependencies=[Depends(auth)])
async def resecure(req: Request, response: Response):
    access_token = req.cookies.get("access_token")
    payload = decode_token(access_token)
    user_id = payload.get("user_id")
    token = secure({'user_id': user_id, 'exp': datetime.datetime.now() + datetime.timedelta(days=1)})
    response.set_cookie(key="access_token", value=token)
    return OKResponse(message="Token resecured successfully")
    
