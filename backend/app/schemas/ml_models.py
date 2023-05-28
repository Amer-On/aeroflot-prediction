from .base import BaseResponse, Status


class DynamicResponse(BaseResponse):
    status: Status = Status.OK
    flight_dynamic: list
    fourier_dynamic: list | None = None


class SeasonsResponse(BaseResponse):
    status: Status = Status.OK
    seasons: list
    fourier_seasons: list | None = None
