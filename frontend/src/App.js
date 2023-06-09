import Header from "./components/Header";
import {Outlet} from "react-router";
import "./App.css";
import {useAuth} from "./auth/AuthContext";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";
import {ToastContainer} from "react-toastify";


function App(props) {
    const {isAuthenticated, setIsAuthenticated} = useAuth();
    const navigate = useNavigate()
    const host = '';

    useEffect(() => {
            axios.get(host + '/api/auth/is_auth').then(
                (response) => {
                    if (response.data.status === 'ok') {
                        setIsAuthenticated(true);
                    } else {
                        setIsAuthenticated(false);
                    }
                }
            ).catch(
                () => {
                    if (props.requiresLogin) {
                        navigate('/login')
                    }
                    setIsAuthenticated(false)
                }
            )
        }
    )


    return (<>
            {!isAuthenticated && props.requiresLogin ?
                navigate('/login')
                :
                (<div className='main-container'>
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                    <Header isLoginPage={props.isLoginPage}/>
                    <Outlet/>
                </div>)}
        </>
    )
}

export default App;
