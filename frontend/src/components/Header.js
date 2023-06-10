import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import "./Header.css";
import {useAuth} from "../auth/AuthContext";
import axios from "axios";
import {toast} from "react-toastify";

function Header(props) {
    const {isAuthenticated, setIsAuthenticated} = useAuth();

    const host = "";


    const onSubmitHandler = (event) => {
        event.preventDefault();

        axios.delete(host + "/api/auth/logout")
            .then(
                () => {
                    toast.success("Вы успешно вышли из аккаунта", {autoClose: 2000})
                    setIsAuthenticated(false)
                }
            )
    }


    return (
        <div className='header'>
            <div className='nav'>
                <Link to='/home'>
                    <div className='logo'/>
                </Link>
                <ul className='header-navigation'>
                    <Link to='/home'>
                        <li>
                            <button className="home-btn">Инструкция</button>
                        </li>
                    </Link>
                    <Link to='/booking-dynamic'>
                        <li>
                            <button>Динамика бронирования</button>
                        </li>
                    </Link>
                    <Link to='/demand-prediction'>
                        <li>
                            <button>Предсказание спроса</button>
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
                        (<button className="auth-btn" onClick={onSubmitHandler}><p>Выйти</p></button>)
                        :
                        isAuthenticated === undefined ?
                            (
                                <></>
                            ) :
                            <Link to='/login'>
                                <button className="auth-btn"><p>АВТОРИЗАЦИЯ</p></button>
                            </Link>
                }
            </div>
        </div>
    );
}

export default Header;