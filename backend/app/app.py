from fastapi import (
    FastAPI,
    Request,
    Depends,
)

from schemas.base import ErrorResponse, OKResponse
from schemas.search_models import SearchCitiesResponse
from algs.prefix_tree import PrefixTree
from auth import auth

app = FastAPI()
prefix_tree = PrefixTree()
prefix_tree.generate(["Омар", "Бар", "Омск", "Омонск", "Обь", "Омсукчан"])


def parse_prefix(req: Request):
    if "prefix" not in req.query_params:
        return None
    else:
        return req.query_params.get("prefix")


@app.get(
    "/ping",
    response_model=OKResponse,
)
def ping():
    return OKResponse(message="App work")


@app.get(
    "/back/cities/search", 
    response_model=SearchCitiesResponse | ErrorResponse,
    dependencies=[Depends(auth)]
)
def search_cities_by_prefix(prefix: str = Depends(parse_prefix)):
    if not prefix:
        return ErrorResponse(message="Prefix was not passed")
    if len(prefix) < 2:
        return ErrorResponse(message="Prefix is too short. The minimum prefix length is 2 characters")
    if type(prefix) != str:
        return ErrorResponse(message="Prefix must be a string")
    cities = prefix_tree.get_cities_by_prefix(prefix=prefix)
    return SearchCitiesResponse(cities=cities)
