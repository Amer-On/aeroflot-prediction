import {useNavigate} from "react-router-dom";
import "./Auth.css";
import axios from "axios";
import {useState} from "react";
import {useAuth} from "./AuthContext";


function Auth() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState();
    const {setIsAuthenticated} = useAuth();
    const navigate = useNavigate();
    // const host = 'https://penguin-code.ru/'
    const host = window.location.hostname;

    // var isAuthenticated = useState()
    const onSubmitHandler = (event) => {
        event.preventDefault();
        responseBody.login = login
        responseBody.password = password

        //Form submission happens here
        console.log(host)
        console.log(window.location.host)
        axios.post(host + "/api/auth/login", responseBody, { withCredentials: true })
            .then(
                (response) => {
                    if (response.data.status === 'ok') {
                        setIsAuthenticated(true);
                        navigate("/");
                    } else {
                        setError("Неверно введён логин и/или пароль");
                    }
                }
            ).catch((e) => console.log(e))
    }

    const inputChangeHandler = (setFunction, event) => {
        setFunction(event.target.value)
    }
    const responseBody = {login: '', password: ''}

    return (
        <div className="auth-container">
            <div className="auth-wrap">
                <p className="auth-p1">АВТОРИЗАЦИЯ</p>
                <form onSubmit={onSubmitHandler}>
                    <label htmlFor="login">Имя пользователя</label><br/>
                    <input type="text" name="login" id="login" placeholder="Введите имя"
                           required onChange={(e) => inputChangeHandler(setLogin, e)}></input>
                    <label htmlFor="password">Пароль</label><br/>
                    <input type="password" name="password" id="password" placeholder="Введите пароль"
                           required onChange={(e) => inputChangeHandler(setPassword, e)}></input>
                    {/*</form>*/}
                    <ul className="auth-error">
                        {error ?
                            <li className="pwd-error"><p> {error}</p></li> :
                            <></>
                        }
                    </ul>
                    <center>
                        <button type='submit' className="login-btn"><p>ВОЙТИ</p></button>
                    </center>
                </form>
            </div>
        </div>
    );
}

export default Auth