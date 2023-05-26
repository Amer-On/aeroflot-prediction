import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NoMatch from "./components/NoMatch";
import BookingDynamicsPage from "./Analyzer/BookingDynamicsPage";
import DemandProfilePage from "./Analyzer/DemandProfilePage";
import DemandPredictionPage from "./Analyzer/DemandPredictionPage";
import SeasonDetectionPage from "./Analyzer/SeasonDetectionPage";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path='/' element={<App/>}>
                    <Route path='/booking-dynamics' element={<BookingDynamicsPage/>}/>
                    <Route path='/demand-profile' element={<DemandProfilePage/>}/>
                    <Route path='/demand-prediction' element={<DemandPredictionPage/>}/>
                    <Route path='/season-detection' element={<SeasonDetectionPage/>}/>
                </Route>
                <Route path='*' element={<NoMatch/>}/>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
