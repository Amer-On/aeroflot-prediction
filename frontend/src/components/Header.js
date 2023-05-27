import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import "./Header.css";
import {useAuth} from "../auth/AuthContext";
import axios from "axios";

function Header(props) {
    const {isAuthenticated, setIsAuthenticated} = useAuth();

    const onSubmitHandler = (event) => {
        event.preventDefault();
        //Form submission happens here
        const host = "";

        axios.get(host + "/api/auth/logout")
            .then(
                () => {
                    setIsAuthenticated(false)
                }
            )
    }


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
                {props.isLoginPage ? <></> :
                    isAuthenticated ?
                        (<button className="auth-btn" onClick={onSubmitHandler} ><p>Выйти</p></button>)
                        :
                        (
                            <Link to='/login'>
                                <button className="auth-btn"><p>АВТОРИЗАЦИЯ</p></button>
                            </Link>
                        )
                }
            </div>
        </div>
    );
}

export default Header;