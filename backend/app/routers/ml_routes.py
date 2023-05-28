from fastapi import (
    APIRouter,
    Depends,
    Body,
    Request,
)
from datetime import datetime

from ..ml.models import (
    report_dynamic,
    report_seasons,
)
from ..schemas.base import ErrorResponse, OKResponse
from ..schemas.ml_models import (
    SeasonsResponse,
    DynamicResponse,
)
from ..db.ml_schemas import *
from ..auth import auth

router = APIRouter()

@router.get("/ml/seasons",
            response_model=SeasonsResponse | ErrorResponse, dependencies=[Depends(auth)])
async def seasons(req: Request):
    '''
    Requirements in params {
        seg_class_code: str,
        flt_num: str,
    }
    Not require, but can be used in params {
        date_start: YYYY-MM-DD = -1-1,
        date_finish: YYYY-MM-DD = -12-31,
        period: int = 365,
        fourier: int | None = None,
    }
    '''
    if 'seg_class_code' not in req.query_params:
        ErrorResponse(message="seg_class_code does not exist")
    seg_class_code = req.query_params.get('seg_class_code')

    if 'flt_num' not in req.query_params:
        ErrorResponse(message="flt_num does not exist")
    flt_num = int(req.query_params.get('flt_num'))

    date_start = DateNoYear(day=1, month=1)
    if 'date_start' in req.query_params:
        _, month, day = map(int, req.query_params.get("date_start").split("-"))
        date_start = DateNoYear(day=day, month=month)

    date_finish = DateNoYear(day=31, month=12)
    if 'date_finish' in req.query_params:
        _, month, day = map(int, req.query_params.get("date_finish").split("-"))
        date_finish = DateNoYear(day=day, month=month)

    period = 365
    if 'period' in req.query_params:
        period = int(req.query_params.get("period"))
    
    fourier = None
    if 'fourier' in req.query_params:
        fourier = int(req.query_params.get("fourier"))
    
    seasons, fourier_seasons = await report_seasons(
        seg_class_code=seg_class_code,
        flt_num=flt_num,
        date_start=date_start,
        date_finish=date_finish,
        period=period,
        fourier=fourier
    )

    return SeasonsResponse(seasons=list(seasons), fourier_seasons=list(fourier_seasons) if fourier_seasons is not None else None)


@router.get("/ml/dynamic",
            response_model=DynamicResponse | ErrorResponse, dependencies=[Depends(auth)])
async def dynamic(req: Request):
    '''
    Requirements in params {
        seg_class_code: str,
        flt_num: str,
        dep_date: YYYY-MM-DD,
    }
    Not require, but can be used in params {
        period_start: str | None = None,
        period_end: str | None = None,
        fourier: int | None = None,
    }
    '''
    if 'seg_class_code' not in req.query_params:
        ErrorResponse(message="seg_class_code does not exist")
    seg_class_code = req.query_params.get('seg_class_code')

    if 'flt_num' not in req.query_params:
        ErrorResponse(message="flt_num does not exist")
    flt_num = int(req.query_params.get('flt_num'))

    if 'dep_date' not in req.query_params:
        ErrorResponse(message="dep_date does not exist")
    year, month, day = map(int, req.query_params.get('dep_date').split("-"))
    date = datetime(day=day, month=month, year=year)

    period_start = None
    if 'period_start' in req.query_params:
        period_start = req.query_params.get("period_start")
    
    period_end = None
    if 'period_end' in req.query_params:
        period_end = req.query_params.get("period_end")
    
    fourier = None
    if 'fourier' in req.query_params:
        fourier = int(req.query_params.get("fourier"))
    
    flight_dynamic, fourier_dynamic = await report_dynamic(
        seg_class_code=seg_class_code,
        flt_num=flt_num,
        date=date,
        period_start=period_start,
        period_end=period_end,
        fourier=fourier,
    )
    return DynamicResponse(flight_dynamic=list(flight_dynamic), fourier_dynamic=list(fourier_dynamic) if fourier_dynamic is not None else None)
