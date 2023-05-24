import './main.css';

function Main(){
    return(
        <div className="main-conatiner">
            <div className='header'>
                <div className='nav'>
                    <div className='logo'></div>
                    <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </div>
            <div className='form'>
                <div className='form-header'>
                    <div className='first-form'>
                        <button className='DM'>
                            Динамика бронирования
                        </button>
                    </div>
                    <div className='second-form'>
                        <button className='DM'>
                            Сезоны
                        </button>
                    </div>
                    <div className='third-form'>
                        <button className='DM'>
                            Профиль спроса
                        </button>
                    </div>
                </div>
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
                        <p className='t-form'>
                            <select >
                                <option disable>-- Выбирите направление --</option>
                                <option value="Moscow - Sochi">Москва - Сочи</option>
                            </select>
                        </p>
                        <p>
                            <input type="date" name="calendar" value="2012-06-01" max="2012-06-04" min="2012-05-29"></input>
                        </p>
                    </form>
                </div>
            </div>
            <div className='charts'>
                <h1>asd</h1>
            </div>
        </div>
    );
}

export default Main;