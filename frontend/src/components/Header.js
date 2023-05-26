import React from "react";
import {Link} from "react-router-dom";
import "./Header.css";

function Header() {
    return (
        <div className='header'>
            <div className='nav'>
                <div className='logo'/>
                <ul className='header-navigation'>
                    <Link to='/home'>
                        <li>
                            <button>Домой</button>
                        </li>
                    </Link>
                    <Link to='/booking-dynamic'>
                        <li>
                            <button>Динамика бронирования</button>
                        </li>
                    </Link>
                    <Link to='/demand-prediction'>
                        <li>
                            <button>Предсказания спроса</button>
                        </li>
                    </Link>
                    <Link to='/demand-profile'>
                        <li>
                            <button>Профиль спроса</button>
                        </li>
                    </Link>
                    <Link to='/season-detection'>
                        <li>
                            <button>Определение сезонности</button>
                        </li>
                    </Link>
                </ul>
                <Link to='/login'>
                    <button className="auth-btn"><p>АВТОРИЗАЦИЯ</p></button>
                </Link>
            </div>
        </div>
    );
}

export default Header;