import axios from "axios";
import Chart from "./components/Chart";
import {useRef, useState} from "react";
import flight from './components/flight.json'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../components/Loader";


function BookingDynamicsPage() {
    let title = 'Динамика бронирования'
    const [flights, setFlights] = useState(flight["SVO-AER"]);
    const [loader, setLoader] = useState(false);

    const inputRoute = useRef(null);
    const inputFltNum = useRef(null);
    const inputSegClasCode = useRef(null);
    const inputDepartureDate = useRef(null);
    const inputDateStart = useRef(null);
    const inputDateEnd = useRef(null);
    const [x, setX] = useState(undefined);
    const [y, setY] = useState(undefined);

    function handleRouteChange(e) {
        setFlights(flight[e.target.value])
    }

    const responseBody = {
        'seg_class_code': '', 'flt_num': 0, 'dep_date': undefined
    }

    const route = '/api/ml/dynamic'

    function submitFormHandler(event) {
        event.preventDefault();
        setLoader(true)
        responseBody.seg_class_code = inputSegClasCode.current.value;
        responseBody.flt_num = inputFltNum.current.value;
        responseBody.dep_date = inputDepartureDate.current.value;

        if (inputDateStart.current.value) {
            responseBody.period_start = inputDateStart.current.value;
        }
        if (inputDateEnd.current.value) {
            responseBody.period_end = inputDateEnd.current.value;
        }

        axios.post(route, responseBody, {withCredentials: true}).then(
            response => {
                setLoader(false)
                if (response.data.status === 'error') {
                    if (response.data.error_code === 2) {
                        toast.error("В этот день нет вылета данного рейса или временные границы некорректны")
                    } else {
                        toast.error("Неизвестная ошибка")
                    }
                } else {
                    const d = response.data
                    setX(d['indexes'])
                    const arrY = []
                    arrY.push(d['flight_dynamic'])
                    setY(arrY)
                }
            }
        ).catch(e => {
            toast.error("Неизвестная ошибка")
            console.log(e)
        })
    }


    return (
        <>
            <div className='form'>
                <h1 className='main-h1'>{title}</h1>
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
                        <div className='d-form'>
                            <div className='date date-start'>
                                <label htmlFor='start'>Дата вылета</label><br/>
                                <input type="date" id="start" name="trip-start" min="2017-06-04" max="2020-01-01"
                                       required ref={inputDepartureDate}/>
                            </div>
                            <div className='date date-end'>
                                <label htmlFor='end'>Начало</label><br/>
                                <input type="date" id="end" name="trip-end" min="2017-06-04" max="2020-01-01"
                                       ref={inputDateStart}/>
                            </div>
                            <div className='date date-start'>
                                <label htmlFor='end'>Конец</label><br/>
                                <input type="date" id="end" name="trip-end" min="2017-06-04" max="2020-01-01"
                                       ref={inputDateEnd}/>
                            </div>
                        </div>
                        <button className='predict-btn' type='submit'><p>сгенерировать</p></button>
                    </form>
                </div>
            </div>
            {loader ? <Loader/> : <></>}
            {x && y ?
                <Chart x={x} y={y} keys={['Динамика']} title={title}/>
                :
                <></>
            }
        </>
    );
}


export default BookingDynamicsPage;