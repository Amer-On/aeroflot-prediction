import {MyGraphs} from './Graph';
import './Main.css';
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../auth/AuthContext";
import {useEffect} from "react";
import {redirect} from 'react-router-dom'


function Analyzer(props) {
    const {isAuthenticated} = useAuth();
    const navigate = useNavigate()

    let classNameForm = 'main-form';
    let classNameForm_btn = 'predict-btn';
    if (props.title == 'Определение сезонности'){
        classNameForm = 'main-form1';
        classNameForm_btn = 'predict-btn1';
    }

    useEffect(
        () => {
            if (!isAuthenticated) {
                navigate('/login')
            }
        }
    )


    return (
        <>
            <div className='form'>
                <h1 className='main-h1'>{props.title}</h1>
                <div className='input'>
                    <form className={classNameForm}>
                        <div className='f-form'>
                            <select>
                                <option disabled>-- Выберите направление --</option>
                                <option value="Moscow - Sochi">Москва - Сочи</option>
                                <option value="Sochi - Moscow">Сочи - Москва</option>
                                <option value="Sochi - Moscow">Москва - Астрахань</option>
                                <option value="Sochi - Moscow">Астрахань - Москва</option>
                            </select>
                        </div>
                        <div className='s-form'>
                            <select>
                                <option disabled>-- Выберите номер рейса --</option>
                            </select>
                        </div>
                        <div className='d-form'>
                            <div className='date date-start'>
                                <label for='start'>Начало</label><br/>
                                <input type="date" id="start" name="trip-start" min="2017-06-04" max="2020-01-01"
                                       required/>
                            </div>
                            <div className='date date-end'>
                                <label for='end'>Конец</label><br/>
                                <input type="date" id="end" name="trip-end" min="2017-06-04" max="2020-01-01"
                                       required/>
                            </div>
                        </div>
                        <div className='t-form'>
                            <select>
                                <option disabled>-- Выберите класс бронирования --</option>
                                <option value="Z">Z</option>
                                <option value="Y">Y</option>
                                <option value="X">X</option>
                                <option value="V">V</option>
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
                        {props.title == 'Определение сезонности' &&
                            <div className='four-form'>
                                <label>1 - 365</label><br/>
                                <input type='text' />
                            </div>
                        }
                        <button className={classNameForm_btn}><p>сгенерировать</p></button>
                    </form>
                    
                </div>
            </div>
            <div className='charts'>
                <div className='f-graph'>
                    <MyGraphs/>
                </div>
            </div>
        </>
    );
}

export default Analyzer;