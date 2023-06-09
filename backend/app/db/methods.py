import asyncpg
from datetime import datetime
from .config_db import *
from .ml_schemas import *

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


@connect_to_db
async def fetch_ml_data_for_seasons_db(
    conn: asyncpg.Connection, 
    seg_class_code: str, 
    flt_num: int, 
    date_start: DateNoYear = DateNoYear(day=1, month=1),
    date_finish: DateNoYear = DateNoYear(day=31, month=12),
):
    return await conn.fetch(
            '''SELECT dat_s, pass_bk FROM "data_for_ml" 
            WHERE seg_class_code = $1 AND flt_num = $2 AND ((
            EXTRACT(MONTH FROM TO_DATE(dat_s, 'YYYY-MM-DD')) = $3 AND 
            EXTRACT(DAY FROM TO_DATE(dat_s, 'YYYY-MM-DD')) >= $5) OR (
            EXTRACT(MONTH FROM TO_DATE(dat_s, 'YYYY-MM-DD')) = $4 AND 
            EXTRACT(DAY FROM TO_DATE(dat_s, 'YYYY-MM-DD')) <= $6) OR (
            EXTRACT(MONTH FROM TO_DATE(dat_s, 'YYYY-MM-DD')) BETWEEN $7 AND $8))
            ''',
            seg_class_code, flt_num, 
            date_start.month, date_finish.month,
            date_start.day, date_finish.day,
            date_start.month + 1, date_finish.month - 1,
    )


@connect_to_db
async def fetch_ml_data_for_profile_db(
    conn: asyncpg.Connection, 
    seg_class_code: str, 
    flt_num: int, 
    date_start: DateNoYear = DateNoYear(day=1, month=1),
    date_finish: DateNoYear = DateNoYear(day=31, month=12),
):
    return await conn.fetch(
            '''SELECT dat_s, pass_bk FROM "data_for_ml" 
            WHERE seg_class_code = $1 AND flt_num = $2 AND ((
            EXTRACT(MONTH FROM TO_DATE(dat_s, 'YYYY-MM-DD')) = $3 AND 
            EXTRACT(DAY FROM TO_DATE(dat_s, 'YYYY-MM-DD')) >= $5) OR (
            EXTRACT(MONTH FROM TO_DATE(dat_s, 'YYYY-MM-DD')) = $4 AND 
            EXTRACT(DAY FROM TO_DATE(dat_s, 'YYYY-MM-DD')) <= $6) OR (
            EXTRACT(MONTH FROM TO_DATE(dat_s, 'YYYY-MM-DD')) BETWEEN $7 AND $8))''',
            seg_class_code, flt_num, 
            date_start.month, date_finish.month,
            date_start.day, date_finish.day,
            date_start.month + 1, date_finish.month - 1,
    )


@connect_to_db
async def fetch_ml_data_for_dynamic_db(
    conn: asyncpg.Connection, 
    seg_class_code: str, 
    flt_num: int, 
    date: datetime,
    date_start: datetime,
    date_finish: datetime,
):
    return await conn.fetch(
            '''SELECT dat_s, pass_bk, dtd FROM "data_for_ml" 
            WHERE seg_class_code = $1 AND flt_num = $2 AND dep_day = $3 AND dep_month = $4 AND dep_year = $5 
            AND TO_DATE(dat_s, 'YYYY-MM-DD') BETWEEN $6 AND $7
            ''',
            seg_class_code, flt_num, date.day, date.month, date.year,
            date_start, date_finish
    )


@connect_to_db
async def fetch_ml_data_for_predict_db(
    conn: asyncpg.Connection, 
    flt_num: int, 
    date: datetime,
):
    return await conn.fetch(
            '''SELECT * FROM "data_for_predict" 
            WHERE flt_num = $1 AND dep_day = $2 AND dep_month = $3 AND dep_year = $4''',
            flt_num, date.day, date.month, date.year
        )
