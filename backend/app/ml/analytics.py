import pandas as pd
import numpy as np
from statsmodels.tsa.seasonal import seasonal_decompose
import statsmodels.tsa
from scipy.fft import rfft, irfft
from typing import Tuple

def get_seasons(df: pd.DataFrame, period: int = 365, fourier: int | None = None) \
        -> Tuple[statsmodels.tsa.seasonal.DecomposeResult, np.ndarray | None]:
    """
    Make seasonal decompose

    :param pd.DataFrame df: origin DataFrame
    :param str class_code: single symbol code representing Seg Class Code
    :param flt_num: flight number(code)
    :param int, default 1 day_start: day start of flights
    :param int, default 31 day_end: day end of flights
    :param int, default 1 month_start: month start of flights
    :param int, default 12 month_end: month end of flights
    :param int, default 365 period: period to make seasonal decompose, by default decompose by each year
    :param int | None, default None fourier: optional parameter, make fourier decompose to prettify the final graph
    :return: result of seasonal decompose and result prettified by fourier
    """

    # Grouping by check date
    flight = df.groupby('DAT_S')['PASS_BK'].sum()
    # Get seasons by period
    seasons = seasonal_decompose(flight, model='additive', period=period).seasonal

    # Get fourier smoothing if needed
    if fourier:
        # Fast fourier transform
        fourier_seasons = rfft(seasons[:period].values)
        # Drop noise signals
        fourier_seasons[fourier:] = 0

        # Inverse fourier transform
        fourier_seasons = irfft(fourier_seasons)

        if fourier_seasons.size != seasons.size:
            fourier_seasons = np.append(fourier_seasons, seasons[period])

        # Return seasons and fourier smoothing
        return seasons[:period], fourier_seasons

    # Return seasons
    return seasons[:period], None


def get_dynamic(flight_dynamic: pd.DataFrame, period_start: str | None = None, period_end: str | None = None, fourier: int | None = None) \
        -> Tuple[statsmodels.tsa.seasonal.DecomposeResult, np.ndarray | None]:
    """
    Gets dynamic of

    :param pd.DataFrame df: origin DataFrame
    :param str class_code: Seg Class Code
    :param int flt_num: flight number(code)
    :param int dep_day: departure day
    :param int dep_month: departure month
    :param int dep_year: departure year
    :param str | None, period_start: start of flight period in format '%Y-%m-%d'
    :param str | None, period_end: end of flight period in format '%Y-%m-%d'
    :param int | None, default None fourier: optional parameter, make fourier decompose to prettify the final graph
    :return:
    """
    # If user period
    if period_start:
        # Get need date in period
        flight_dynamic = flight_dynamic[(flight_dynamic['DAT_S'] >= pd.to_datetime(period_start)) & (
                flight_dynamic['DAT_S'] <= pd.to_datetime(period_end))].sort_values('DTD')
    # If not user period    
    else:
        flight_dynamic = flight_dynamic[flight_dynamic['DTD'] < 30].sort_values('DTD')

    # Get DTD and PASS_BK
    flight_dynamic = flight_dynamic.set_index('DTD')['PASS_BK']
    # Get fourier smoothing if needed
    if fourier:
        # Fast fourier transform
        fourier_dynamic = rfft(flight_dynamic.values)

        # Drop noise signals
        fourier_dynamic[fourier:] = 0

        # Inverse fourier transform
        fourier_dynamic = irfft(fourier_dynamic)
        if fourier_dynamic.size != flight_dynamic.size:
            fourier_dynamic = np.append(fourier_dynamic, flight_dynamic.values[-1])
        # Return dynamic and fourier smoothing
        return flight_dynamic, fourier_dynamic

    # Return dynamic
    return flight_dynamic, None
