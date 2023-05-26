import Analyzer from "./components/Analyzer";
import './components/main.css'

import React, {useEffect} from 'react';

function BookingDynamicsPage() {
    useEffect(() => {
        document.title = 'Динамика бронирования';
    }, []);

    return <Analyzer/>;
}


export default BookingDynamicsPage;