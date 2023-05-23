from pydantic import BaseModel
from enum import Enum


class Status(Enum):
    OK = "ok"
    ERROR = "error"
    IN_PROGRESS = "in_progress"


class BaseResponse(BaseModel):
    status: Status
    message: str | None = None


class ErrorResponse(BaseResponse):
    status: Status = Status.ERROR


class OKResponse(BaseResponse):
    status: Status = Status.OK


class InProgressResponse(BaseResponse):
    status: Status = Status.IN_PROGRESS
