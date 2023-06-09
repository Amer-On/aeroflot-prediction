from .base import BaseResponse, Status
from pydantic import BaseModel
from ..db.ml_schemas import *


class SeasonsReport(BaseModel):
    seg_class_code: str
    flt_num: int
    date_start: str = "2018-01-01"
    date_finish: str = "2018-12-31"


class DynamicReport(BaseModel):
    seg_class_code: str
    flt_num: int
    dep_date: str
    period_start: str | None = None
    period_end: str | None = None
    fourier: int | None = None


class PredictReport(BaseModel):
    seg_class_code: str
    flt_num: int
    dep_date: str
    dtd_start: int = -1
    dtd_end: int = 30


class ProfileReport(BaseModel):
    seg_class_code: str
    flt_num: int
    date_start: str = "2018-01-01"
    date_finish: str = "2018-12-31"
    period: int = 365
    fourier: int | None = None


class DynamicResponse(BaseResponse):
    status: Status = Status.OK
    indexes: list
    flight_dynamic: list
    fourier_dynamic: list | None = None


class SeasonsResponse(BaseResponse):
    status: Status = Status.OK
    data: dict


class PredictResponse(BaseResponse):
    status: Status = Status.OK
    data: dict


class ProfileResponse(BaseResponse):
    status: Status = Status.OK
    profile: list[int]
    fourier_profile: list[int]
