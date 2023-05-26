import "./NoMatch.css"

function NoMatch() {
    return(
        <div className="error-404">
            <p className="error-404-p">Error - 404</p>
            <h1>Страница не найдена!</h1>
            <button className="error-btn"><p>На главную</p></button>
        </div>
    );
}

export default NoMatch;
