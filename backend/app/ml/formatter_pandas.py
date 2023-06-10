import pandas as pd
from typing import Any


def report_for_seasons(data: Any):
    df = pd.DataFrame(data)
    df.columns = pd.Series(["dat_s", "PASS_BK"])
    return df


def report_for_dynamic(data: Any):
    df = pd.DataFrame(data)
    df.columns = pd.Series(["DAT_S", "PASS_BK", "DTD"])
    return df


def report_for_predict(data: Any):
    df = pd.DataFrame(data)
    df.columns = pd.Series(["FLT_NUM", "SEG_ORIG", "SEG_DEST", "DEP_DAY", "DEP_MONTH", "DEP_YEAR", "hour_dep", "hour_arr", "minute_dep", "minute_arr"])
    return df


def report_for_profile(data: Any):
    df = pd.DataFrame(data)
    df.columns = pd.Series(["DAT_S", "PASS_BK"])
    return df