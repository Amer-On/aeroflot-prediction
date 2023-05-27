import psycopg2
from .config_db import *

from ..schemas import UserLoginSchema


def add_user_db(user: UserLoginSchema):
    # Create connection
    conn = psycopg2.connect(
        user=POSTGRES_USER,
        password=POSTGRES_PASSWORD, 
        host=POSTGRES_SERVER,
        port=POSTGRES_PORT,
        database=POSTGRES_DB,
    )

    # Create cursor
    cur = conn.cursor()
    try:
        # Add user
        cur.execute(
            'INSERT INTO "user" (login, password) VALUES (%s, %s)', 
            (user.login, user.password)
        )
        # Commit changes
        conn.commit()
    except:
        pass

    # Close cursor and connection
    conn.close()
    cur.close()


def fetch_user_db(user: UserLoginSchema):
    # Create connection
    conn = psycopg2.connect(
        user=POSTGRES_USER,
        password=POSTGRES_PASSWORD, 
        host=POSTGRES_SERVER,
        port=POSTGRES_PORT,
        database=POSTGRES_DB,
    )
    # Create cursor
    cur = conn.cursor()

    try:
        # Find user
        cur.execute(
            'SELECT user_id, login, is_superuser FROM "user" WHERE login = %s AND password = %s', 
            (user.login, user.password)
        )
        res = cur.fetchall()
    except:
        res = []

    # Close cursor and connection
    conn.close()
    cur.close()

    # Return result of fetch
    return res


def fetch_user_by_user_id_db(user_id: str):
    # Create connection
    conn = psycopg2.connect(
        user=POSTGRES_USER,
        password=POSTGRES_PASSWORD, 
        host=POSTGRES_SERVER,
        port=POSTGRES_PORT,
        database=POSTGRES_DB,
    )
    # Create cursor
    cur = conn.cursor()
    # Find user
    cur.execute(
        'SELECT user_id, login, is_superuser FROM "user" WHERE user_id = \'' + user_id + '\'',
    )
    res = cur.fetchall()

    # Close cursor and connection
    conn.close()
    cur.close()

    # Return result of fetch
    return res


def delete_user_db(user: UserLoginSchema):
    # Create connection
    conn = psycopg2.connect(
        user=POSTGRES_USER,
        password=POSTGRES_PASSWORD, 
        host=POSTGRES_SERVER,
        port=POSTGRES_PORT,
        database=POSTGRES_DB,
    )

    # Create cursor
    cur = conn.cursor()

    try:
        # Delete user
        cur.execute(
            'DELETE FROM "user" WHERE login = %s AND password = %s', 
            (user.login, user.password)
        )

        # Commit changes
        conn.commit()
    except:
        pass

    # Close cursor and connection
    conn.close()
    cur.close()


def delete_user_by_user_id_db(user_id: str):
    # Create connection
    conn = psycopg2.connect(
        user=POSTGRES_USER,
        password=POSTGRES_PASSWORD, 
        host=POSTGRES_SERVER,
        port=POSTGRES_PORT,
        database=POSTGRES_DB,
    )

    # Create cursor
    cur = conn.cursor()

    try:
        # Delete user
        cur.execute(
            'DELETE FROM "user" WHERE user_id = \'' + user_id + '\'',
        )

        # Commit changes
        conn.commit()
    except:
        pass

    # Close cursor and connection
    conn.close()
    cur.close()
