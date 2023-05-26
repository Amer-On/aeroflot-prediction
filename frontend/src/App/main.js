import Graphs, { MyGraphs } from './components/graps/graphs';
import './main.css';    

function Main(){
    return(
        <div className="main-container">
            <div className='header'>
                <div className='nav'>
                    <div className='logo'>
                        {/* <img src="components/Aeroflot_logo.png" className='logo'/> */}
                    </div>
                    <ul className='header-navigation'>
                        <li><button>Домой</button></li>
                        <li><button>Динамика бронирования</button></li>
                        <li><button>Предсказания спроса</button></li>
                        <li><button>Профиль спроса</button></li>
                        <li><button>Определение сезонности</button></li>
                    </ul>
                </div>
            </div>
            <div className='form'>
                <h1 className='main-h1'>Динамика бронирования</h1>
                <div className='input'>
                    <form className='main-form'>
                        <p className='f-form'>
                            <select >
                                <option disable>-- Выбирите направление --</option>
                                <option value="Moscow - Sochi">Москва - Сочи</option>
                                <option value="Sochi - Moscow">Сочи - Москва</option>
                            </select>
                        </p>
                        <p className='s-form'>
                            <select >
                                <option disable>-- Выбирите номер рейса --</option>
                                <option value="Moscow - Sochi">Москва - Сочи</option>
                            </select>
                        </p>
                        <p>
                            <input type="date" name="calendar" value="2017-01-01" max="2019-12-12" min="2012-05-29"></input>
                        </p>
                        <p className='s-form'>
                            <select >
                                <option disable>-- Выбирите класс бронирования --</option>
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
        </div>
    );
}

export default Main;