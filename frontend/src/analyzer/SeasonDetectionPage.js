import axios from "axios";
import Chart from "./components/Chart";
import {useRef, useState} from "react";
import flight from './components/flight.json'
import {toast} from "react-toastify";
import Loader from "../components/Loader";
import "./analayzerstyle/SeasonDP.css";
import {itemsMon, itemsDay, get_mon_id} from "./helper";

function SeasonDetectionPage() {
    let title = 'Определение сезонности'
    const [flights, setFlights] = useState(flight["SVO-AER"]);
    const [keys, setKeys] = useState(undefined);
    const [loader, setLoader] = useState(false);

    const inputRoute = useRef(null);
    const inputFltNum = useRef(null);
    const inputSegClasCode = useRef(null);
    const [x, setX] = useState(undefined);
    const [y, setY] = useState(undefined);

    const inputDayStart = useRef(undefined);
    const inputMonthStart = useRef(undefined);
    const inputDayEnd = useRef(undefined);
    const inputMonthEnd = useRef(undefined);

    function handleRouteChange(e) {
        setFlights(flight[e.target.value])
    }

    const responseBody = {
        'seg_class_code': '', 'flt_num': 0
    }

    const route = '/api/ml/seasons';

    function submitFormHandler(event) {
        event.preventDefault();
        setLoader(true);
        responseBody.seg_class_code = inputSegClasCode.current.value;
        responseBody.flt_num = inputFltNum.current.value;

        if (inputDayStart.current.value !== '-Д-' && inputMonthStart.current.value !== '-М-') {
            responseBody.date_start = [2018, get_mon_id(inputMonthStart.current.value),
                inputDayStart.current.value].join('-')
        }

        if (inputDayEnd.current.value !== '-Д-' && inputMonthEnd.current.value !== "-М-") {
            responseBody.date_finish = [2018, get_mon_id(inputMonthEnd.current.value),
                inputDayEnd.current.value].join('-')
        }

        axios.post(route, responseBody, {withCredentials: true}).then(
            response => {
                setLoader(false);
                if (response.data.status === 'error') {
                    if (response.data.error_code === 2) {
                        toast.error("В этот день нет вылета данного рейса или временные границы некорректны")
                    } else {
                        toast.error("Неизвестная ошибка")
                    }
                } else {
                    const d = response.data.data;
                    const yArr = []
                    const keys = []

                    for (const idx in d) {
                        const x = d[idx]
                        yArr.push(x['values'])
                        keys.push(idx)
                    }
                    keys[keys.length - 1] = 'Сезонность'
                    setX(d['large_changes']['indexes'])
                    setY(yArr)
                    setKeys(keys)
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
                    <form className='main-form SDP-form' onSubmit={submitFormHandler}>
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
                                <label htmlFor='start'>Начало</label><br/>
                                <select className="d-start-d" ref={inputDayStart}>
                                    <option disabled selected="selected">-Д-</option>
                                     {itemsDay.map((item, index) => (<option key={index}>{item}</option>))}
                                 </select>
                                 <select className="d-start-m" ref={inputMonthStart}>
                                     <option disabled selected="selected">-М-</option>
                                     {itemsMon.map((item, index) => (<option key={index}>{item}</option>))}
                                 </select>
                            </div>
                            <div className='date date-end'>
                                <label htmlFor='end'>Конец</label><br/>
                                <select className="d-end-d" ref={inputDayEnd}>
                                     <option disabled selected="selected">-Д-</option>
                                     {itemsDay.map((item, index) => (<option key={index}>{item}</option>))}
                                 </select>
                                <select className="d-end-m" ref={inputMonthEnd}>
                                     <option disabled selected="selected">-М-</option>
                                     {itemsMon.map((item, index) => (<option key={index}>{item}</option>))}
                                 </select>
                            </div>
                        </div>
                        <button className='predict-btn' type='submit'><p>сгенерировать</p></button>
                    </form>
                </div>
            </div>
            {loader ? <Loader/> : <></>}
            {x && y ?
                <Chart x={x} y={y} keys={keys} title={title} xlabel={'Дней до вылета'}/>
                :
                <></>
            }
        </>
    );
}

export default SeasonDetectionPage;
