import React from "react";
import {Link} from "react-router-dom";

function Header() {
    return (
        <div className='header'>
            <div className='nav'>
                <div className='logo'/>
                <ul className='header-navigation'>
                    <Link to='/'>
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
            </div>
        </div>
    );
}

export default Header;