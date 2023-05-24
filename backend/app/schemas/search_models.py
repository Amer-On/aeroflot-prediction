from schemas.base import BaseResponse, Status


class SearchCitiesResponse(BaseResponse):
    status: Status = Status.OK
    cities: list[str]
