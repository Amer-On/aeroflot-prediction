import Header from "./components/Header";
import {Outlet} from "react-router";

function App() {
    return (
        <div className='main-container'>
            <Header/>
            <Outlet/>
        </div>
    );
}

export default App;
