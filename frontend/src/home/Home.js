import {Link} from "react-router-dom";
import "./Home.css";

function Home(){
    return(
        <div className="home-container">
            <div className="home-wrap">
                <h1 className="home-h1">Вдохновленный пустыней: Ford представил новый F-150 Raptor</h1>
                <p>Новый Ford F-150, дебютировавший летом 2020 года, получил традиционную экстремальную версию Raptor. 
                    «Грузовик для пустыни», как его называют в Ford, присоединился к линейке бренда в 2009 году, а с 
                    2015-го года выпускалась модель второго поколения, которой удалось обойти по продажам в США спорткары
                    Porsche и Chevrolet Corvette. Теперь американская компания представила уже «третий» Raptor, которому 
                    основательно модернизировали подвеску, но сохранили прежний двигатель. Переработанная подвеска стала 
                    наиболее существенным нововведением. Для неразрезного моста сзади инженеры Ford применили пятирычажную схему 
                    с удлиненными продольными рычагами и 24-дюймовыми спиральными пружинами. Кроме этого, в подвеске использованы 
                    3,1-дюймовые амортизаторы FOX Live Valve из анодированного алюминия – самые крупные в истории пикапа. Они 
                    оснащены внешними резервуарами и функцией электронной регулировки жесткости и, как заверяет Ford, способны 
                    реагировать на изменения ландшафта еще до того, как их заметит водитель: для этого используются данные с 
                    датчиков, которые электроника получает по 500 раз за секунду. В результате модернизации ходы подвески выросли 
                    до 356 миллиметров спереди и до 381 миллиметра сзади – это на 25 процентов больше, чем у Raptor первой генерации.</p>
            </div>
        </div>
    );
}

export default Home