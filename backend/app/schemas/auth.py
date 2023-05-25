from pydantic import BaseModel


class UserSchema(BaseModel):
    user_id: int | None = None
    login: str | None = None
    password: str | None = None

    class Config:
        schema_extra = {
            "example": {
                "user_id": "123",
                "login": "sometextlogin",
                "password": "weakpassword"
            }
        }


class UserLoginSchema(BaseModel):
    login: str
    password: str

    class Config:
        schema_extra = {
            "example": {
                "login": "sometextlogin",
                "password": "weakpassword"
            }
        }
