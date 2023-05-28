from datetime import datetime

from ..db import methods as db_methods
from ..db.ml_schemas import DateNoYear
from . import analytics, prediction
from .formatter_pandas import (
    report_for_seasons, 
    report_for_dynamic,
    report_for_predict,
    report_for_profile,
)


async def report_seasons(
    seg_class_code: str, 
    flt_num: int, 
    date_start: DateNoYear = DateNoYear(day=1, month=1),
    date_finish: DateNoYear = DateNoYear(day=31, month=12),
):
    fetch_results = await db_methods.fetch_ml_data_for_seasons_db(
        seg_class_code=seg_class_code,
        flt_num=flt_num,
        date_start=date_start,
        date_finish=date_finish,
        )
    print("Fetch finish")
    report_data = report_for_seasons(fetch_results)
    print("Formatted finish")
    seasons = analytics.get_seasons(df=report_data)
    data = {}
    for el in seasons:
        data[str(el)] = {}
        data[str(el)]['values'] = list(seasons[el])
        data[str(el)]['indexes'] = list(seasons[el].keys())
    return data


async def report_dynamic(
    seg_class_code: str, 
    flt_num: int, 
    date: datetime,
    period_start: str | None = None,
    period_end: str | None = None,
    fourier: int | None = None,
):
    fetch_results = await db_methods.fetch_ml_data_for_dynamic_db(
        seg_class_code=seg_class_code,
        flt_num=flt_num,
        date=date
        )
    print("Fetch finish")
    report_data = report_for_dynamic(fetch_results)
    print("Formatted finish")
    flight_dynamic, fourier_dynamic = analytics.get_dynamic(
        flight_dynamic=report_data,
        period_start=period_start,
        period_end=period_end,
        fourier=fourier
        )
    return list(flight_dynamic.keys()), flight_dynamic, fourier_dynamic


async def report_predict(
    seg_class_code: str, 
    flt_num: int, 
    date: datetime,
    dtd_start: int = -1,
    dtd_end: int = 30
):
    fetch_results = await db_methods.fetch_ml_data_for_predict_db(
        flt_num=flt_num,
        date=date
    )
    print("Fetch finish")
    report_data = report_for_predict(fetch_results)
    print("Formatted finish")
    data = prediction.predict(
        flight=report_data,
        class_code=seg_class_code,
        dep_day=date.day,
        dep_month=date.month,
        dep_year=date.year,
        dtd_start=dtd_start,
        dtd_end=dtd_end,
    )
    return data


async def report_profile(
    seg_class_code: str, 
    flt_num: int, 
    date_start: DateNoYear = DateNoYear(day=1, month=1),
    date_finish: DateNoYear = DateNoYear(day=31, month=12),
    period: int = 365,
    fourier: int | None = None,
):
    fetch_results = await db_methods.fetch_ml_data_for_profile_db(
        seg_class_code=seg_class_code,
        flt_num=flt_num,
        date_start=date_start,
        date_finish=date_finish,
        )
    print("Fetch finish")
    report_data = report_for_profile(fetch_results)
    print("Formatted finish")
    profile, fourier_profile = analytics.get_demand_profile(
        df=report_data, 
        period=period, 
        fourier=fourier
        )
    return list(map(int, profile)), list(map(int, fourier_profile))