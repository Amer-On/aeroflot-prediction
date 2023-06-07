import Chart from "./components/Chart";
import {useRef, useState} from "react";
import flight from './components/flight.json'
import axios from "axios";


function DemandProfilePage() {
    let title = 'Профиль спроса';
    const [flights, setFlights] = useState(flight["SVO-AER"]);
    const [x, setX] = useState(undefined);
    const [y, setY] = useState(undefined);

    const inputRoute = useRef(null);
    const inputFltNum = useRef(null);
    const inputSegClassCode = useRef(null);
    const inputDateStart = useRef(null);
    const inputDateEnd = useRef(null);
    const inputPeriod = useRef(null);


    function handleRouteChange(e) {
        setFlights(flight[e.target.value])
    }

    const responseBody = {
        'seg_class_code': '', 'flt_num': 0,
    }

    const route = '/api/ml/profile'

    function submitFormHandler(event) {
        event.preventDefault();
        responseBody.seg_class_code = inputSegClassCode.current.value;
        responseBody.flt_num = inputFltNum.current.value;

        if (inputDateStart.current.value) {
            responseBody.date_start = inputDateStart.current.value
        }
        if (inputDateEnd.current.value) {
            responseBody.date_finish = inputDateEnd.current.value
        }

        if (inputPeriod.current.value) {
            responseBody.period = inputPeriod.current.value
        }
        axios.post(route, responseBody, {withCredentials: true}).then(
            response => {
                if (response.data.status === 'error') {
                    if (response.data.error_code === 2) {
                        console.log('В этот день нет вылета данного рейса или временные границы некорректны')
                    }
                } else {
                    let newArr = []
                    newArr.push(response.data.profile)
                    setY(newArr)
                    setX(Array.from({length: response.data.profile.length}, (value, index) => index))
                }
            }
        ).catch(e => console.log(e))
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
                            <select ref={inputSegClassCode}>
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
                                <label htmlFor='start'>Дата начала</label><br/>
                                <input type="date" id="start" name="trip-start" min="2017-06-04" max="2020-01-01"
                                       ref={inputDateStart}/>
                            </div>
                            <div className='date date-end'>
                                <label htmlFor='start'>Дата окончания</label><br/>
                                <input type="date" id="end" name="trip-end" min="2017-06-04" max="2020-01-01"
                                       ref={inputDateEnd}/>
                            </div>
                        </div>
                        <div className='four-form'>
                            <label>Период</label><br/>
                            <input type='number' defaultValue={365} min={-1} max={365}
                                   ref={inputPeriod}/>
                        </div>
                        <button className='predict-btn' type='submit'><p>сгенерировать</p></button>
                    </form>
                </div>
            </div>
            <Chart x={x} y={y} keys={['Профиль спроса']}/>
        </>);
}

export default DemandProfilePage;
