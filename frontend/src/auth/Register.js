import "./Register.css";

function Register(){
    return(
        <div className="reg-container">
            <div className="reg-wrap">
            <p className="reg-p1">РЕГИСТРАЦИЯ</p>
                <form onSubmit>
                    <label htmlFor="login">Имя пользователя</label><br/>
                    <input type="text" name="login" id="login" placeholder="Имя"
                           required onChange></input>

                    <label htmlFor="password">Придумайте пароль</label><br/>
                    <input type="password" name="password" id="password" placeholder="Пароль"
                           required onChange></input>

                    <label htmlFor="password">Повторите пароль</label><br/>
                    <input type="password" name="password" id="password" placeholder="Пароль"
                           required onChange></input>
                    {/*</form>*/}
                    <ul className="auth-error">
                        {/* {error ?
                            <li className="pwd-error"><p> {error}</p></li> :
                            <></>
                        } */}
                        <li className="pwd-error"><p> ТЫ ОШИБКА </p></li> {/* УДАЛИТЬ ЭТУ СТРОЧКУ ПОСЛЕ ДОБАВЛЕНИЯ ЛОГИКИ*/}
                    </ul>
                    <center>
                        <button type='submit' className="reg-btn"><p>ВОЙТИ</p></button>
                    </center>
                </form>
            </div>
        </div>
    );
}

export default Register