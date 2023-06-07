import "./Register.css";
import {useRef, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {useAuth} from "./AuthContext";

function Register() {
    const login = useRef();
    const password = useRef();
    const password2 = useRef();
    const [error, setError] = useState(undefined);
    const navigate = useNavigate();
    const {isAuthenticated} = useAuth();

    const submitFormHandler = (e) => {
        e.preventDefault()

        if (password.current.value !== password2.current.value) {
            setError("Пароли не совпадают")
            return;
        }

        const requestBody = {
            login: login.current.value,
            password: password.current.value
        }

        axios.post(
            '/api/auth/create_user', requestBody, {withCredentials: true}
        ).then(
            response => {
                if (response.status === 403) {
                    toast.error("Только суперпользователь имеет право создавать пользователей");
                } else if (response.status === 200) {
                    toast.success("Пользователь успешно создан");
                    navigate('/home');
                } else {
                    toast.error("Неизвестная ошибка")
                    console.log(response)
                }
            }
        ).catch(
            e => {
                toast.error("Неизвестная ошибка")
                console.log(e)
            }
        )

    }

    return isAuthenticated ? (
        <div className="reg-container">
            <div className="reg-wrap">
                <p className="reg-p1">РЕГИСТРАЦИЯ</p>
                <form onSubmit={submitFormHandler}>
                    <label htmlFor="login">Имя пользователя</label><br/>
                    <input type="text" name="login" id="login" placeholder="Имя пользователя"
                           required ref={login}></input>

                    <label htmlFor="password">Придумайте пароль</label><br/>
                    <input type="password" name="password" id="password" placeholder="Пароль"
                           required ref={password}></input>

                    <label htmlFor="password">Повторите пароль</label><br/>
                    <input type="password" name="password" id="password" placeholder="Пароль"
                           required ref={password2}></input>
                    {/*</form>*/}
                    <ul className="auth-error">
                        {error ? <li className="pwd-error"><p> {error} </p></li> : <></>}
                    </ul>
                    <center>
                        <button type='submit' className="reg-btn"><p>СОЗДАТЬ ПОЛЬЗОВАТЕЛЯ</p></button>
                    </center>
                </form>
            </div>
        </div>
    ) : navigate('/login')
}

export default Register