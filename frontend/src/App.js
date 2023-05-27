import Header from "./components/Header";
import {Outlet} from "react-router";
import "./App.css";
import {AuthProvider} from "./auth/AuthContext";

function App(props) {
    return (
        <div className='main-container'>
                <AuthProvider>
                    <Header isLoginPage={props.isLoginPage}/>
                    <Outlet/>
                </AuthProvider>
        </div>
    );
}

export default App;
