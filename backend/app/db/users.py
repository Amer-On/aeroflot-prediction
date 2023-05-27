from ..schemas import UserLoginSchema
from . import methods as db_methods


def create_user(user: UserLoginSchema) -> None:
    db_methods.add_user_db(user)


def get_user_id(user: UserLoginSchema) -> str | None:
    """ Function returning user id to sign JWT for

    :type user: object
    :return: user id if user exists else None
    """
    userslist = db_methods.fetch_user_db(user)

    user_id = None
    if userslist:
        user_id = userslist[0][0]
    return user_id


def user_exists(user_id: str) -> bool:
    """ USER ID UUID FROM POSTGRES
    """
    return bool(db_methods.fetch_user_by_user_id_db(user_id))
