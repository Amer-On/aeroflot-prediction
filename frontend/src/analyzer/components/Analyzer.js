import './Main.css';
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../auth/AuthContext";
import {useEffect, useState} from "react";
import flight from './flight.json'
import {useRef} from "react";
import axios from 'axios';
import Chart from "./Chart";


// DEPRECATED
function Analyzer(props) {
    const {isAuthenticated} = useAuth();
    const navigate = useNavigate();
    const [flights, setFlights] = useState(flight["SVO-AER"]);
    const [data, setData] = useState(undefined);

    const inputRoute = useRef(null);
    const inputFltNum = useRef(null);
    const inputDateStart = useRef(null);
    const inputDateEnd = useRef(null);
    const inputSegClasCode = useRef(null);
    const inputPeriod = useRef(null);


    useEffect(
        () => {
            if (!isAuthenticated) {
                navigate('/login')
            }
        }
    );

    function handleRouteChange(e) {
        setFlights(flight[e.target.value])
    }

    const responseBody = {
        'seg_class_code': '', 'flt_num': 0, 'date_start': undefined,
        "date_end": undefined, 'period': 365
    }

    const host = '';

    function submitFormHandler(event) {
        event.preventDefault();
        responseBody.seg_class_code = inputSegClasCode.current.value;
        responseBody.flt_num = inputFltNum.current.value;
        responseBody.date_start = inputDateStart.current.value;
        responseBody.date_end = inputDateEnd.current.value;

        axios.post(host + props.route, responseBody, {withCredentials: true}).then(
            response => {
                // process response
            }
        ).catch(e => console.log(e))
    }


    return (
        <>
            <div className='form'>
                <h1 className='main-h1'>{props.title}</h1>
                <div className='input'>
                    <form className='main-form' onSubmit={submitFormHandler}>
                        <div className='f-form'>
                            <select onChange={handleRouteChange} ref={inputRoute}>
                                <option disabled>-- Выберите направление --</option>
                                <option value="SVO-AER">Москва - Сочи</option>
                                <option value="AER-SVO">Сочи - Москва</option>
                                <option value="SVO-ASF">Москва - Астрахань</option>
                                <option value="ASF-SVO">Астрахань - Москва</option>
                            </select>
                        </div>
                        <div className='s-form'>
                            <select ref={inputFltNum}>
                                <option disabled>-- Выберите номер рейса --</option>
                                {flights ? flights.map(
                                    (flt) => (
                                        <option value={flt}>{flt}</option>
                                    )
                                ) : ""}
                            </select>
                        </div>
                        <div className='d-form'>
                            <div className='date date-dep'>
                                <label htmlFor='dep'>Начало</label><br/>
                                <input type="date" id="dep" name="trip-dep" min="2017-06-04" max="2020-01-01"
                                       required ref={inputDateStart}/>
                            </div>
                            <div className='date date-start'>
                                <label htmlFor='start'>Конец</label><br/>
                                <input type="date" id="start" name="trip-start" min="2017-06-04" max="2020-01-01"
                                       required ref={inputDateEnd}/>
                            </div>
                            <div className='date date-end'>
                                <label htmlFor='end'>Конец</label><br/>
                                <input type="date" id="end" name="trip-end" min="2017-06-04" max="2020-01-01"
                                       required ref={inputDateEnd}/>
                            </div>
                        </div>
                        <div className='t-form'>
                            <select ref={inputSegClasCode}>
                                <option disabled>-- Выберите класс бронирования --</option>
                                <option value="Z">Z</option>
                                <option value="Y">Y</option>
                                <option value="X">X</option>
                                <option value="U">U</option>
                                <option value="T">T</option>
                                <option value="R">R</option>
                                <option value="Q">Q</option>
                                <option value="P">P</option>
                                <option value="O">O</option>
                                <option value="N">N</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="K">K</option>
                                <option value="J">J</option>
                                <option value="I">I</option>
                                <option value="H">H</option>
                                <option value="G">G</option>
                                <option value="E">E</option>
                                <option value="D">D</option>
                                <option value="C">C</option>
                                <option value="B">B</option>
                            </select>
                        </div>
                        {props.title == 'Профиль спроса' &&
                            <div className='four-form'>
                                <label>1 - 365</label><br/>
                                <input type='text' min={1} max={365}/>
                            </div>
                        }
                        <button className='predict-btn' type='submit'><p>сгенерировать</p></button>
                    </form>
                </div>
            </div>
            <Chart data={data} title={props.title}/>
        </>
    );
}

export default Analyzer;