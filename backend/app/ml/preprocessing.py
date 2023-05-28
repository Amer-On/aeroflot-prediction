import os

import pandas as pd
from os import listdir
from pathlib import Path

CWD = os.getcwd()

drop_columns_cabin = ['SAK', 'LGNUM', 'CAP', 'UAL', 'SAL', 'SSC']
drop_columns_class = ['SAK', 'SEG_NUM', 'NBCL', 'SA', 'AU', 'NS', 'FCLCLD', 'SSCL1', 'PASS_DEP']
columns_rename = {'SDAT_S': 'DAT_S', 'DD': 'DEP_DATE', 'SORG': 'SEG_ORIG', 'SDST': 'SEG_DEST'}
drop_columns_df = ['DEP_DATE', 'TT_DEP', 'TT_ARR', 'EQUIP']


def gen_csv_to_df(files: list):
    for el in files:
        yield pd.read_csv(el, delimiter=';')


def year_df(cabin_df: pd.DataFrame, class_df: pd.DataFrame) -> pd.DataFrame:
    """
    Forms yearly dataframe

    :param pd.DataFrame cabin_df: cabin dataframe for one year
    :param pd.DataFrame class_df: class dataframe for one year
    :return pd.DataFrame: final dataframe to train models with
    """
    cabin_df = cabin_df.drop(columns=drop_columns_cabin)

    class_df = class_df.drop(columns=drop_columns_class)
    class_df = class_df.rename(columns=columns_rename)
    class_df = class_df.sort_values(['FLT_NUM', 'DEP_DATE', 'SEG_CLASS_CODE', 'DTD'],
                                    ascending=False).reset_index(drop=True)
    # _class['BPD'] = _class.groupby(['FLT_NUM','DEP_DATE','SEG_CLASS_CODE'])['PASS_BK'].diff().fillna(0)
    cabin_df['SEG_DEST'] = cabin_df['SEG_DEST'].str.replace(' ', '')
    cabin_df['SEG_ORIG'] = cabin_df['SEG_ORIG'].str.replace(' ', '')

    result_df = class_df.merge(cabin_df, how='outer').dropna()

    result_df['PASS_BK'] = result_df['PASS_BK'].round().astype(int)
    result_df[['hour_dep', 'hour_arr']] = result_df[['TT_DEP', 'TT_ARR']] // 100
    result_df[['minute_dep', 'minute_arr']] = result_df[['TT_DEP', 'TT_ARR']] % 100

    dep_date = pd.to_datetime(result_df['DEP_DATE'], format='%d.%m.%Y')
    result_df['DAT_S'] = pd.to_datetime(result_df['DAT_S'], format='%d.%m.%Y')
    result_df['DEP_DAY'] = dep_date.dt.day
    result_df['DEP_MONTH'] = dep_date.dt.month
    result_df['DEP_YEAR'] = dep_date.dt.year
    result_df = result_df.drop(columns=drop_columns_df)

    return result_df


def _get_dataframes_generator(filedir: str):
    return gen_csv_to_df(sorted([os.path.join(filedir, f) for f in listdir(filedir)]))


def _form_year_df(filedir):
    gen = _get_dataframes_generator(filedir)
    cabin = next(gen)
    _class = pd.concat([el for el in gen])
    return year_df(cabin, _class)


def get_full_df(filedir_: Path, filename: str = "result_df.csv") -> pd.DataFrame:
    """
    Full data preprocessing, saves and returns final dataframe

    :param Path filedir_: relative path directory with dataframes
    :param str, default "result_df.csv" filename: filename to save file
    :return pd.DataFrame:
    """
    _cwd = os.getcwd()

    df_2018 = _form_year_df(os.path.join(os.getcwd(), filedir_, '2018'))
    df_2019 = _form_year_df(os.path.join(os.getcwd(), filedir_, '2019'))

    result_df = pd.concat([df_2018, df_2019])
    result_df.to_csv(os.path.join(_cwd, filedir_, filename), sep=';', index=False)
    return result_df
