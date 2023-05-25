from fastapi import (
    APIRouter,
    Depends,
    Body
)

from ..schemas.base import ErrorResponse, OKResponse
from ..schemas.search_models import SearchCitiesResponse
from ..auth import auth
from ..algs.prefix_tree import PrefixTree

router = APIRouter()

prefix_tree = PrefixTree()
prefix_tree.generate(["Омар", "Бар", "Омск", "Омонск", "Обь", "Омсукчан"])


@router.get("/ping", response_model=OKResponse)
def ping():
    return OKResponse(message="App work")


@router.get("/cities/search/{prefix}",
            response_model=SearchCitiesResponse | ErrorResponse, dependencies=[Depends(auth)])
def search_cities_by_prefix(prefix: str):
    cities = prefix_tree.get_cities_by_prefix(prefix=prefix)
    return SearchCitiesResponse(cities=cities)
