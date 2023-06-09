import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NoMatch from "./components/NoMatch";
import BookingDynamicsPage from "./analyzer/BookingDynamicsPage";
import DemandProfilePage from "./analyzer/DemandProfilePage";
import DemandPredictionPage from "./analyzer/DemandPredictionPage";
import SeasonDetectionPage from "./analyzer/SeasonDetectionPage";
import Auth from "./auth/Auth";
import Register from "./auth/Register";
import Home from "./home/Home";
import {AuthProvider} from "./auth/AuthContext";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<App/>}>
                        <Route path="/home" element={<Home/>}/>
                    </Route>

                    <Route path='/' element={<App requiresLogin={true}/>}>
                        <Route path='/booking-dynamic' element={<BookingDynamicsPage/>}/>
                        <Route path='/demand-profile' element={<DemandProfilePage/>}/>
                        <Route path='/demand-prediction' element={<DemandPredictionPage/>}/>
                        <Route path='/season-detection' element={<SeasonDetectionPage/>}/>
                    </Route>

                    <Route path='/' element={<App isLoginPage={true}/>}>
                        <Route path="/login" element={<Auth/>}/>
                        <Route path="/registration" element={<Register/>}/>
                    </Route>
                    <Route path='*' element={<NoMatch/>}/>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    </React.StrictMode>
);
