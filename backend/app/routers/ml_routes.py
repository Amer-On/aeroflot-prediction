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
    report_predict,
)
from ..schemas.base import ErrorResponse, OKResponse
from ..schemas.ml_models import (
    SeasonsReport,
    DynamicReport,
    PredictReport,
    SeasonsResponse,
    DynamicResponse,
    PredictResponse,
)
from ..db.ml_schemas import *
from ..auth import auth

router = APIRouter()

@router.post("/ml/seasons",
            response_model=SeasonsResponse | ErrorResponse)
async def seasons(report: SeasonsReport = Body()):
    '''
    Requirements in json {
        seg_class_code: str,
        flt_num: int,
    }
    Not require, but can be used in json {
        date_start: YYYY-MM-DD = -1-1,
        date_finish: YYYY-MM-DD = -12-31,
    }
    '''
    _, month, day = map(int, report.date_start.split("-"))
    date_start = DateNoYear(
        day=day,
        month=month
    )

    _, month, day = map(int, report.date_finish.split("-"))
    date_finish = DateNoYear(
        day=day,
        month=month
    )
    
    seasons = await report_seasons(
        seg_class_code=report.seg_class_code,
        flt_num=int(report.flt_num),
        date_start=date_start,
        date_finish=date_finish,
    )

    return SeasonsResponse(data=seasons)


@router.post("/ml/dynamic",
            response_model=DynamicResponse | ErrorResponse, dependencies=[Depends(auth)])
async def dynamic(report: DynamicReport = Body()):
    '''
    Requirements in json {
        seg_class_code: str,
        flt_num: int,
        dep_date: YYYY-MM-DD,
    }
    Not require, but can be used in json {
        period_start: str | None = None,
        period_end: str | None = None,
        fourier: int | None = None,
    }
    '''
    year, month, day = map(int, report.dep_date.split("-"))
    date = datetime(day=day, month=month, year=year)
    
    flight_dynamic, fourier_dynamic = await report_dynamic(
        seg_class_code=report.seg_class_code,
        flt_num=int(report.flt_num),
        date=date,
        period_start=report.period_start,
        period_end=report.period_end,
        fourier=int(report.fourier) if report.fourier else None,
    )
    return DynamicResponse(flight_dynamic=list(flight_dynamic), fourier_dynamic=list(fourier_dynamic) if fourier_dynamic is not None else None)


@router.post("/ml/predict",
            response_model=DynamicResponse | ErrorResponse, dependencies=[Depends(auth)])
async def predict(report: PredictReport = Body()):
    '''
    Requirements in json {
        seg_class_code: str,
        flt_num: int,
        dep_date: YYYY-MM-DD,
    }
    Not require, but can be used in json {
        dtd_start: int = -1,
        dtd_end: int = 30,
    }
    '''
    year, month, day = map(int, report.dep_date.split("-"))
    date = datetime(day=day, month=month, year=year)
    
    data = report_predict(
        seg_class_code=report.seg_class_code,
        flt_num=int(report.flt_num),
        date=date,
        dtd_start=int(report.dtd_start),
        dtd_end=int(report.dtd_end)
    )

    return DynamicResponse(**data)
