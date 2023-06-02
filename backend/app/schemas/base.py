from pydantic import BaseModel
from enum import Enum


class Status(str, Enum):
    OK = "ok"
    ERROR = "error"
    IN_PROGRESS = "in_progress"


class ErrorCode(int, Enum):
    UNKNOWN = 0
    NOT_FOUND = 1
    ANALYZE_ERROR = 2
    PREDICT_ERROR = 3


class BaseResponse(BaseModel):
    status: Status
    message: str | None = None


class ErrorResponse(BaseResponse):
    status: Status = Status.ERROR
    error_code: ErrorCode = ErrorCode.UNKNOWN


class OKResponse(BaseResponse):
    status: Status = Status.OK


class InProgressResponse(BaseResponse):
    status: Status = Status.IN_PROGRESS
