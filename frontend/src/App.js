import Header from "./components/Header";
import {Outlet} from "react-router";
import "./App.css";

function App() {
    return (
        <div className='main-container'>
            <Header/>
            <Outlet/>
        </div>
    );
}

export default App;
