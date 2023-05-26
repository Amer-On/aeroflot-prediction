import {MyGraphs} from './Graph';
import './main.css';
import {Link} from "react-router-dom";


function Analyzer(props) {
    let title = props.title;
    return (
        <>
            <div className='form'>
                <h1 className='main-h1'>{{ title }}</h1>
                <div className='input'>
                    <form className='main-form'>
                        <p className='f-form'>
                            <select>
                                <option disabled>-- Выберите направление --</option>
                                <option value="Moscow - Sochi">Москва - Сочи</option>
                                <option value="Sochi - Moscow">Сочи - Москва</option>
                            </select>
                        </p>
                        <p className='s-form'>
                            <select>
                                <option disabled>-- Выберите номер рейса --</option>
                                <option value="Moscow - Sochi">Москва - Сочи</option>
                            </select>
                        </p>
                        <p>
                            <input type="date" name="calendar" value="2017-01-01" max="2019-12-12"
                                   min="2012-05-29"></input>
                        </p>
                        <p className='s-form'>
                            <select>
                                <option disabled>-- Выберите класс бронирования --</option>
                                <option value="Moscow - Sochi">A</option>
                                <option value="Moscow - Sochi">A</option>
                                <option value="Moscow - Sochi">A</option>
                                <option value="Moscow - Sochi">A</option>
                                <option value="Moscow - Sochi">A</option>
                            </select>
                        </p>
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