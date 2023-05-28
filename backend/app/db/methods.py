import psycopg2
import asyncpg
from .config_db import *

from ..schemas import UserLoginSchema

async def _create_connection():
    try:
        return await asyncpg.connect(database=POSTGRES_DB, host=POSTGRES_SERVER,
                                     user=POSTGRES_USER, password=POSTGRES_PASSWORD,
                                     port=POSTGRES_PORT)
    except (Exception, asyncpg.ConnectionFailureError) as error:
        raise error


def connect_to_db(coroutine):
    """ Decorator, connecting to db and closing connection after queries
    """

    async def wrapper(*args, **kwargs):
        conn = await _create_connection()
        result = await coroutine(conn, *args, **kwargs)
        await conn.close()
        return result

    return wrapper


@connect_to_db
async def add_user_db(conn: asyncpg.Connection, user: UserLoginSchema):
    # Add user
    try:
        await conn.execute(
            'INSERT INTO "user" (login, password) VALUES ($1, $2)', 
            user.login, user.password
        )
    except:
        pass


@connect_to_db
async def fetch_user_db(conn: asyncpg.Connection, user: UserLoginSchema):
    try:
        # Find user
        return await conn.fetch(
            'SELECT user_id, login, is_superuser FROM "user" WHERE login = $1 AND password = $2', 
            user.login, user.password,
        )
    except:
        return []


@connect_to_db
async def fetch_user_by_user_id_db(conn: asyncpg.Connection, user_id: str):
    try:
        return await conn.fetch(
            'SELECT user_id, login, is_superuser FROM "user" WHERE user_id = \'' + user_id + '\'',
        )
    except:
        return []


@connect_to_db
async def delete_user_db(conn: asyncpg.Connection, user: UserLoginSchema):
    try:
        # Delete user
        await conn.execute(
            'DELETE FROM "user" WHERE login = $1 AND password = $2', 
            user.login, user.password
        )
    except:
        pass



@connect_to_db
async def delete_user_by_user_id_db(conn: asyncpg.Connection, user_id: str):
    try:
        # Delete user
        await conn.execute(
            'DELETE FROM "user" WHERE user_id = \'' + user_id + '\'',
        )
    except:
        pass
