from ..db import methods as db_methods
from ..db.ml_schemas import DateNoYear
from . import analytics
from .formatter_pandas import report_for_seasons


async def report_seasons(
    seg_class_code: str, 
    flt_num: int, 
    date_start: DateNoYear = DateNoYear(day=1, month=1),
    date_finish: DateNoYear = DateNoYear(day=31, month=12),
    period: int = 365,
    fourier: int | None = None,
):
    fetch_results = await db_methods.fetch_ml_data_for_seasons_db(
        seg_class_code=seg_class_code,
        flt_num=flt_num,
        date_start=date_start,
        date_finish=date_finish,
        period=period,
        fourier=fourier
        )
    print("Fetch finish")
    report_data = report_for_seasons(fetch_results)
    print("Formatted finish")
    seasons, fourier_seasons = analytics.get_seasons(
        df=report_data,
        period=period,
        fourier=fourier
        )
    return seasons, fourier_seasons