import React from "react";

function Header() {
    return (
        <div className='header'>
            <div className='nav'>
                <div className='logo'>
                    {/* <img src="components/Aeroflot_logo.png" className='logo'/> */}
                </div>
                <ul className='header-navigation'>
                    <li><button>Домой</button></li>
                    <li><button>Динамика бронирования</button></li>
                    <li><button>Предсказания спроса</button></li>
                    <li><button>Профиль спроса</button></li>
                    <li><button>Определение сезонности</button></li>
                </ul>
            </div>
        </div>
    );
}

export default Header;