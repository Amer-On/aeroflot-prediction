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
                <div className='input'></div>
            </div>
            <div className='charts'>
                <h1>asd</h1>
            </div>
        </div>
    );
}

export default Main;