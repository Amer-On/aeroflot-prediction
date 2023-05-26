import {Link} from "react-router-dom";
import "./Auth.css";


function Auth(){
    return(
        <div className="auth-container">
            <div className="auth-wrap">
                <p className="auth-p1">АВТОРИЗАЦИЯ</p>
                <form >
                    <label for="login">Имя пользователя</label><br/>
                    <input type="text" name="login" id="login" placeholder="Введите имя" required ></input>
                    <label for="password">Пароль</label><br/>
                    <input type="password" name="password" id="password" placeholder="Введите пароль" required ></input>
                </form>
                <ul className="auth-error">
                    <li className="pwd-error"><p>неверно введен пароль</p></li>
                    <li className="name-error"><p>неверно введен пароль</p></li>
                </ul>
                <center><button className="login-btn"><p>ВОЙТИ</p></button></center>
            </div>
        </div>
    );
}

export default Auth