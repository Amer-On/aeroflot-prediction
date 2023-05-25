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

import auth
from auth import secure, is_superuser
from schemas import ErrorResponse, OKResponse
from schemas import UserLoginSchema
import db

router = APIRouter(
    prefix='/auth'
)


@router.post('/login', tags=['login'], response_model=OKResponse | ErrorResponse)
async def login(response: Response, user: UserLoginSchema = Body()):
    user_id = db.get_user_id(user)
    if user_id is None:
        return ErrorResponse(message="Invalid user login and/or password")

    token = secure({'user_id': user_id, 'exp': datetime.datetime.now() + datetime.timedelta(days=1)})
    response.set_cookie(key="access_token", value=token)
    return OKResponse(message="Authorization completed successfully")


@router.get('/logout', tags=['logout'], response_model=OKResponse | ErrorResponse)
async def logout(response: Response):
    response.delete_cookie(key='access_token')
    return OKResponse(message="Logout successful")


@router.post('/create_user', tags=['create_user'], response_model=OKResponse | ErrorResponse,
             dependencies=[Depends(is_superuser)])
async def create_user(response: Response, user: UserLoginSchema = Body()):
    user_id = 2
    response.set_cookie(key="access_token", value=secure({'user_id': user_id}))
    return OKResponse()
