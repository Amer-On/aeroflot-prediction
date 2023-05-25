from schemas import UserLoginSchema


def get_user_id(user: UserLoginSchema) -> str | None:
    """ Function returning user id to sign JWT for

    :type user: object
    :return: user id if user exists else None
    """
    userslist = [UserLoginSchema(login='root', password='pass')]

    user_id = None
    if user in userslist:
        user_id = userslist.index(user)
    return user_id


def user_exists(user_id: str) -> bool:
    """ USER ID UUID FROM POSTGRES
    """
    user_ids = ['someid']
    return user_id in user_ids
