from ..schemas import UserLoginSchema
from . import methods as db_methods


async def create_user(user: UserLoginSchema) -> None:
    await db_methods.add_user_db(user)


async def get_user_id(user: UserLoginSchema) -> str | None:
    """ Function returning user id to sign JWT for

    :type user: object
    :return: user id if user exists else None
    """
    userslist = await db_methods.fetch_user_db(user)

    user_id = None
    if userslist:
        user_id = str(userslist[0][0])
    return user_id


async def user_exists(user_id: str) -> bool:
    """ USER ID UUID FROM POSTGRES
    """
    return bool(await db_methods.fetch_user_by_user_id_db(user_id))
