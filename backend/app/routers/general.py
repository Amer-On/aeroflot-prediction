from fastapi import ( 
	APIRouter, 
	Depends
)

from ..schemas.base import ErrorResponse, OKResponse
from ..schemas.search_models import SearchCitiesResponse
from ..auth import auth
from ..algs.prefix_tree import PrefixTree
from ..dependencies import parse_prefix


router = APIRouter()

prefix_tree = PrefixTree()
prefix_tree.generate(["Омар", "Бар", "Омск", "Омонск", "Обь", "Омсукчан"])


@router.get(
    "/ping",
    response_model=OKResponse,
)
def ping():
    return OKResponse(message="App work")


@router.get(
    "/cities/search", 
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
