import pandas as pd
from typing import Any


def report_for_seasons(data: Any):
    df = pd.DataFrame(data)
    df.columns = pd.Series(["DTD", "PASS_BK"])
    return df


def report_for_dynamic(data: Any):
    df = pd.DataFrame(data)
    df.columns = pd.Series(["DAT_S", "PASS_BK", "DTD"])
    return df


def report_for_predict(data: Any):
    df = pd.DataFrame(data)
    df.columns = pd.Series(["DAT_S", "FLT_NUM", "SEG_ORIG", "SEG_DEST", "SEG_CLASS_CODE", "PASS_BK", "DTD", "BPD", "hour_dep", "hour_arr", "minute_dep", "minute_arr", "DEP_DAY", "DEP_MONTH", "DEP_YEAR"])
    return df
