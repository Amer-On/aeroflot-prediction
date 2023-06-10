import pandas as pd
from catboost import CatBoostRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
from datetime import datetime
import logging
from pathlib import Path
import os

MODELS_DEFAULT_PATH = os.path.join(os.getcwd(), 'models')


def learn_by_code(df: pd.DataFrame, code: str,
                  task_type: str = "GPU",
                  log_error: bool = True) -> CatBoostRegressor:
    """
    Trains model with given dataframe

    :param pd.DataFrame df: preprocessed dataframe for training
    :param str code: Seg Class Code, which the model is trained for
    :param str, optional task_type: train on CPU/GPU
    :param bool, optional log_error: logs MSE after training
    :return:
    """
    model = CatBoostRegressor(iterations=12000,
                              learning_rate=0.15,
                              depth=11,
                              early_stopping_rounds=50,
                              use_best_model=True,
                              loss_function='RMSE',
                              cat_features=('FLT_NUM', 'SEG_ORIG', 'SEG_DEST'),
                              gpu_cat_features_storage='GpuRam',
                              task_type=task_type,
                              metric_period=50,
                              thread_count=12,
                              random_seed=42)
    train_df = df[df['SEG_CLASS_CODE'] == code]
    x = train_df.drop(columns=['DAT_S', 'PASS_BK', 'SEG_CLASS_CODE', 'BPD'])
    y = train_df['PASS_BK']
    x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=42, shuffle=True)
    x_train, x_val, y_train, y_val = train_test_split(x_train, y_train, test_size=0.2, random_state=42, shuffle=True)
    model.fit(x_train, y_train, eval_set=[(x_val, y_val)])

    if log_error:
        reg_pred = model.predict(x_test).astype(int)
        logging.info('[ML] MSE TEST : ', mean_squared_error(y_test, reg_pred))
    return model


def fit_model(df: pd.DataFrame, filepath: Path = MODELS_DEFAULT_PATH,
              print_progress: bool = True) -> None:
    """
    Fit models for every Seg Class code and save them to specified directory


    :param pd.DataFrame df: processed clean dataframe to train models
    :param pathlib.Path filepath: path to save models
    :param bool, optional print_progress: logs each time after a model has finished training
    :return None: void function
    """

    for code in df['SEG_CLASS_CODE'].unique():
        model = learn_by_code(df, code, task_type='CPU')
        model_file = os.path.join(filepath, f"{code}_CLASS.cbm")
        model.save_model(model_file)

        if print_progress:
            logging.info(f'[ML] Model for Seg Class Code {code} finished training and was saved to {model_file}')


def predict(df: pd.DataFrame, class_code: str, dep_day: int, dep_month: int, dep_year: int, dtd_start: int = -1, dtd_end: int = 30):
    """
    Model is read from file and predicts from given dataframe

    :param pd.Datetime df:
    :param int flt_num:
    :param str class_code:
    :param int dep_day:
    :param int dep_month:
    :param int dep_year:
    :param int, optional dtd_start:
    :param int, optional dtd_end:
    :return:
    """

    flight_list = []

    class_codes = ['B','C','D','E','G','H','I','J','K','L','M','N','O','P','Q','R','T','U','X','Y','Z']

    business_code = ['J','C','D','I','Z','O']

    for code in class_codes:
        dtd = list(range(dtd_start, dtd_end + 1))
        flight = pd.concat([df] * len(dtd))
        flight['DTD'] = dtd
        flight = flight[
            ['FLT_NUM', 'SEG_ORIG', 'SEG_DEST', 'DTD', 'hour_dep', 'hour_arr', 'minute_dep', 'minute_arr', 'DEP_DAY',
             'DEP_MONTH', 'DEP_YEAR']].sort_values('DTD').reset_index(drop=True)
        model = CatBoostRegressor().load_model(f'app/ml/models/{code}_CLASS')

        flight['PASS_BK'] = model.predict(flight).round().astype(int)
        flight[flight['PASS_BK']<0] = 0
        # TODO: OPTIMIZE
        start = pd.to_datetime(datetime(dep_year, dep_month, dep_day)) - pd.offsets.Day(dtd_end)
        end = pd.to_datetime(datetime(dep_year, dep_month, dep_day)) - pd.offsets.Day(dtd_start)
        flight['DAT_S'] = pd.date_range(start=start, end=end)[::-1]
        flight['SEG_CLASS_CODE'] = code
        flight_list.append(flight)

    flight = pd.concat(flight_list)
    business  = flight.query('SEG_CLASS_CODE in @business_code')
    econom = flight.query('SEG_CLASS_CODE not in @business_code')
    business = business.groupby('DTD')['PASS_BK'].sum().sort_index(ascending = False)
    econom = econom.groupby('DTD')['PASS_BK'].sum().sort_index(ascending = False)
    return {'data': {'business_index' : list(business.index), 'business_values': [int(el) for el in business.values],
    'econom_index' : list(econom.index), 'econom_values': [int(el) for el in econom.values]}}
