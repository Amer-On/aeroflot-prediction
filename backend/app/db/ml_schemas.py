from pydantic import BaseModel


class DateNoYear(BaseModel):
    day: int
    month: int
